import { registerSW } from "virtual:pwa-register";

/** Service worker: offline režim a nabídka nové verze (ne automatický reload uprostřed práce). */
export function initPwa(): void {
  if (!("serviceWorker" in navigator)) return;
  const bar = document.getElementById("update")!;
  const update = registerSW({
    onNeedRefresh() {
      bar.hidden = false;
    },
    onOfflineReady() {
      const t = document.getElementById("toast")!;
      t.textContent = "Mapa je uložená a funguje i bez internetu";
      t.hidden = false;
      setTimeout(() => (t.hidden = true), 3500);
    },
  });
  bar.querySelector<HTMLButtonElement>("[data-act=reload]")!.onclick = () => update(true);
  bar.querySelector<HTMLButtonElement>("[data-act=later]")!.onclick = () => (bar.hidden = true);
}
