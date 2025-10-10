import type { Meta, StoryObj } from "@storybook/react";
import { makeAutoObservable } from "mobx";
import { useState } from "react";
import { Tag } from "../../fields/base/TagInputBase";
import FormFieldTagInput from "./FormFieldTagInput";

class SimpleObject {
  string_field: string = "";
  number_field: number = 0;
  tags: Tag[] = [];
  tryValidation: boolean = false;
  validationRules: any = {};
  constructor() {
    makeAutoObservable(this);
  }
}

const meta: Meta<typeof FormFieldTagInput> = {
  title: "Common/Form/Fields/FormFieldTagInput",
  component: FormFieldTagInput,
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
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Create a simple object with validation rules
const createObjectWithValidation = () => {
  const obj = new SimpleObject();

  obj.validationRules = {
    tags: {
      required: {
        message: "At least one tag is required",
      },
    },
  };

  return obj;
};

// State wrapper for interactive stories
const FormFieldTagInputWithState = (props: any) => {
  const [object] = useState(createObjectWithValidation());

  return (
    <div className="p-4">
      <FormFieldTagInput {...props} record={object} field="tags" />
    </div>
  );
};

export const Default: Story = {
  render: (args) => <FormFieldTagInputWithState {...args} />,
  args: {
    label: "Interests",
    placeholder: "Type and press Enter to add tags",
    helpText: "Add topics you're interested in",
    validateOn: "change",
  },
};

export const WithPrefilledTags: Story = {
  render: (args) => {
    const [object] = useState(() => {
      const obj = createObjectWithValidation();
      obj.tags = ["React", "TypeScript", "JavaScript"] as unknown as Tag[];
      return obj;
    });

    return (
      <div className="p-4">
        <FormFieldTagInput {...args} record={object} field="tags" />
      </div>
    );
  },
  args: {
    label: "Skills",
    placeholder: "Add a skill",
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
        <FormFieldTagInput
          {...args}
          record={object}
          field="tags"
          required={true}
        />
      </div>
    );
  },
  args: {
    label: "Interests (Required)",
    placeholder: "Please add at least one interest",
    validateOn: "change",
  },
};
