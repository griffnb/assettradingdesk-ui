import { ValidationRules } from "@/utils/validations";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { makeAutoObservable } from "mobx";
import { FormFieldConstantsCreator } from "./FormFieldConstantsCreator";

const meta: Meta<typeof FormFieldConstantsCreator<Example>> = {
  title: "Common/Form/Fields/FormFieldConstantsCreator",
  component: FormFieldConstantsCreator,
  argTypes: {
    labelType: { control: "text" },
    labelPlaceholder: { control: "text" },
    valueType: { control: "text" },
    valuePlaceholder: { control: "text" },
  },
} satisfies Meta<typeof FormFieldConstantsCreator>;

export default meta;

type Story = StoryObj<typeof meta>;

class Example {
  constants: { label: string; value: string }[] = [];
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
    field: "constants",
    labelType: "text",
    labelPlaceholder: "Enter label",
    valueType: "text",
    valuePlaceholder: "Enter value",
  },
};

export const WithNumberValues: Story = {
  args: {
    record: sampleRecord,
    field: "constants",
    labelType: "text",
    labelPlaceholder: "Enter label",
    valueType: "number",
    valuePlaceholder: "Enter value",
  },
};

export const WithTextAreaValues: Story = {
  args: {
    record: sampleRecord,
    field: "constants",
    labelType: "text",
    labelPlaceholder: "Enter label",
    valueType: "textarea",
    valuePlaceholder: "Enter value",
  },
};
