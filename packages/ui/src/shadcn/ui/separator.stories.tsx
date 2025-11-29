import type { Meta, StoryObj } from "@storybook/react-vite";
import { Separator } from "./separator";

const meta: Meta<typeof Separator> = {
  title: "Shadcn/Separator",
  component: Separator,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"],
      description: "Orientation of the separator",
    },
    decorative: {
      control: "boolean",
      description: "Whether the separator is decorative (for screen readers)",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Separator>;

export const Horizontal: Story = {
  name: "Horizontal Separator",
  args: {
    orientation: "horizontal",
    decorative: true,
  },
  render: (args) => (
    <div className="flex w-64 flex-col space-y-4">
      <div>Content Above</div>
      <Separator {...args} />
      <div>Content Below</div>
    </div>
  ),
};

export const Vertical: Story = {
  name: "Vertical Separator",
  args: {
    orientation: "vertical",
    decorative: true,
  },
  render: (args) => (
    <div className="flex h-32 flex-row items-center space-x-4">
      <div>Left Content</div>
      <Separator {...args} />
      <div>Right Content</div>
    </div>
  ),
};

export const CustomStyled: Story = {
  name: "Custom Styled Separator",
  args: {
    orientation: "horizontal",
    decorative: true,
    className: "bg-blue-500 h-1",
  },
  render: (args) => (
    <div className="flex w-64 flex-col space-y-4">
      <div>Custom Styled Section</div>
      <Separator {...args} />
      <div>Another Section</div>
    </div>
  ),
};

export const NonDecorativeSeparator: Story = {
  name: "Non-Decorative Separator",
  args: {
    orientation: "horizontal",
    decorative: false,
  },
  render: (args) => (
    <div className="flex w-64 flex-col space-y-4">
      <div>Section with Non-Decorative Separator</div>
      <Separator {...args} aria-label="Section divider" />
      <div>Next Section</div>
    </div>
  ),
};
