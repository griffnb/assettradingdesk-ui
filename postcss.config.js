//postcss.config.js
const path = require("path");

const aliasResolver = (id) => {
  console.log("ID", id, "Dir Name", __dirname);
  if (id.startsWith("@/astro_ui/")) {
    return path.resolve(
      __dirname,
      "./packages/astro_ui/src/",
      id.slice("@/astro_ui/".length)
    );
  }

  if (id.startsWith("@/ui/")) {
    return path.resolve(
      __dirname,
      "./packages/ui/src/",
      id.slice("@/ui/".length)
    );
  }

  // Add other aliases as needed
  return id;
};
module.exports = {
  plugins: {
    "postcss-import": {
      resolve: aliasResolver,
    },
    "tailwindcss/nesting": "postcss-nesting",
    tailwindcss: {},
    autoprefixer: {},
  },
};
