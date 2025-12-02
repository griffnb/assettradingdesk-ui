import { ValidationRules } from "@/utils/validations";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { makeAutoObservable } from "mobx";
import { FormFieldText } from "./FormFieldText";

const meta: Meta<typeof FormFieldText<Example>> = {
  component: FormFieldText,
  title: "Common/Form/Fields/FormFieldText",
  argTypes: {
    type: {
      control: "select",
      options: ["text", "number", "password", "email"], // Add more types if available
    },
    placeholder: { control: "text" },
    wrapVariant: { control: "text" },
    inputMode: { control: "text" },
    prepend: { control: "text" },
    append: { control: "text" },
    readOnly: { control: "boolean" },
    pattern: { control: "text" },
    required: { control: "boolean" },
    onRecordUpdate: { action: "record updated" },
  },
} satisfies Meta<typeof FormFieldText>;

export default meta;

type Story = StoryObj<typeof meta>;

class Example {
  name: string = "John Doe";
  age: number = 30;
  validationRules: ValidationRules = {
    name: {
      required: {
        message: "Name is required",
      },
    },
  };
  tryValidation: boolean = true;
  constructor() {
    makeAutoObservable(this);
  }
}

const sampleRecord = new Example();

export const Default: Story = {
  args: {
    field: "name",
    type: "text",
    placeholder: "Enter your name",
    wrapVariant: "default",
    inputMode: "text",
    prepend: "",
    readOnly: false,
    pattern: "",
    required: false,
    record: sampleRecord,
    onRecordUpdate: () => {},
    helpText: "Enter your full name",
  },
};

export const Prepend: Story = {
  args: {
    field: "name",
    type: "text",
    placeholder: "Enter your name",
    wrapVariant: "default",
    inputMode: "text",
    prepend: "$",
    readOnly: false,
    required: false,
    record: sampleRecord,
    onRecordUpdate: () => {},
    helpText: "Enter your full name",
  },
};

export const NumberField: Story = {
  args: {
    field: "age",
    type: "number",
    placeholder: "Enter your age",
    wrapVariant: "default",
    inputMode: "numeric",
    prepend: "",
    readOnly: false,
    pattern: "",
    required: false,
    record: sampleRecord,
    onRecordUpdate: () => {},
  },
};

export const ReadOnlyField: Story = {
  args: {
    field: "name",
    type: "text",
    placeholder: "Enter your name",
    wrapVariant: "default",
    inputMode: "text",
    prepend: "",
    readOnly: true,
    pattern: "",
    required: false,
    record: sampleRecord,
    onRecordUpdate: () => {},
  },
};
