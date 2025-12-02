import { Store } from "@/models/store/Store";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { FormFieldCheckbox } from "./FormFieldCheckbox";

const meta = {
  title: "Common/Form/Fields/FormFieldCheckbox",
  component: FormFieldCheckbox,
  argTypes: {
    record: { control: "object" },
    field: { control: "text" },
    label: { control: "text" },
    helpText: { control: "text" },
    wrapVariant: {
      control: "select",
      options: ["default", "none", "bordered"],
    },
    validateOn: { control: "select", options: ["blur", "change", "submit"] },
    required: { control: "boolean" },
    checkedValue: { control: "text" },
    uncheckedValue: { control: "text" },
  },
} satisfies Meta<typeof FormFieldCheckbox>;

export default meta;
type Story = StoryObj<typeof meta>;

// State wrapper for interactive stories
const FormFieldCheckboxWithState = (props: Story["args"]) => {
  const [object] = useState(props.record);

  return (
    <div className="p-4">
      <FormFieldCheckbox {...props} record={object} />
    </div>
  );
};

export const Default: Story = {
  render: (args) => <FormFieldCheckboxWithState {...args} />,
  args: {
    record: Store.admin.create(),
    field: "name" as any,
    label: "Accept Terms & Conditions",
    helpText: "You must accept the terms and conditions to continue",
    validateOn: "change",
  },
};

export const WithCustomValues: Story = {
  render: (args) => <FormFieldCheckboxWithState {...args} />,
  args: {
    record: Store.admin.create(),
    field: "name" as any,
    label: "Subscribe to newsletter",
    helpText: "Receive updates and news",
    checkedValue: "yes",
    uncheckedValue: "no",
    validateOn: "change",
  },
};

export const PreChecked: Story = {
  render: (args) => <FormFieldCheckboxWithState {...args} />,

  args: {
    label: "Accept Terms & Conditions",
    record: Store.admin.create(),
    field: "name" as any,
    validateOn: "change",
  },
};

export const WithValidationError: Story = {
  render: (args) => <FormFieldCheckboxWithState {...args} />,
  args: {
    label: "Accept Terms & Conditions",
    record: Store.admin.create(),
    field: "name" as any,
    validateOn: "change",
  },
};
