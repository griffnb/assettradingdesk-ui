import type { Meta, StoryObj } from "@storybook/react-vite";
import { AuthSelectButton } from "./AuthSelectButton";

const meta: Meta<typeof AuthSelectButton> = {
  title: "Customer/Components/Auth/AuthSelectButton",
  component: AuthSelectButton,
  argTypes: {
    label: {
      control: "text",
      description: "Main label text for the button",
    },
    subLabel: {
      control: "text",
      description: "Optional secondary text below the main label",
    },
    icon: {
      control: false,
      description: "Icon element to display on the left",
    },
    onClick: {
      action: "clicked",
      description: "Click handler",
    },
    variant: {
      control: "select",
      options: ["default"],
      description: "Visual variant of the button",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    icon: "u u-passkey-01",
    label: "Sign in with Email",
    subLabel: "Use your email address",
  },
};

export const WithoutSubLabel: Story = {
  args: {
    icon: "u u-mobile",
    label: "Sign in with Phone",
  },
};
