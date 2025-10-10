import node from "@astrojs/node";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";
import * as visualizer from "rollup-plugin-visualizer";

import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind({
      applyBaseStyles: false,
      nesting: true,
    }),
    ,
    react(),
  ],
  output: "server",
  adapter:
    process.env.ASTRO_ADAPTER === "cloudflare"
      ? cloudflare({
          imageService: "cloudflare",
        })
      : node({
          mode: "standalone",
        }),
  vite: {
    ssr: {
      external: ["node:crypto"],
    },
    build: {
      rollupOptions: {
        plugins: [
          visualizer.visualizer({
            filename: "dist/stats.html",
            open: false,
            gzipSize: true,
            brotliSize: true,
          }),
        ],
      },
    },
  },
});
