import type { Meta, StoryObj } from "@storybook/react-vite";
import CheckboxBase from "./CheckboxBase";

const meta = {
  title: "Common/Fields/Base/CheckboxBase",
  component: CheckboxBase,
  argTypes: {
    value: { control: "boolean" },
    checkedValue: { control: "boolean" },
    handleChange: { action: "changed" },
    variant: {
      control: "select",
      options: ["default", "custom"],
    },
    className: { control: "text" },
  },
} satisfies Meta<typeof CheckboxBase>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: false,
    checkedValue: true,
    handleChange: () => {},
    variant: "default",
    className: "",
  },
};

export const Checked: Story = {
  args: {
    value: true,
    checkedValue: true,
    handleChange: () => {},
    variant: "default",
    className: "",
  },
};

export const CustomVariant: Story = {
  args: {
    value: false,
    checkedValue: true,
    handleChange: () => {},
    variant: "custom",
    className: "custom-class",
  },
};
