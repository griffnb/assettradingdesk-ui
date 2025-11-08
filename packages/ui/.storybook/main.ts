// This file has been automatically migrated to valid ESM format by Storybook.
import type { StorybookConfig } from "@storybook/react-vite";
import { fileURLToPath } from "node:url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@chromatic-com/storybook",
    "@storybook/addon-docs",
  ],

  staticDirs: ["../public"],

  framework: "@storybook/react-vite",

  core: {
    builder: "@storybook/builder-vite", // 👈 The builder enabled here.
  },

  async viteFinal(config) {
    // Add path aliases to match the monorepo structure
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...config.resolve.alias,
      "@/utils": join(dirname(__filename), "../../../packages/utils/src"),
      "@/models": join(dirname(__filename), "../../../packages/models/src"),
      "@/ui": join(dirname(__filename), "../src"),
      "@/common_lib": join(
        dirname(__filename),
        "../../../packages/common_lib/src",
      ),
    };
    return config;
  },
  // other Storybook config
  // @ts-expect-error ignore this
  babel: async (options) => {
    options.plugins.push([
      "@babel/plugin-proposal-decorators",
      { legacy: true },
    ]);
    options.plugins.push([
      "@babel/plugin-transform-class-properties",
      { loose: true },
    ]);

    // Configure JSX runtime to use automatic transform
    options.presets = options.presets || [];
    const reactPresetIndex = options.presets.findIndex(
      (preset: string | [string, unknown]) =>
        (Array.isArray(preset) && preset[0]?.includes("@babel/preset-react")) ||
        (typeof preset === "string" && preset.includes("@babel/preset-react")),
    );

    if (reactPresetIndex !== -1) {
      options.presets[reactPresetIndex] = [
        "@babel/preset-react",
        { runtime: "automatic" },
      ];
    }

    return options;
  },
};
export default config;
