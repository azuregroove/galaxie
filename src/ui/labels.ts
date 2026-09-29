import { Vector3 } from "three";
import type { Stage } from "../scene/stage";

export type LabelKind = "obj" | "anno" | "ring" | "ecl" | "sun";

export interface Label {
  el: HTMLDivElement;
  pos: Vector3;
  kind: LabelKind;
  /** Vrací, zda má být popisek v tomto snímku vidět (před kontrolou, že je na obrazovce). */
  visible: () => boolean;
}

const OFFSET: Record<LabelKind, string> = {
  obj: "translate(8px,-50%)",
  sun: "translate(8px,-50%)",
  anno: "translate(-50%,-50%)",
  ecl: "translate(-50%,-50%)",
  ring: "translate(4px,-100%)",
};

/** HTML popisky promítané do scény. Levnější a čitelnější než text ve WebGL. */
export class Labels {
  private items: Label[] = [];
  private tmp = new Vector3();

  private root: HTMLElement;
  private stage: Stage;

  constructor(root: HTMLElement, stage: Stage) {
    this.root = root;
    this.stage = stage;
    stage.onFrame(() => this.update());
  }

  add(text: string, pos: Vector3, kind: LabelKind, visible: () => boolean = () => true): Label {
    const el = document.createElement("div");
    el.className = `lbl ${kind}`;
    el.textContent = text;
    el.style.display = "none";
    this.root.appendChild(el);
    const l = { el, pos, kind, visible };
    this.items.push(l);
    return l;
  }

  private update(): void {
    const { camera, width: w, height: h } = this.stage;
    for (const a of this.items) {
      let vis = a.visible();
      if (vis) {
        this.tmp.copy(a.pos).project(camera);
        if (this.tmp.z > 1 || Math.abs(this.tmp.x) > 1.2 || Math.abs(this.tmp.y) > 1.2) vis = false;
      }
      if (!vis) {
        if (a.el.style.display !== "none") a.el.style.display = "none";
        continue;
      }
      a.el.style.display = "";
      const x = ((this.tmp.x + 1) / 2) * w;
      const y = ((1 - this.tmp.y) / 2) * h;
      a.el.style.transform = `translate(${x.toFixed(1)}px,${y.toFixed(1)}px) ${OFFSET[a.kind]}`;
    }
  }
}
