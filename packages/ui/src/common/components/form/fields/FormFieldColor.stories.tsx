import type { Meta, StoryObj } from "@storybook/react";
import { makeAutoObservable } from "mobx";
import { useState } from "react";
import { FormFieldColor } from "./FormFieldColor";

class SimpleObject {
  string_field: string = "";
  number_field: number = 0;
  primary_color: string = "";
  tryValidation: boolean = false;
  validationRules: any = {};
  constructor() {
    makeAutoObservable(this);
  }
}

const meta: Meta<typeof FormFieldColor> = {
  title: "Common/Form/Fields/FormFieldColor",
  component: FormFieldColor,
  argTypes: {
    record: { control: "object" },
    field: { control: "text" },
    label: { control: "text" },
    helpText: { control: "text" },
    placeholder: { control: "text" },
    wrapVariant: {
      control: "select",
      options: ["default", "none", "bordered"],
    },
    validateOn: { control: "select", options: ["blur", "change", "submit"] },
    required: { control: "boolean" },
    readOnly: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Create a simple object with validation rules
const createObjectWithValidation = () => {
  const obj = new SimpleObject();

  obj.validationRules = {
    primary_color: {
      required: {
        message: "Primary color is required",
      },
    },
  };

  return obj;
};

// State wrapper for interactive stories
const FormFieldColorWithState = (props: any) => {
  const [object] = useState(createObjectWithValidation());

  return (
    <div className="p-4">
      <FormFieldColor {...props} record={object} field="primary_color" />
    </div>
  );
};

export const Default: Story = {
  render: (args) => <FormFieldColorWithState {...args} />,
  args: {
    label: "Primary Color",
    placeholder: "#FFFFFF",
    helpText: "Choose a primary brand color",
    validateOn: "change",
  },
};

export const WithPreselectedColor: Story = {
  render: (args) => {
    const [object] = useState(() => {
      const obj = createObjectWithValidation();
      obj.primary_color = "#3B82F6"; // Blue color
      return obj;
    });

    return (
      <div className="p-4">
        <FormFieldColor {...args} record={object} field="primary_color" />
      </div>
    );
  },
  args: {
    label: "Primary Color",
    validateOn: "change",
  },
};

export const ReadOnly: Story = {
  render: (args) => {
    const [object] = useState(() => {
      const obj = createObjectWithValidation();
      obj.primary_color = "#EF4444"; // Red color
      return obj;
    });

    return (
      <div className="p-4">
        <FormFieldColor
          {...args}
          record={object}
          field="primary_color"
          readOnly={true}
        />
      </div>
    );
  },
  args: {
    label: "Primary Color (Read Only)",
    helpText: "This color cannot be changed",
  },
};

export const WithAppend: Story = {
  render: (args) => <FormFieldColorWithState {...args} />,
  args: {
    label: "Primary Color",
    append: "Reset",
    validateOn: "change",
  },
};

export const WithValidationError: Story = {
  render: (args) => {
    const [object] = useState(() => {
      const obj = createObjectWithValidation();
      obj.tryValidation = true; // Force validation to show error
      return obj;
    });

    return (
      <div className="p-4">
        <FormFieldColor
          {...args}
          record={object}
          field="primary_color"
          required={true}
        />
      </div>
    );
  },
  args: {
    label: "Primary Color (Required)",
    placeholder: "Please select a color",
    validateOn: "change",
  },
};
