const rootConfig = require("../../tailwind.config.js");

module.exports = {
  ...rootConfig,
  plugins: [
    ...rootConfig.plugins,
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require("@headlessui/tailwindcss"),
    require("@tailwindcss/container-queries"),
  ],
};
