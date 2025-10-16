import rootConfig, { plugins as _plugins } from "../../tailwind.config.js";

export default {
  ...rootConfig,
  plugins: [
    ..._plugins,
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require("@headlessui/tailwindcss"),
    require("@tailwindcss/container-queries"),
    require("tailwindcss-animate"),
  ],
};
