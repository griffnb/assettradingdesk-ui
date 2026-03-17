import type { Preview } from "@storybook/react-vite";
import "../src/theme_styles/all.css";

const preview: Preview = {
  decorators: [
    (Story) => (
      <div className="font-titillium">
        <Story />
      </div>
    ),
  ],

  parameters: {
    backgrounds: {
      options: {
        // 👇 Default values
        light: { name: "Light", value: "#FFFFFF" },

        dark: { name: "Dark", value: "#4B5565" },
      },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },

  initialGlobals: {
    backgrounds: {
      value: "light",
    },
  },
};

export default preview;
