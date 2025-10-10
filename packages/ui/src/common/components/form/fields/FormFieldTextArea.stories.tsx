import type { Meta, StoryObj } from "@storybook/react";
import { makeAutoObservable } from "mobx";
import { useState } from "react";
import FormFieldTextArea from "./FormFieldTextArea";

class SimpleObject {
  string_field: string = "";
  number_field: number = 0;
  bio: string = "";
  tryValidation: boolean = false;
  validationRules: any = {};
  constructor() {
    makeAutoObservable(this);
  }
}

const meta = {
  title: "Common/Form/Fields/FormFieldTextArea",
  component: FormFieldTextArea,
  argTypes: {
    record: { control: "object" },
    field: { control: "text" },
    label: { control: "text" },
    placeholder: { control: "text" },
    helpText: { control: "text" },
    wrapVariant: {
      control: "select",
      options: ["default", "none", "bordered"],
    },
    validateOn: { control: "select", options: ["blur", "change", "submit"] },
    required: { control: "boolean" },
    rows: { control: "number" },
    noExpand: { control: "boolean" },
    wrapSize: { control: "select", options: ["default", "full"] },
  },
} satisfies Meta<typeof FormFieldTextArea>;

export default meta;
type Story = StoryObj<typeof meta>;

// Create a simple object with validation rules
const createObjectWithValidation = () => {
  const obj = new SimpleObject();

  obj.validationRules = {
    bio: {
      required: {
        message: "Bio is required",
      },
      min_length: {
        setting: 10,
        message: "Bio must be at least 10 characters",
      },
      max_length: {
        setting: 500,
        message: "Bio cannot be longer than 500 characters",
      },
    },
  };
  obj.tryValidation = true;

  return obj;
};

// State wrapper for interactive stories
const FormFieldTextAreaWithState = (props: any) => {
  const [object] = useState(createObjectWithValidation());

  return (
    <div className="p-4">
      <FormFieldTextArea {...props} record={object} field="bio" />
    </div>
  );
};

export const Default: Story = {
  render: (args) => <FormFieldTextAreaWithState {...args} />,
  args: {
    label: "Bio",
    placeholder: "Tell us about yourself...",
    helpText: "Write a brief bio that describes your background and interests",
    validateOn: "blur",
    rows: 5,
  } as any,
};

export const WithValidation: Story = {
  render: (args) => <FormFieldTextAreaWithState {...args} />,
  args: {
    label: "Bio (Required)",
    placeholder: "Tell us about yourself...",
    helpText: "Must be between 10-500 characters",
    validateOn: "change",
    rows: 5,
    required: true,
  } as any,
};

export const WithPrefilledText: Story = {
  args: {} as any,
  render: () => {
    const [object] = useState(() => {
      const obj = createObjectWithValidation();
      obj.bio =
        "This is some pre-filled text in the text area. The component will trim whitespace on blur.";
      return obj;
    });

    return (
      <div className="p-4">
        <FormFieldTextArea label="Test" record={object} field="bio" />
      </div>
    );
  },
};

export const FullHeight: Story = {
  render: (args) => {
    const [object] = useState(createObjectWithValidation());

    return (
      <div className="h-64 p-4">
        <FormFieldTextArea
          {...args}
          record={object}
          field="bio"
          wrapSize="full"
        />
      </div>
    );
  },
  args: {
    label: "Full Height Text Area",
    placeholder: "This text area will expand to fill its container height",
    noExpand: false,
    rows: 5,
  } as any,
};

export const NoExpand: Story = {
  render: (args) => <FormFieldTextAreaWithState {...args} />,
  args: {
    label: "Fixed Size Text Area",
    placeholder: "This text area cannot be resized by the user",
    noExpand: true,
    rows: 5,
  } as any,
};
