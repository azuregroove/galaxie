import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

const DAY = 24 * 60 * 60;

// Relativní base: stejný build poběží na GitHub Pages (/galaxie/) i později v Capacitoru.
export default defineConfig({
  base: "./",
  build: { target: "es2022", chunkSizeWarningLimit: 800 },
  plugins: [
    VitePWA({
      // „prompt“: nová verze se nenasadí uprostřed letu, uživatel ji potvrdí v liště (src/pwa.ts)
      registerType: "prompt",
      injectRegister: false,
      includeManifestIcons: false,
      manifest: {
        id: "./",
        name: "Mapa Mléčné dráhy",
        short_name: "Galaxie",
        description: "Interaktivní 3D mapa Mléčné dráhy: exoplanety, hvězdokupy, mlhoviny, černé díry a další objekty.",
        lang: "cs",
        start_url: "./",
        scope: "./",
        display: "standalone",
        orientation: "any",
        background_color: "#05070d",
        theme_color: "#05070d",
        icons: [
          { src: "icons/icon-192.png", sizes: "192x192", type: "image/png" },
          { src: "icons/icon-512.png", sizes: "512x512", type: "image/png" },
          { src: "icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
          { src: "icons/icon.svg", sizes: "any", type: "image/svg+xml" },
        ],
      },
      workbox: {
        // Aplikace + všechny JSON katalogy (~4 MB) jsou offline hned po první návštěvě.
        // Binární vrstvy (.bin.gz: prach 1,9 MB, hvězdy Gaia 2,3 MB + kousky karet) se ukládají až při použití,
        // ať telefon zbytečně nestahuje.
        globPatterns: ["**/*.{js,css,html,woff2,svg,png,json}"],
        maximumFileSizeToCacheInBytes: 2 * 1024 * 1024,
        navigateFallback: "index.html",
        cleanupOutdatedCaches: true,
        runtimeCaching: [
          {
            // dlaždice Gaia 500 pc (repo galaxie-data, stejný původ): vlastní cache, ať nevytlačí prach a Gaia 100 pc
            urlPattern: ({ url, sameOrigin }) => sameOrigin && url.pathname.includes("/gaia500/"),
            handler: "CacheFirst",
            options: { cacheName: "galaxie-gaia500", expiration: { maxEntries: 300, purgeOnQuotaError: true } },
          },
          {
            urlPattern: ({ url, sameOrigin }) => sameOrigin && url.pathname.endsWith(".bin.gz"),
            handler: "CacheFirst",
            options: { cacheName: "galaxie-binarni", expiration: { maxEntries: 20 } },
          },
          {
            // náhledy z Commons a výřezy oblohy (hips2fits) – jen posledních pár desítek, kvůli kvótě úložiště
            urlPattern: ({ url }) =>
              url.hostname === "upload.wikimedia.org" || url.hostname === "alasky.cds.unistra.fr",
            handler: "CacheFirst",
            options: {
              cacheName: "galaxie-obrazky",
              expiration: { maxEntries: 60, maxAgeSeconds: 30 * DAY, purgeOnQuotaError: true },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
          {
            // popisy z Wikipedie a autor/licence z Commons API: online čerstvé, offline poslední známé
            urlPattern: ({ url }) =>
              url.hostname === "cs.wikipedia.org" || url.hostname === "commons.wikimedia.org",
            handler: "NetworkFirst",
            options: {
              cacheName: "galaxie-popisy",
              networkTimeoutSeconds: 5,
              expiration: { maxEntries: 150, maxAgeSeconds: 30 * DAY, purgeOnQuotaError: true },
              cacheableResponse: { statuses: [200] },
            },
          },
        ],
      },
    }),
  ],
});
