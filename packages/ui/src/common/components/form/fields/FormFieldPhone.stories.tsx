import type { Meta, StoryObj } from "@storybook/react-vite";
import { makeAutoObservable } from "mobx";
import { useState } from "react";
import { FormFieldPhone } from "./FormFieldPhone";

class SimpleObject {
  string_field: string = "";
  number_field: number = 0;
  phone: string = "";
  tryValidation: boolean = false;
  validationRules: any = {};
  constructor() {
    makeAutoObservable(this);
  }
}

const meta: Meta<typeof FormFieldPhone> = {
  title: "Common/Form/Fields/FormFieldPhone",
  component: FormFieldPhone,
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
    phone: {
      required: {
        message: "Phone number is required",
      },
    },
  };

  return obj;
};

// State wrapper for interactive stories
const FormFieldPhoneWithState = (props: any) => {
  const [object] = useState(createObjectWithValidation());

  return (
    <div className="p-4">
      <FormFieldPhone {...props} record={object} field="phone" />
    </div>
  );
};

export const Default: Story = {
  render: (args) => <FormFieldPhoneWithState {...args} />,
  args: {
    label: "Phone Number",
    placeholder: "(555) 555-5555",
    helpText: "Enter your phone number",
    validateOn: "blur",
  },
};

export const WithPrefilledPhone: Story = {
  render: (args) => {
    const [object] = useState(() => {
      const obj = createObjectWithValidation();
      obj.phone = "5551234567";
      return obj;
    });

    return (
      <div className="p-4">
        <FormFieldPhone {...args} record={object} field="phone" />
      </div>
    );
  },
  args: {
    label: "Phone Number",
    validateOn: "blur",
  },
};

export const ReadOnly: Story = {
  render: (args) => {
    const [object] = useState(() => {
      const obj = createObjectWithValidation();
      obj.phone = "5551234567";
      return obj;
    });

    return (
      <div className="p-4">
        <FormFieldPhone
          {...args}
          record={object}
          field="phone"
          readOnly={true}
        />
      </div>
    );
  },
  args: {
    label: "Phone Number (Read Only)",
    helpText: "This phone number cannot be changed",
  },
};

export const WithExtraErrors: Story = {
  render: (args) => <FormFieldPhoneWithState {...args} />,
  args: {
    label: "Phone Number",
    placeholder: "(555) 555-5555",
    extraErrors: ["This phone number is already in use"],
    validateOn: "blur",
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
        <FormFieldPhone
          {...args}
          record={object}
          field="phone"
          required={true}
        />
      </div>
    );
  },
  args: {
    label: "Phone Number (Required)",
    placeholder: "Please enter your phone number",
    validateOn: "blur",
  },
};
