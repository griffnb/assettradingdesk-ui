import type { Meta, StoryObj } from "@storybook/react-vite";
import { MessagingCenterShowcase } from "./MessagingCenterShowcase";

const meta: Meta<typeof MessagingCenterShowcase> = {
  title: "Common/Examples/Screens/MessagingCenterShowcase",
  component: MessagingCenterShowcase,
  parameters: {
    layout: "padded",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
