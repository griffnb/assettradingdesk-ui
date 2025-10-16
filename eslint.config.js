const js = require("@eslint/js");
const importPlugin = require("eslint-plugin-import");
const reactPlugin = require("eslint-plugin-react");
const tailwind = require("eslint-plugin-tailwindcss");
const tseslint = require("typescript-eslint");

const config = tseslint.config({
  files: ["**/*.{ts,tsx,mtsx}"],
  ignores: ["**/node_modules/", "**/dist/*", "**/.next/*", "**/build/*"],
  extends: [
    // Built-in ESLint configs
    js.configs.recommended,
    importPlugin.flatConfigs.recommended,
    importPlugin.flatConfigs.typescript,
    // TypeScript ESLint recommendations
    ...tseslint.configs.recommended,
    ...tailwind.configs["flat/recommended"],
    reactPlugin.configs.flat.recommended,
    reactPlugin.configs.flat["jsx-runtime"],
  ],
  plugins: {
    "@typescript-eslint": tseslint.plugin,
    import: importPlugin.flatConfigs.recommended.plugins.import,
  },
  languageOptions: {
    parser: tseslint.parser,
    parserOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      //tsconfigRootDir: __dirname,
    },
  },
  settings: {
    tailwindcss: {
      callees: ["classnames", "clsx", "ctl", "cn"],
      config: "../../tailwind.config.js", // Use the root config which extends with custom colors
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
    //"@next/next/no-img-element": "warn",
    "react/prop-types": "off",
    "import/no-unresolved": "off",
    "import/no-cycle": "error",
    "tailwindcss/no-custom-classname": "warn",
    "@typescript-eslint/no-explicit-any": "warn",
    "tailwindcss/classnames-order": "off",
    "@typescript-eslint/no-empty-object-type": "warn",
    allowInterfaces: "off",
  },
});

module.exports = config;
