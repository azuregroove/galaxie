import { defineConfig } from "vite";

// Relativní base: stejný build poběží na GitHub Pages (/galaxie/) i později v Capacitoru.
export default defineConfig({
  base: "./",
  build: { target: "es2022", chunkSizeWarningLimit: 800 },
});
