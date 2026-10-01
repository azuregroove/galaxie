"""Mapy nadhustoty mladých hvězd z Gaia jako „ramena z dat“ → public/data/gaia-ramena.json.

Zdroj mřížek: balík SpiralMap 0.27 z PyPI (Prusty & Khanna 2025, MIT), soubory převzaté od autorů map:
  - Poggio et al. 2021, A&A 651, A104 – hvězdy horní hlavní posloupnosti, Gaia EDR3
  - Gaia Collaboration, Drimmel et al. 2023, A&A 674, A37 – hvězdy OB, Gaia DR3
Mřížka 121 × 121, heliocentrické X (k centru) a Y (ke l = 90°) od −6 do +6 kpc po 0,1 kpc, hodnota = relativní nadhustota.
Orientace os ověřena: obě mapy spolu korelují 0,68 jen bez převrácení a nadhustota je kladná podél ramen Reid 2019.
"""
from __future__ import annotations

import io
import json
import tarfile
import urllib.request

import numpy as np

from common import DATA_DIR, RAW_DIR, now_iso, update_manifest, write_json

SDIST = ("https://files.pythonhosted.org/packages/63/91/73ea445cab69e80a4ffcbef2054354213d227e615b90ea7b80d8b3faaf40/"
         "spiralmap-0.27.tar.gz")
MAPS = {
    "poggio2021": ("Poggio_cont_2021/overdens_grid_locscale03.npy", "Poggio_cont_2021/xvalues.npy",
                   "Poggio et al. 2021 (Gaia EDR3, hvězdy horní hlavní posloupnosti)"),
    "drimmel2023": ("GaiaPVP_cont_2022/over_dens_grid_threshold_0_003_dens.npy", "GaiaPVP_cont_2022/xvalues_dens.npy",
                    "Gaia Collaboration, Drimmel et al. 2023 (Gaia DR3, hvězdy OB)"),
}


def main() -> None:
    cache = RAW_DIR / "spiralmap-0.27.tar.gz"
    if not cache.exists():
        cache.parent.mkdir(parents=True, exist_ok=True)
        urllib.request.urlretrieve(SDIST, cache)
    tar = tarfile.open(cache)
    base = "spiralmap-0.27/src/SpiralMap/datafiles/"
    load = lambda name: np.load(io.BytesIO(tar.extractfile(base + name).read()))

    out = {"schema": 1, "katalog": "gaia-ramena", "stazeno": now_iso(),
           "osy": "data[i * n + j]: i = X (k centru), j = Y (ke l = 90°), heliocentricky v kpc", "mapy": {}}
    for key, (grid, xs, name) in MAPS.items():
        g = load(grid)
        x = load(xs)
        assert g.shape == (len(x), len(x)), g.shape
        out["mapy"][key] = {"nazev": name, "n": len(x), "min": float(x[0]), "max": float(x[-1]),
                            "data": [round(float(v), 3) for v in g.ravel()]}
        print(f"{key}: {g.shape}, rozsah {x[0]:.1f}…{x[-1]:.1f} kpc, nadhustota {g.min():.2f}…{g.max():.2f}")

    size = write_json(DATA_DIR / "gaia-ramena.json", out)
    update_manifest({"id": "gaia-ramena", "soubor": "gaia-ramena.json", "nazev": "Ramena z dat Gaia (nadhustota mladých hvězd)",
                     "zdroj": "Poggio et al. 2021, A&A 651, A104; Gaia Collaboration, Drimmel et al. 2023, A&A 674, A37; mřížky z balíku SpiralMap 0.27",
                     "url": "https://github.com/Abhaypru/SpiralMap", "licence": "SpiralMap MIT; licence samotných map neověřena",
                     "objektu": len(MAPS), "stazeno": out["stazeno"]})
    print(f"gaia-ramena.json {size / 1024:.0f} kB")


if __name__ == "__main__":
    main()
