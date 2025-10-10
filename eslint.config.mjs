import js from "@eslint/js";
import reactPlugin from "eslint-plugin-react";
import tailwind from "eslint-plugin-tailwindcss";
import tseslint from "typescript-eslint";

export default tseslint.config({
  files: ["**/*.{ts,tsx,mtsx}"],
  ignores: ["**/node_modules/", "**/dist/*", "**/.next/*", "**/build/*", "**/.react-router/**"],
  extends: [
    // Built-in ESLint configs
    js.configs.recommended,
    // TypeScript ESLint recommendations
    ...tseslint.configs.recommended,
    ...tailwind.configs["flat/recommended"],
    reactPlugin.configs.flat.recommended,
    reactPlugin.configs.flat["jsx-runtime"],
  ],
  plugins: {
    "@typescript-eslint": tseslint.plugin,
  },
  languageOptions: {
    parser: tseslint.parser,
    parserOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      tsconfigRootDir: __dirname,
    },
  },
  settings: {
    tailwindcss: {
      callees: ["classnames", "clsx", "ctl", "cn"],
      //config: "./tailwind.base.config.js", // Use the base config at root level
      cssFiles: [
        "**/*.css",
        "!**/node_modules",
        "!**/.*",
        "!**/dist",
        "!**/build",
      ],
      cssFilesRefreshRate: 5_000,
      removeDuplicates: true,
      skipClassAttribute: false,
      whitelist: [
        "@container",
        "fas",
        "fa",
        "fa\\-.+:?.+",
        "u",
        "u\\-.+:?.+",
        "z\\-.+:?.+",
        "errors",
        "active",
      ],
      tags: [],
      classRegex: "^class(Name)?$",
    },
    react: {
      version: "detect",
    },
  },
  rules: {
    "react/jsx-key": ["error", { checkFragmentShorthand: true }],
    "react/prop-types": "off",
    "react/react-in-jsx-scope": "off",
    "tailwindcss/no-custom-classname": "warn",
    "@typescript-eslint/no-explicit-any": "warn",
    "tailwindcss/classnames-order": "off",
    "@typescript-eslint/no-empty-object-type": "warn",
    "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
  },
});
