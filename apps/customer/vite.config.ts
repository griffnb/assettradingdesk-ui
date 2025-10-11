import { reactRouter } from "@react-router/dev/vite";
import autoprefixer from "autoprefixer";
import path from "path";
import tailwindcss from "tailwindcss";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [reactRouter(), tsconfigPaths({ root: "./" })],
  css: {
    postcss: {
      plugins: [tailwindcss, autoprefixer],
    },
  },
  resolve: {
    alias: {
      "@/ui": path.resolve(__dirname, "../../packages/ui/src"),
      "@/utils": path.resolve(__dirname, "../../packages/utils/src"),
      "@/models": path.resolve(__dirname, "../../packages/models/src"),
      "@/customer": path.resolve(__dirname, "../../apps/customer/app"),
      "@/common_lib": path.resolve(__dirname, "../../packages/common_lib/src"),
    },
  },
});
