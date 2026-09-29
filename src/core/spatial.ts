import { Box3, Vector3 } from "three";

interface Node<T> {
  box: Box3;
  items: T[] | null;
  kids: Node<T>[] | null;
}

/** Statický octree nad body. Objekty jsou nahuštěné kolem Slunce, proto strom a ne pravidelná mřížka. */
export class PointOctree<T> {
  private root: Node<T>;
  private pos: (t: T) => Vector3;
  private leaf: number;

  constructor(items: T[], pos: (t: T) => Vector3, leafSize = 16) {
    this.pos = pos;
    this.leaf = leafSize;
    const box = new Box3();
    for (const t of items) box.expandByPoint(pos(t));
    // kostka, ať se dělí rovnoměrně ve všech osách
    const c = box.getCenter(new Vector3());
    const h = Math.max(...box.getSize(new Vector3()).toArray(), 1) / 2 + 1;
    this.root = this.build(items, new Box3(c.clone().subScalar(h), c.clone().addScalar(h)), 0);
  }

  private build(items: T[], box: Box3, depth: number): Node<T> {
    if (items.length <= this.leaf || depth >= 16) return { box, items, kids: null };
    const c = box.getCenter(new Vector3());
    const parts: T[][] = [[], [], [], [], [], [], [], []];
    for (const t of items) {
      const p = this.pos(t);
      parts[(p.x >= c.x ? 1 : 0) | (p.y >= c.y ? 2 : 0) | (p.z >= c.z ? 4 : 0)].push(t);
    }
    const kids: Node<T>[] = [];
    parts.forEach((its, i) => {
      if (!its.length) return;
      const min = new Vector3(i & 1 ? c.x : box.min.x, i & 2 ? c.y : box.min.y, i & 4 ? c.z : box.min.z);
      const max = new Vector3(i & 1 ? box.max.x : c.x, i & 2 ? box.max.y : c.y, i & 4 ? box.max.z : c.z);
      kids.push(this.build(its, new Box3(min, max), depth + 1));
    });
    return { box, items: null, kids };
  }

  queryRadius(center: Vector3, r: number, out: T[] = []): T[] {
    const r2 = r * r;
    const stack = [this.root];
    while (stack.length) {
      const n = stack.pop()!;
      if (n.box.distanceToPoint(center) > r) continue;
      if (n.items) {
        for (const t of n.items) if (this.pos(t).distanceToSquared(center) <= r2) out.push(t);
      } else stack.push(...n.kids!);
    }
    return out;
  }
}
