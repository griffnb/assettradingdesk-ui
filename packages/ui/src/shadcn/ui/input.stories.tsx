import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "./input";

const meta: Meta<typeof Input> = {
  title: "Common/Components/UI/Input",
  component: Input,
  argTypes: {
    type: {
      control: "select",
      options: ["text", "password", "email", "number", "tel", "search", "url", "file"],
      description: "Input type",
    },
    disabled: {
      control: "boolean",
      description: "Disable the input",
    },
    placeholder: {
      control: "text",
      description: "Placeholder text",
    },
    'aria-invalid': {
      control: "boolean",
      description: "Set invalid state for form validation",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: "Enter text",
  },
};

export const Password: Story = {
  args: {
    type: "password",
    placeholder: "Enter password",
  },
};

export const Email: Story = {
  args: {
    type: "email",
    placeholder: "Enter email address",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: "Disabled input",
  },
};

export const Invalid: Story = {
  args: {
    'aria-invalid': true,
    placeholder: "Invalid input",
  },
};

export const FileUpload: Story = {
  args: {
    type: "file",
  },
};

export const WithClassName: Story = {
  args: {
    placeholder: "Custom styled input",
    className: "bg-blue-50 border-blue-300",
  },
};