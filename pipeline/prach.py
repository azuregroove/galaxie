"""3D mapa mezihvězdného prachu → public/data/prach.json + prach-*.bin.gz

Zdroj: Vergely J.-L., Lallement R., Cox N.L.J. 2022, A&A 664, A174 (CDS J/A+A/664/A174), kostky „explore“
hustoty extinkce A0 (550 nm) v mag/pc, kartézsky kolem Slunce: X k centru Galaxie, Y ve směru rotace (l = 90°),
Z k severnímu galaktickému pólu.
  - 025pc: 6 × 6 × 0,8 kpc, krok 10 pc, rozlišení 25 pc (601 × 601 × 81) → přehled, bloky 2 × 2 × 2 = 20 pc
  - 010pc: 3 × 3 × 0,8 kpc, krok 5 pc, rozlišení 10 pc (601 × 601 × 161) → detail, bloky 2 × 2 × 2 = 10 pc
Stažení ~340 MB (CDS ~1,5 MB/s, ~4 min), ukládá se do pipeline/raw/prach.

Původně plánovaná mapa Edenhofer et al. 2024 je na Zenodo, které je z cloudu blokované; Vergely 2022 je na CDS.

Hlavička udává SUN_POS = 300,5 / 40,5 (pro 601 a 81 bodů). Bereme to jako střed pixelu 300 (40) v konvenci,
kde pixel i pokrývá <i, i + 1) – mřížka je pak souměrná kolem Slunce (−3 000 … +3 000 pc). Kdyby šlo o
jinou konvenci, posun je půl kroku (5 pc, resp. 2,5 pc), pod rozlišením mapy.
Orientace os ověřená na mračnech (Taurus, Ophiuchus, Orion A, Perseus, Cepheus, Chamaeleon, Lupus, Aquila Rift):
bez prohození os mají 30–140× vyšší hustotu než medián, s prohozením/převrácením 1–13×.

Kódování: průměr bloku (hustota se průměruje lineárně), pak log10 do 6 bitů mezi LO a HI, uloženo jako bajt
(0 = pod LO, kreslí se průhledně). Pořadí bajtů x nejrychleji, pak y, pak z (= Data3DTexture v three.js).
"""
from __future__ import annotations

import gzip
import urllib.request

import numpy as np
from astropy.io import fits

from common import DATA_DIR, RAW_DIR, now_iso, update_manifest, write_json

BASE = "https://cdsarc.cds.unistra.fr/ftp/J/A+A/664/A174/fits/"
LO, HI, BITS = -3.6, -1.8, 6
LODS = [
    # id, soubor CDS, krok zdroje (pc), rozlišení (pc), faktor zmenšení, index Slunce (x/y, z)
    ("prehled", "explore_cube_density_values_025pc_v2.fits", 10, 25, 2, 300, 40),
    ("detail", "explore_cube_density_values_010pc_v2.fits", 5, 10, 2, 300, 80),
]
NAZVY = {"prehled": "přehled 6 × 6 × 0,8 kpc, voxel 20 pc", "detail": "detail 3 × 3 × 0,8 kpc, voxel 10 pc"}


def fetch(name: str):
    path = RAW_DIR / "prach" / name
    if not path.exists():
        path.parent.mkdir(parents=True, exist_ok=True)
        print(f"Stahuji {name} z CDS …", flush=True)
        urllib.request.urlretrieve(BASE + name, path)
    return path


def blocks(a: np.ndarray, f: int) -> np.ndarray:
    z, y, x = (s // f for s in a.shape)
    a = a[: z * f, : y * f, : x * f]
    return a.reshape(z, f, y, f, x, f).mean(axis=(1, 3, 5))


def main() -> None:
    out = {"schema": 1, "katalog": "prach", "stazeno": now_iso(), "jednotka": "A0 (550 nm) mag/pc",
           "kodovani": {"lo": LO, "hi": HI, "bitu": BITS,
                        "popis": "hodnota/255 = (log10(hustota) − lo) / (hi − lo), 0 = pod lo"},
           "osy": "x k centru, y ke l = 90°, z k severnímu pólu; pc od Slunce; bajty x nejrychleji, pak y, z",
           "lody": []}
    L = 2**BITS - 1
    for lid, name, step, res, f, c_xy, c_z in LODS:
        hdu = fits.open(fetch(name))[0]
        h = hdu.header
        assert h["STEP"] == step and h["RESOL"] == res, (h["STEP"], h["RESOL"])
        assert h["SUN_POSX"] == c_xy + 0.5 and h["SUN_POSZ"] == c_z + 0.5, (h["SUN_POSX"], h["SUN_POSZ"])
        d = hdu.data.astype(np.float32)
        b = blocks(d, f)
        q = np.clip((np.log10(np.maximum(b, 1e-12)) - LO) / (HI - LO), 0, 1)
        u8 = (np.round(q * L) * (255 // L)).astype(np.uint8)
        nz, ny, nx = u8.shape
        raw = gzip.compress(np.ascontiguousarray(u8).tobytes(), 9, mtime=0)
        fn = f"prach-{lid}.bin.gz"
        (DATA_DIR / fn).write_bytes(raw)
        # střed bloku k: původní body f·k … f·k + f − 1 → (f·k + (f − 1)/2 − c) · krok
        x0 = ((f - 1) / 2 - c_xy) * step
        z0 = ((f - 1) / 2 - c_z) * step
        out["lody"].append({"id": lid, "nazev": NAZVY[lid], "soubor": fn, "nx": nx, "ny": ny, "nz": nz,
                            "krok_pc": step * f, "rozliseni_pc": res, "x0": x0, "y0": x0, "z0": z0,
                            "bajtu": len(raw)})
        print(f"{lid}: {nx}×{ny}×{nz}, krok {step * f} pc, nenulových {100 * (u8 > 0).mean():.1f} %, "
              f"{len(raw) / 1e3:.0f} kB → {fn}")
    size = write_json(DATA_DIR / "prach.json", out)
    update_manifest({
        "id": "prach", "soubor": "prach.json", "nazev": "3D mapa mezihvězdného prachu",
        "zdroj": "Vergely, Lallement & Cox 2022, A&A 664, A174 (Gaia EDR3 + 2MASS + spektroskopie), CDS J/A+A/664/A174",
        "url": "https://cdsarc.cds.unistra.fr/viz-bin/cat/J/A+A/664/A174",
        "licence": "Katalog CDS/VizieR – volně s citací",
        "citace": "Vergely J.-L., Lallement R., Cox N.L.J. 2022, A&A 664, A174",
        "poznamka": "Hustota extinkce A0; zmenšeno průměrem bloků 2 × 2 × 2 a logaritmicky zakódováno do 6 bitů. "
                    "Autoři upozorňují na nejistoty ve velkých vzdálenostech a za hustými mračny.",
        "vyrez": False,
    })
    print(f"prach.json {size} B")


if __name__ == "__main__":
    main()
