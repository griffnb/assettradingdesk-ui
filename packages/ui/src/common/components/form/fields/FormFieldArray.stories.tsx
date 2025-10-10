import { ValidationRules } from "@/utils/validations";
import type { Meta, StoryObj } from "@storybook/react";
import { makeAutoObservable } from "mobx";
import FormFieldArray from "./FormFieldArray";

const meta: Meta<typeof FormFieldArray<Example>> = {
  title: "Common/Form/Fields/FormFieldArray",
  component: FormFieldArray,
  argTypes: {
    valueType: { control: "text" },
    valuePlaceholder: { control: "text" },
  },
} satisfies Meta<typeof FormFieldArray>;

export default meta;

type Story = StoryObj<typeof meta>;

class Example {
  string_values: string[] = [];
  number_values: number[] = [];
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
    record: sampleRecord,
    field: "string_values",
    valueType: "text",
    valuePlaceholder: "Enter value",
  },
};

export const WithNumberValues: Story = {
  args: {
    record: sampleRecord,
    field: "number_values",
    valueType: "number",
    valuePlaceholder: "Enter number",
  },
};
