import { ValidationRules } from "@/utils/validations";
import type { Meta, StoryObj } from "@storybook/react";
import { makeAutoObservable } from "mobx";
import { FormFieldArrayMap } from "./FormFieldArrayMap";

const meta: Meta<typeof FormFieldArrayMap<Example>> = {
  title: "Common/Form/Fields/FormFieldArrayMap",
  component: FormFieldArrayMap,
  argTypes: {
    keyType: { control: "text" },
    keyPlaceholder: { control: "text" },
    valueType: { control: "text" },
    valuePlaceholder: { control: "text" },
  },
} satisfies Meta<typeof FormFieldArrayMap>;

export default meta;

type Story = StoryObj<typeof meta>;

class Example {
  map_values: { key: string; value: string }[] = [];
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
    field: "map_values",
    keyType: "text",
    keyPlaceholder: "Enter key",
    valueType: "text",
    valuePlaceholder: "Enter value",
  },
};

export const WithNumberValues: Story = {
  args: {
    record: sampleRecord,
    field: "map_values",
    keyType: "text",
    keyPlaceholder: "Enter key",
    valueType: "number",
    valuePlaceholder: "Enter value",
  },
};

export const WithTextAreaValues: Story = {
  args: {
    record: sampleRecord,
    field: "map_values",
    keyType: "text",
    keyPlaceholder: "Enter key",
    valueType: "textarea",
    valuePlaceholder: "Enter value",
  },
};
