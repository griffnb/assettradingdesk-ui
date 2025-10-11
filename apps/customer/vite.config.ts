import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths({ root: "./" })],
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
