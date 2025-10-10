import type { Meta, StoryObj } from "@storybook/react";
import { BusyButton } from "./BusyButton";

const meta = {
  title: "Common/BusyButton",
  component: BusyButton,
} satisfies Meta<typeof BusyButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const _BusyButton: Story = {
  args: {
    children: <>Click Me</>,
    action: async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
    },
  },
};
