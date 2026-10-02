"""Souvislá území mocností Star Treku → public/data/startrek-uzemi.bin.gz (+ metadata do startrek.json).

Vstup: startrek.json (umístěné soustavy). Místo koule kolem každé soustavy jedna „mlhovina“ na mocnost:
 - 3D mřížka kolem Slunce (krok KROK_LY), buňka patří mocnosti s nejmenší měkkou vzdáleností k jejím soustavám,
   pokud je pod DOSAH_LY (měkké sjednocení koulí – sousední splynou); mezi mocnostmi hranice uprostřed;
   do JADRO_LY od soustavy patří buňka vždy její mocnosti; dutiny a úzké zálivy uvnitř území se zaplní
 - kanál 1 = štítek (1 + index mocnosti v startrek.json, 0 = nikdo)
 - kanál 2 = vzdálenost k hranici území (k okraji dosahu nebo k hranici s jinou mocností), 0–255 = 0–DOSAH_LY
Soustavy, jejichž koule se do mřížky nevejde, zůstanou v aplikaci jako samostatné bubliny.
Výsledek je vlastní odvození z bodů, ne převzatá mapa.
"""
from __future__ import annotations

import gzip
import json

import numpy as np
from scipy import ndimage
from scipy.spatial import cKDTree

from common import DATA_DIR, LY_PER_PC, write_json

KROK_LY = 5.0
DOSAH_LY = 30.0
# měkké sjednocení: soft-min vzdáleností ke K nejbližším soustavám mocnosti, šířka přechodu v ly
MEKKE_K = 8
MEKKOST_LY = 6.0
JADRO_LY = 10.0
# díry a zálivy užší než ~2× tolik se zaplní (morfologické uzavření koulí)
UZAVRENI_LY = 15.0
# rozmazání pole měkké vzdálenosti (σ v ly)
VYHLAZENI_LY = 8.0
# polovina rozměru mřížky v ly (x, y, z); z je menší – soustavy leží blízko roviny
POLO_LY = (320.0, 320.0, 200.0)


def main() -> None:
    path = DATA_DIR / "startrek.json"
    d = json.loads(path.read_text(encoding="utf-8"))
    pid = {p["id"]: i for i, p in enumerate(d["mocnosti"])}
    pts, lab = [], []
    for s in d["soustavy"]:
        if s["mocnost"] in pid:
            pts.append(np.array(s["xyz"]) * LY_PER_PC)
            lab.append(pid[s["mocnost"]])
    pts, lab = np.array(pts), np.array(lab)
    half = np.array(POLO_LY)
    inside = np.all(np.abs(pts) + DOSAH_LY <= half, axis=1)
    # soustavy u okraje by se v krychli ořízly (aplikace je kreslí jako bubliny) – do území je nebrat
    n_all = len(pts)
    pts, lab = pts[inside], lab[inside]

    n = (2 * half / KROK_LY).astype(int)
    ax = [-half[k] + (np.arange(n[k]) + 0.5) * KROK_LY for k in range(3)]
    Z, Y, X = np.meshgrid(ax[2], ax[1], ax[0], indexing="ij")  # pořadí (z, y, x) → x se v textuře mění nejrychleji
    grid = np.stack([X.ravel(), Y.ravel(), Z.ravel()], 1)

    # měkká vzdálenost k soustavám mocnosti (soft-min přes K nejbližších): sousední koule splynou do jednoho tvaru
    ids = np.unique(lab)
    soft = np.full((len(ids), len(grid)), np.inf)
    for j, li in enumerate(ids):
        P = pts[lab == li]
        k = min(MEKKE_K, len(P))
        dd, _ = cKDTree(P).query(grid, k=k, distance_upper_bound=DOSAH_LY + 3 * MEKKOST_LY)
        dd = dd.reshape(len(grid), k)
        w = np.exp(-np.where(np.isfinite(dd), dd, 1e9) / MEKKOST_LY).sum(1)
        with np.errstate(divide="ignore"):
            soft[j] = -MEKKOST_LY * np.log(w)
    # Gaussovo rozmazání pole: z kulových vrchlíků (každá soustava = koule) hladká plocha bez „hroznu“
    if VYHLAZENI_LY > 0:
        cap = DOSAH_LY + 15
        for j in range(len(ids)):
            f = np.minimum(soft[j], cap).reshape(n[2], n[1], n[0])
            soft[j] = ndimage.gaussian_filter(f, VYHLAZENI_LY / KROK_LY, mode="nearest").ravel()
    order = np.argsort(soft, 0)
    best = order[0]
    s1 = np.take_along_axis(soft, order[:1], 0)[0]
    s2 = np.take_along_axis(soft, order[1:2], 0)[0] if len(ids) > 1 else np.full(len(grid), np.inf)
    own = s1 < DOSAH_LY
    label = np.zeros(len(grid), np.uint8)
    label[own] = ids[best[own]] + 1
    # okraj: k hranici dosahu, nebo k ploše, kde se měkké vzdálenosti dvou mocností vyrovnají
    edge = np.zeros(len(grid))
    edge[own] = np.minimum(DOSAH_LY - s1[own], (s2[own] - s1[own]) / 2)
    # jádro: do JADRO_LY patří buňka vždy mocnosti nejbližší soustavy – jinak hustá Federace pohltí osamělou soustavu (Bajor)
    d1, i1 = cKDTree(pts).query(grid, k=1, distance_upper_bound=JADRO_LY)
    core = np.isfinite(d1)
    for li in ids:
        sel = core & (lab[np.minimum(i1, len(lab) - 1)] == li)
        other = pts[lab != li]
        d2 = (cKDTree(other).query(grid[sel], k=1)[0] if len(other) else np.full(sel.sum(), np.inf))
        same = label[sel] == li + 1
        label[sel] = li + 1
        edge[sel] = np.maximum(np.where(same, edge[sel], 0), np.minimum(JADRO_LY - d1[sel], (d2 - d1[sel]) / 2))
    own |= core
    # vnitřek bez děr: uzavření (dilatace + eroze) a vyplnění dutin po mocnostech, jen do volných buněk; okraj
    # dutiny by se jinak kreslil jako koule uvnitř území. Hluboko uvnitř (vzdálenost k okraji z EDT) slupka zmizí.
    shape = (n[2], n[1], n[0])
    lab3 = label.reshape(shape)
    r = int(round(UZAVRENI_LY / KROK_LY))
    zz, yy, xx = np.mgrid[-r:r + 1, -r:r + 1, -r:r + 1]
    ball = xx ** 2 + yy ** 2 + zz ** 2 <= r * r
    deep = np.zeros(len(grid))
    for li in ids:
        m = lab3 == li + 1
        filled = ndimage.binary_fill_holes(ndimage.binary_closing(np.pad(m, r), ball)[r:-r, r:-r, r:-r] | m)
        new = filled & (lab3 == 0)
        lab3[new] = li + 1
        edt = ndimage.distance_transform_edt(lab3 == li + 1) * KROK_LY - KROK_LY / 2
        deep = np.where(lab3.ravel() == li + 1, edt.ravel(), deep)
    label = lab3.ravel()
    own = label > 0
    # u skutečného okraje zůstane hladké měkké pole, hlouběji (vyplněné dutiny) rozhodne EDT
    edge = np.where(own, np.maximum(edge, deep - 1.5 * KROK_LY), 0)
    edge8 = np.clip(np.round(edge / DOSAH_LY * 255), 0, 255).astype(np.uint8)
    edge8[~own] = 0

    raw = np.concatenate([label, edge8]).tobytes()
    out = DATA_DIR / "startrek-uzemi.bin.gz"
    out.write_bytes(gzip.compress(raw, 9, mtime=0))
    counts = {d["mocnosti"][li]["id"]: int((label == li + 1).sum()) for li in ids}
    print(f"mřížka {n[0]}×{n[1]}×{n[2]} ({len(grid) / 1e6:.2f} M buněk), území: {own.mean() * 100:.1f} %, "
          f"soustav v mřížce {inside.sum()}/{n_all} → {out.name} {out.stat().st_size / 1e3:.0f} kB")
    print("buněk podle mocnosti:", sorted(((v, k) for k, v in counts.items()), reverse=True))

    d["uzemi"] = {
        "soubor": out.name, "nx": int(n[0]), "ny": int(n[1]), "nz": int(n[2]), "krok_ly": KROK_LY,
        "polo_ly": list(POLO_LY), "dosah_ly": DOSAH_LY,
        "kodovani": "2 kanály za sebou (z, y, x; x nejrychleji): štítek = 1 + index mocnosti, okraj 0–255 = 0–dosah_ly",
        "postup": f"buňka patří mocnosti s nejmenší měkkou vzdáleností (soft-min, {MEKKOST_LY:g} ly, {MEKKE_K} nejbližších) "
                   f"k jejím soustavám, je-li pod {DOSAH_LY:g} ly; mezi mocnostmi hranice uprostřed; do {JADRO_LY:g} ly "
                   f"od soustavy vždy její mocnost; dutiny a zálivy do ~{2 * UZAVRENI_LY:g} ly zaplněné; "
                   f"pole rozmazané Gaussem σ = {VYHLAZENI_LY:g} ly",
    }
    write_json(path, d)


if __name__ == "__main__":
    main()
