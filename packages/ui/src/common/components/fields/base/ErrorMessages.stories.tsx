import type { Meta, StoryObj } from "@storybook/react-vite";
import { ErrorMessages } from "./ErrorMessages";

const meta = {
  title: "Common/Fields/ErrorMessages",
  component: ErrorMessages,
  argTypes: {
    errorMessages: { control: "object" },
    variant: {
      control: "select",
      options: ["default"],
    },
    className: { control: "text" },
  },
} satisfies Meta<typeof ErrorMessages>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    errorMessages: ["This is an error message."],
    variant: "default",
    className: "",
  },
};

export const MultipleErrors: Story = {
  args: {
    errorMessages: [
      "First error message.",
      "Second error message.",
      "Third error message.",
    ],
    variant: "default",
    className: "",
  },
};

export const CustomClass: Story = {
  args: {
    errorMessages: ["This is an error message with a custom class."],
    variant: "default",
    className: "custom-class",
  },
};
