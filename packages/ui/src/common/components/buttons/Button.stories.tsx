import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "./Button";

const meta: Meta<typeof Button> = {
  title: "Common/Button",
  component: Button,

  argTypes: {
    variant: {
      control: "select",
      options: [
        "primary",
        "secondary",
        "tertiary",
        "primary_destruct",
        "secondary_destruct",
        "tertiary_destruct",
        "custom",
      ],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg", "xl", "2xl"],
    },
    prependIcon: { control: false },
    appendIcon: { control: false },
    disabled: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default Button story
export const Primary: Story = {
  args: {
    variant: "primary",
    size: "md",
    children: "Primary Button",
  },
};
export const PrimaryDisabled: Story = {
  args: {
    variant: "primary",
    size: "md",
    children: "Primary Button",
    disabled: true,
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    size: "md",
    children: "Secondary Button",
  },
};

export const WithPrependIcon: Story = {
  args: {
    variant: "primary",
    size: "md",
    prependIcon: <i className="fa fa-user" />,
    children: "Button with Icon",
  },
};

export const WithAppendIcon: Story = {
  args: {
    variant: "primary",
    size: "md",
    appendIcon: <i className="fa fa-user" />,
    children: "Button with Icon",
  },
};

export const LargeButton: Story = {
  args: {
    variant: "primary",
    size: "xl",
    children: "Large Button",
  },
};
