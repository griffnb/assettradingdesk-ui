import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//@ts-expect-error not typescript
const aliasResolver = (id) => {
  console.log("Resolving alias for:", id);
  if (id.startsWith("@/astro_ui/")) {
    return path.resolve(
      __dirname,
      "../../packages/astro_ui/src/",
      id.slice("@/astro_ui/".length)
    );
  }

  if (id.startsWith("@/ui/")) {
    return path.resolve(
      __dirname,
      "../../packages/ui/src/",
      id.slice("@/ui/".length)
    );
  }

  // Add other aliases as needed
  return id;
};

export default {
  plugins: {
    "postcss-import": {
      resolve: aliasResolver,
    },
    "tailwindcss/nesting": "postcss-nesting",
    tailwindcss: {},
    autoprefixer: {},
  },
};
