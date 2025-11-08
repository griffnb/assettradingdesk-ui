import type { Meta, StoryObj } from "@storybook/react";
import { Textarea } from "./textarea";

const meta: Meta<typeof Textarea> = {
  title: "Common/Components/UI/Textarea",
  component: Textarea,
  argTypes: {
    disabled: {
      control: "boolean",
      description: "Disable the textarea",
    },
    placeholder: {
      control: "text",
      description: "Placeholder text",
    },
    rows: {
      control: "number",
      description: "Number of rows for the textarea",
    },
    required: {
      control: "boolean",
      description: "Mark textarea as required",
    },
    readOnly: {
      control: "boolean",
      description: "Make textarea read-only",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: "Enter your text here...",
  },
};

export const Disabled: Story = {
  args: {
    placeholder: "This textarea is disabled",
    disabled: true,
  },
};

export const ReadOnly: Story = {
  args: {
    placeholder: "This is a read-only textarea",
    readOnly: true,
    defaultValue: "You cannot modify this text",
  },
};

export const LongPlaceholder: Story = {
  args: {
    placeholder: "This is a very long placeholder text that demonstrates how the textarea handles extended placeholder content",
  },
};

export const MultipleRows: Story = {
  args: {
    placeholder: "This textarea has multiple rows",
    rows: 5,
  },
};

export const Invalid: Story = {
  args: {
    placeholder: "This textarea shows an invalid state",
    "aria-invalid": true,
  },
};

export const DarkMode: Story = {
  parameters: {
    backgrounds: {
      default: 'dark',
    },
  },
  args: {
    placeholder: "Dark mode textarea",
  },
};