import type { Preview } from "@storybook/react";
import "../src/styles/code.css";
import "../src/styles/datepicker.css";
import "../src/styles/form-select.css";
import "../src/styles/globals.css";
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
      values: [
        // 👇 Default values
        { name: "Light", value: "#FFFFFF" },
        { name: "Dark", value: "#4B5565" },
      ],
      // 👇 Specify which background is shown by default
      default: "Light",
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
