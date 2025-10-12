/** @type {import('tailwindcss').Config} */
import rootConfig from "../../tailwind.config.js";

export default {
  ...rootConfig,
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "../../packages/ui/src/**/*.{js,jsx,ts,tsx}",
    "../../packages/common_lib/src/**/*.{js,jsx,ts,tsx}",
  ],
  plugins: [
    ...rootConfig.plugins,
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require("@headlessui/tailwindcss"),
    require("@tailwindcss/container-queries"),
    require("tailwindcss-animate"),
  ],
};
