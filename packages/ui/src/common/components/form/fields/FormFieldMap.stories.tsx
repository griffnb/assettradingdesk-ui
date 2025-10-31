import type { Meta, StoryObj } from "@storybook/react";
import { makeAutoObservable } from "mobx";
import { useState } from "react";
import { FormFieldMap } from "./FormFieldMap";

class SimpleObject {
  string_field: string = "";
  number_field: number = 0;
  attributes: Record<string, string | number> = {};
  tryValidation: boolean = false;
  validationRules: any = {};
  constructor() {
    makeAutoObservable(this);
  }
}

const meta: Meta<typeof FormFieldMap> = {
  title: "Common/Form/Fields/FormFieldMap",
  component: FormFieldMap,
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
    keyType: { control: "select", options: ["text", "number", "email"] },
    keyPlaceholder: { control: "text" },
    valueType: { control: "select", options: ["text", "number", "textarea"] },
    valuePlaceholder: { control: "text" },
    defaultValue: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Create a simple object with validation rules
const createObjectWithValidation = () => {
  const obj = new SimpleObject();

  obj.validationRules = {
    attributes: {
      required: {
        message: "At least one attribute is required",
      },
    },
  };

  return obj;
};

// State wrapper for interactive stories
const FormFieldMapWithState = (props: any) => {
  const [object] = useState(createObjectWithValidation());

  return (
    <div className="p-4">
      <FormFieldMap {...props} record={object} field="attributes" />
    </div>
  );
};

export const Default: Story = {
  render: (args) => <FormFieldMapWithState {...args} />,
  args: {
    label: "Object Attributes",
    helpText: "Add key-value pairs to describe object attributes",
    keyType: "text",
    keyPlaceholder: "Key",
    valueType: "text",
    valuePlaceholder: "Value",
    validateOn: "change",
  },
};

export const WithTextareaValues: Story = {
  render: (args) => <FormFieldMapWithState {...args} />,
  args: {
    label: "Custom Attributes",
    helpText: "Add descriptions for each attribute",
    keyType: "text",
    keyPlaceholder: "Attribute Name",
    valueType: "textarea",
    valuePlaceholder: "Attribute Description",
    validateOn: "change",
  },
};

export const WithNumberValues: Story = {
  render: (args) => <FormFieldMapWithState {...args} />,
  args: {
    label: "Numeric Properties",
    helpText: "Define numeric properties",
    keyType: "text",
    keyPlaceholder: "Property Name",
    valueType: "number",
    valuePlaceholder: "Value",
    defaultValue: 0,
    validateOn: "change",
  },
};

export const WithPrefilledData: Story = {
  render: (args) => {
    const [object] = useState(() => {
      const obj = createObjectWithValidation();
      obj.attributes = {
        industry: "Technology",
        size: "Enterprise",
        location: "San Francisco",
      };
      return obj;
    });

    return (
      <div className="p-4">
        <FormFieldMap {...args} record={object} field="attributes" />
      </div>
    );
  },
  args: {
    label: "Object Attributes",
    keyType: "text",
    keyPlaceholder: "Key",
    valueType: "text",
    valuePlaceholder: "Value",
    validateOn: "change",
  },
};

export const WithValidationError: Story = {
  render: (args) => {
    const [object] = useState(() => {
      const obj = createObjectWithValidation();
      obj.tryValidation = true; // Force validation to show error
      obj.attributes = {}; // Empty object to trigger validation error
      return obj;
    });

    return (
      <div className="p-4">
        <FormFieldMap
          {...args}
          record={object}
          field="attributes"
          required={true}
        />
      </div>
    );
  },
  args: {
    label: "Object Attributes (Required)",
    helpText: "At least one attribute must be defined",
    keyType: "text",
    keyPlaceholder: "Key",
    valueType: "text",
    valuePlaceholder: "Value",
    validateOn: "change",
  },
};
