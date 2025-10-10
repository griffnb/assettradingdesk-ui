import type { StorybookConfig } from "@storybook/react-vite";
import { dirname, join } from "path";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@chromatic-com/storybook",
    "@storybook/addon-interactions",
  ],

  staticDirs: ["../../../apps/ai/public"],

  framework: {
    name: "@storybook/react-vite",
    options: {},
  },

  async viteFinal(config) {
    // Add path aliases to match the monorepo structure
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...config.resolve.alias,
      "@/utils": join(dirname(__filename), "../../../packages/utils/src"),
      "@/models": join(dirname(__filename), "../../../packages/models/src"),
      "@/astro_ui": join(dirname(__filename), "../../../packages/astro_ui/src"),
      "@/ui": join(dirname(__filename), "../src"),
      "@/sage": join(dirname(__filename), "../../../packages/sage/src"),
      "@/common_lib": join(
        dirname(__filename),
        "../../../packages/common_lib/src"
      ),
    };
    return config;
  },
  // other Storybook config
  babel: async (options) => {
    options.plugins.push([
      "@babel/plugin-proposal-decorators",
      { legacy: true },
    ]);
    options.plugins.push([
      "@babel/plugin-transform-class-properties",
      { loose: true },
    ]);

    return options;
  },
};
export default config;
