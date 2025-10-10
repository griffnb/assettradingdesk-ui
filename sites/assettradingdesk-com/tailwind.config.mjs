/** @type {import('tailwindcss').Config} */

const rootConfig = require("../../tailwind.config.js");

module.exports = {
  ...rootConfig,
  content: [
    ...rootConfig.content, // Include all content paths from the root config
    "./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}",
  ],
};
