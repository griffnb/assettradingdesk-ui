import { IConstant } from "@/models/types/constants";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { makeAutoObservable } from "mobx";
import { useState } from "react";
import { FormFieldSelect } from "./FormFieldSelect";

class SimpleObject {
  string_field: string = "";
  number_field: number = 0;
  country: string | null = null;
  tryValidation: boolean = false;
  validationRules: any = {};
  constructor() {
    makeAutoObservable(this);
  }
}

const meta: Meta<typeof FormFieldSelect> = {
  title: "Common/Form/Fields/FormFieldSelect",
  component: FormFieldSelect,
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
    noSearch: { control: "boolean" },
    as: { control: "radio", options: ["select", "combobox"] },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Sample constants for options
const countryOptions: IConstant[] = [
  { id: "us", label: "United States" },
  { id: "ca", label: "Canada" },
  { id: "mx", label: "Mexico" },
  { id: "uk", label: "United Kingdom" },
  { id: "fr", label: "France" },
  { id: "de", label: "Germany" },
  { id: "jp", label: "Japan" },
  { id: "au", label: "Australia" },
];

// Create a simple object with validation rules
const createObjectWithValidation = () => {
  const obj = new SimpleObject();

  obj.validationRules = {
    country: {
      required: {
        message: "Country is required",
      },
    },
  };

  return obj;
};

// State wrapper for interactive stories
const FormFieldSelectWithState = (props: any) => {
  const [object] = useState(createObjectWithValidation());

  return (
    <div className="p-4">
      <FormFieldSelect
        {...props}
        record={object}
        field="country"
        options={countryOptions}
      />
    </div>
  );
};

export const Default: Story = {
  render: (args) => <FormFieldSelectWithState {...args} />,
  args: {
    label: "Country",
    placeholder: "Select a country",
    helpText: "Select your country of residence",
    validateOn: "change",
  },
};

export const AsCombobox: Story = {
  render: (args) => <FormFieldSelectWithState {...args} />,
  args: {
    label: "Country",
    placeholder: "Select a country",
    helpText: "Type to search for a country",
    as: "combobox",
    validateOn: "change",
  },
};

export const NoSearch: Story = {
  render: (args) => <FormFieldSelectWithState {...args} />,
  args: {
    label: "Country",
    placeholder: "Select a country",
    helpText: "Select from the dropdown list",
    noSearch: true,
    validateOn: "change",
  },
};

export const WithPreselectedValue: Story = {
  render: (args) => {
    const [object] = useState(() => {
      const obj = createObjectWithValidation();
      obj.country = "ca";
      return obj;
    });

    return (
      <div className="p-4">
        <FormFieldSelect
          {...args}
          record={object}
          field="country"
          options={countryOptions}
        />
      </div>
    );
  },
  args: {
    label: "Country",
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
        <FormFieldSelect
          {...args}
          record={object}
          field="country"
          options={countryOptions}
          required={true}
        />
      </div>
    );
  },
  args: {
    label: "Country (Required)",
    placeholder: "Please select a country",
    validateOn: "change",
  },
};
