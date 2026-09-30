/**
 * Panely, které jde schovat a zase ukázat (seznam, vrstvy, lišta). Stav se pamatuje v localStorage;
 * bez uloženého stavu jsou na úzkém displeji zavřené (pokud closedOnMobile), jinde otevřené.
 */
export function togglable(button: HTMLElement, target: HTMLElement, key: string, cls = "closed",
  closedOnMobile = true): void {
  let closed = closedOnMobile && matchMedia("(max-width:760px)").matches;
  try {
    const v = localStorage.getItem(`galaxie.panel.${key}`);
    if (v != null) closed = v === "1";
  } catch {
    /* úložiště nedostupné (soukromé okno) – výchozí stav */
  }
  const apply = () => {
    target.classList.toggle(cls, closed);
    button.setAttribute("aria-expanded", String(!closed));
    button.setAttribute("aria-pressed", String(!closed));
  };
  apply();
  button.addEventListener("click", () => {
    closed = !closed;
    apply();
    try {
      localStorage.setItem(`galaxie.panel.${key}`, closed ? "1" : "0");
    } catch {
      /* nevadí */
    }
  });
}

/** Výšku prvku zapisuje do CSS proměnné, aby se ostatní panely mohly odsunout (lišta se zalamuje). */
export function trackHeight(el: HTMLElement, cssVar: string): void {
  const set = () => document.documentElement.style.setProperty(cssVar, `${Math.ceil(el.getBoundingClientRect().height)}px`);
  new ResizeObserver(set).observe(el);
  set();
}
