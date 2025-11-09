import { Button } from "@/ui/common/components/buttons/Button";
import type { Meta, StoryObj } from "@storybook/react";
import { AlertBar } from "./AlertBar";

const meta: Meta<typeof AlertBar> = {
  title: "Customer/Components/Alerts/AlertBar",
  component: AlertBar,
  argTypes: {
    color: {
      control: "select",
      options: ["dark-blue", "light-blue"],
    },
    title: { control: "text" },
    description: { control: "text" },
    icon: (
      <i
        data-slot="alert-bar-icon"
        className="u u-alert-circle !size-14 text-icon-neutral-white"
      />
    ),
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Complete Your Authorization",
    description:
      "Authorize your account to unlock all union features and benefits.",
  },
  render: (args) => (
    <div className="w-full">
      <AlertBar {...args}>
        <Button>Authorize</Button>
        <Button>Un Authorize</Button>
      </AlertBar>
    </div>
  ),
};
