import type { Preview } from "@storybook/react-vite";
import "../src/styles/code.css";
import "../src/styles/datepicker.css";
import "../src/styles/form-select.css";
import "../src/styles/icons.css";
import "../src/styles/loading.css";
import "../src/styles/table.css";
import "../src/theme_styles/base.css";

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
