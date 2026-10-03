"""Hvězdy do 500 pc z Gaia DR3 (dobře změřené) → pipeline/raw/gaia500/hp1-NN.csv.gz. Spouštět na PC.

Výběr: parallax > 2 mas (do 500 pc) a parallax_over_error > 10 (chyba paralaxy pod 10 %, vzdálenost 1/paralaxa
je pak dost přesná). Odhad ze vzorku VizieR (3. 10. 2026): ≈ 13,7 mil. hvězd.
Archiv Gaia (gea.esac.esa.int) je z cloudu blokovaný, proto PC.

Dotaz je rozdělený na 48 dílů podle HEALPix úrovně 1 (source_id // 2^35 = HEALPix úrovně 12), každý díl je
samostatná asynchronní úloha a samostatný soubor; už stažené díly se přeskočí, takže jde skript přerušit a pustit znovu.
Výstup: CSV (gzip) se sloupci COLS.
Přihlášení účtem ESA Cosmos (volnější limity): py gaia500_stahni.py --login
(jméno a heslo se čtou z pipeline/raw/gaia_login.txt – dva řádky, raw/ je v .gitignore – jinak se skript zeptá)
"""
from __future__ import annotations

import gzip
import shutil
import sys
import time

from common import RAW_DIR

OUT = RAW_DIR / "gaia500"
COLS = ["source_id", "ra", "dec", "parallax", "parallax_error", "phot_g_mean_mag", "bp_rp", "ruwe", "radial_velocity"]
PLX_MIN = 2.0          # mas → 500 pc
PLX_OVER_ERR = 10.0
N_PIX = 48             # HEALPix úrovně 1 (12 · 4¹)
SID_PER_PIX = (2 ** 35) * 4 ** 11  # source_id na jeden pixel úrovně 1 (4¹¹ pixelů úrovně 12)


def query(p: int) -> str:
    lo, hi = p * SID_PER_PIX, (p + 1) * SID_PER_PIX
    return (f"SELECT {', '.join(COLS)} FROM gaiadr3.gaia_source "
            f"WHERE source_id >= {lo} AND source_id < {hi} "
            f"AND parallax > {PLX_MIN} AND parallax_over_error > {PLX_OVER_ERR}")


def main() -> None:
    if "--dry" in sys.argv:
        for p in range(N_PIX):
            print(query(p))
        return
    from astroquery.gaia import Gaia  # import až tady – --dry jde spustit i bez astroquery

    Gaia.ROW_LIMIT = -1
    if "--login" in sys.argv:
        # přihlášené úlohy mají volnější limity; soubor (1. řádek jméno, 2. heslo) obejde psaní hesla do konzole
        cred = RAW_DIR / "gaia_login.txt"
        if cred.exists():
            Gaia.login(credentials_file=str(cred))
        else:
            Gaia.login()
    OUT.mkdir(parents=True, exist_ok=True)
    t0 = time.time()
    for p in range(N_PIX):
        path = OUT / f"hp1-{p:02d}.csv.gz"
        if path.exists() and path.stat().st_size:
            continue
        tmp = OUT / f"hp1-{p:02d}.csv"
        err = OUT / f"hp1-{p:02d}.csv.error"
        for attempt in range(5):
            try:
                tmp.unlink(missing_ok=True)
                err.unlink(missing_ok=True)
                job = Gaia.launch_job_async(query(p), dump_to_file=True, output_format="csv", output_file=str(tmp))
                job.get_results()  # počká na dokončení a soubor zapíše
                # archiv při chybě serveru (např. „deadlock detected“) někdy nevyhodí výjimku, jen uloží .error
                if not tmp.exists() or not tmp.stat().st_size:
                    raise RuntimeError(err.read_text(encoding="utf-8", errors="replace")[-400:] if err.exists()
                                       else "archiv nevrátil data")
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
        print(f"díl {p + 1}/{N_PIX}: {rows} hvězd, {path.stat().st_size / 1e6:.1f} MB, "
              f"celkem {(time.time() - t0) / 60:.0f} min", flush=True)


if __name__ == "__main__":
    main()
