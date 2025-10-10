/** @type {import('tailwindcss').Config} */

const rootConfig = require("../../tailwind.config.js");

module.exports = {
  ...rootConfig,
  //content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
};

//export default {
//  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
//  theme: {
//    extend: {},
//  },
//  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography")],
//};
