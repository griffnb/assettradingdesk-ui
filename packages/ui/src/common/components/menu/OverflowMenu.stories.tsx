import type { Meta, StoryObj } from "@storybook/react";
import { OverflowMenu } from "./OverflowMenu";
import { OverflowMenuOption } from "./OverflowMenuOption";

const meta: Meta<typeof OverflowMenu> = {
  title: "Common/Components/Menu/OverflowMenu",
  component: OverflowMenu,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="flex size-72 flex-row items-center justify-center bg-gray-400">
      <OverflowMenu {...args}>
        <OverflowMenuOption>Button one</OverflowMenuOption>
        <OverflowMenuOption>Button two</OverflowMenuOption>
        <OverflowMenuOption>Button three</OverflowMenuOption>
      </OverflowMenu>
    </div>
  ),
  args: {},
};
