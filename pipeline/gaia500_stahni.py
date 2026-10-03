"""Hvězdy do 500 pc z Gaia DR3 (dobře změřené) → pipeline/raw/gaia500/hp1-NN.csv.gz. Spouštět na PC.

Výběr: parallax > 2 mas (do 500 pc) a parallax_over_error > 10 (chyba paralaxy pod 10 %, vzdálenost 1/paralaxa
je pak dost přesná). Odhad ze vzorku VizieR (3. 10. 2026): ≈ 13,7 mil. hvězd.

Zdroj (z cloudu oba blokované, proto PC):
  výchozí  – zrcadlo Gaia DR3 v ARI Heidelberg (gaia.ari.uni-heidelberg.de/tap), asynchronní TAP (UWS) přímo do CSV;
             archiv ESA 3. 10. neodpovídal ani na dotaz na 5 řádků (příprava DR4)
  --esa    – archiv ESA (gea.esac.esa.int) přes astroquery; --login přihlásí účtem ESA Cosmos
             (jméno a heslo z pipeline/raw/gaia_login.txt – dva řádky, raw/ je v .gitignore – jinak se zeptá)
CSV místo VOTable: na Windows astropy nepřečte 64bitové source_id z binárního VOTable (C long je tam 32bitový).

Dotaz je rozdělený na 48 dílů podle HEALPix úrovně 1 (source_id // 2^35 = HEALPix úrovně 12), každý díl je
samostatná asynchronní úloha a samostatný soubor; už stažené díly se přeskočí, takže jde skript přerušit a pustit znovu.
Výstup: CSV (gzip) se sloupci COLS.
"""
from __future__ import annotations

import gzip
import shutil
import sys
import time
from pathlib import Path

from common import RAW_DIR

OUT = RAW_DIR / "gaia500"
COLS = ["source_id", "ra", "dec", "parallax", "parallax_error", "phot_g_mean_mag", "bp_rp", "ruwe", "radial_velocity"]
PLX_MIN = 2.0          # mas → 500 pc
PLX_OVER_ERR = 10.0
N_PIX = 48             # HEALPix úrovně 1 (12 · 4¹)
SID_PER_PIX = (2 ** 35) * 4 ** 11  # source_id na jeden pixel úrovně 1 (4¹¹ pixelů úrovně 12)
ARI_TAP = "https://gaia.ari.uni-heidelberg.de/tap"
MAXREC = 20_000_000    # díl má řádově statisíce řádků; kdyby server vrátil přesně tolik, je výsledek useknutý


def query(p: int) -> str:
    lo, hi = p * SID_PER_PIX, (p + 1) * SID_PER_PIX
    return (f"SELECT {', '.join(COLS)} FROM gaiadr3.gaia_source "
            f"WHERE source_id >= {lo} AND source_id < {hi} "
            f"AND parallax > {PLX_MIN} AND parallax_over_error > {PLX_OVER_ERR}")


def download_ari(p: int, tmp: Path) -> None:
    """Asynchronní TAP podle standardu IVOA UWS: založit úlohu, spustit, čekat, stáhnout výsledek, smazat úlohu."""
    import requests

    s = requests.Session()
    r = s.post(f"{ARI_TAP}/async", data={"REQUEST": "doQuery", "LANG": "ADQL", "FORMAT": "csv",
                                         "MAXREC": str(MAXREC), "QUERY": query(p)},
               allow_redirects=False, timeout=120)
    if r.status_code not in (200, 201, 303) or "Location" not in r.headers:
        raise RuntimeError(f"založení úlohy: HTTP {r.status_code} {r.text[:300]}")
    job = r.headers["Location"]
    try:
        s.post(f"{job}/phase", data={"PHASE": "RUN"}, timeout=120).raise_for_status()
        t0 = time.time()
        while True:
            phase = s.get(f"{job}/phase", timeout=120).text.strip()
            if phase == "COMPLETED":
                break
            if phase in ("ERROR", "ABORTED"):
                err = s.get(f"{job}/error", timeout=120).text
                raise RuntimeError(f"úloha {phase}: {err[:400]}")
            if time.time() - t0 > 6 * 3600:
                raise RuntimeError(f"úloha pořád {phase} po 6 h")
            time.sleep(15)
        with s.get(f"{job}/results/result", stream=True, timeout=600) as res:
            res.raise_for_status()
            with open(tmp, "wb") as f:
                for chunk in res.iter_content(1 << 20):
                    f.write(chunk)
    finally:
        try:
            s.delete(job, timeout=60)
        except requests.RequestException:
            pass  # úloha na serveru stejně časem vyprší


def download_esa(p: int, tmp: Path) -> None:
    from astroquery.gaia import Gaia

    err = tmp.with_suffix(".csv.error")
    err.unlink(missing_ok=True)
    job = Gaia.launch_job_async(query(p), dump_to_file=True, output_format="csv", output_file=str(tmp))
    job.get_results()  # počká na dokončení a soubor zapíše
    # archiv při chybě serveru (např. „deadlock detected“) někdy nevyhodí výjimku, jen uloží .error
    if not tmp.exists() or not tmp.stat().st_size:
        raise RuntimeError(err.read_text(encoding="utf-8", errors="replace")[-400:] if err.exists()
                           else "archiv nevrátil data")


def main() -> None:
    if "--dry" in sys.argv:
        for p in range(N_PIX):
            print(query(p))
        return
    esa = "--esa" in sys.argv
    if esa:
        from astroquery.gaia import Gaia  # import až tady – --dry a ARI jdou spustit i bez astroquery

        Gaia.ROW_LIMIT = -1
        if "--login" in sys.argv:
            cred = RAW_DIR / "gaia_login.txt"
            if cred.exists():
                Gaia.login(credentials_file=str(cred))
            else:
                Gaia.login()
    download = download_esa if esa else download_ari
    print(f"zdroj: {'archiv ESA' if esa else 'zrcadlo ARI Heidelberg'}", flush=True)
    OUT.mkdir(parents=True, exist_ok=True)
    t0 = time.time()
    for p in range(N_PIX):
        path = OUT / f"hp1-{p:02d}.csv.gz"
        if path.exists() and path.stat().st_size:
            continue
        tmp = OUT / f"hp1-{p:02d}.csv"
        for attempt in range(5):
            try:
                tmp.unlink(missing_ok=True)
                download(p, tmp)
                with open(tmp, encoding="utf-8") as f:
                    head = [c.strip().strip('"').lower() for c in f.readline().split(",")]
                if head != COLS:
                    raise RuntimeError(f"nečekaná hlavička CSV: {','.join(head)[:300]}")
                break
            except Exception as e:  # noqa: BLE001 – síť / archiv, zkusit znovu
                msg = " ".join(str(e).split())[:300]
                print(f"  díl {p}: chyba {msg}, znovu za {30 * 2 ** attempt} s", flush=True)
                time.sleep(30 * 2 ** attempt)
        else:
            raise RuntimeError(f"díl {p} se nepodařilo stáhnout")
        with open(tmp, "rb") as src, gzip.open(path, "wb", compresslevel=6) as dst:
            shutil.copyfileobj(src, dst)
        tmp.unlink()
        rows = sum(1 for _ in gzip.open(path, "rt")) - 1
        if rows >= MAXREC:
            path.unlink()
            raise RuntimeError(f"díl {p}: {rows} řádků = MAXREC, výsledek je useknutý")
        print(f"díl {p + 1}/{N_PIX}: {rows} hvězd, {path.stat().st_size / 1e6:.1f} MB, "
              f"celkem {(time.time() - t0) / 60:.0f} min", flush=True)


if __name__ == "__main__":
    main()
