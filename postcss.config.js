//postcss.config.js
const path = require("path");

const aliasResolver = (id) => {
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
