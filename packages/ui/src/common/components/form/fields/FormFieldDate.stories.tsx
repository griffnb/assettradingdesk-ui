import type { Meta, StoryObj } from "@storybook/react-vite";
import dayjs from "dayjs";
import { makeAutoObservable } from "mobx";
import { useState } from "react";
import { FormFieldDate } from "./FormFieldDate";

class SimpleObject {
  string_field: string = "";
  number_field: number = 0;
  birth_date: string | dayjs.Dayjs | null = null;
  tryValidation: boolean = false;
  validationRules: any = {};
  constructor() {
    makeAutoObservable(this);
  }
}

const meta: Meta<typeof FormFieldDate> = {
  title: "Common/Form/Fields/FormFieldDate",
  component: FormFieldDate,
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
    displayFormat: { control: "text" },
    setFormat: { control: "text" },
    icon: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Create a simple object with validation rules
const createObjectWithValidation = () => {
  const obj = new SimpleObject();

  obj.validationRules = {
    birth_date: {
      required: {
        message: "Birth date is required",
      },
    },
  };

  return obj;
};

// State wrapper for interactive stories
const FormFieldDateWithState = (props: any) => {
  const [object] = useState(createObjectWithValidation());

  return (
    <div className="p-4">
      <FormFieldDate {...props} record={object} field="birth_date" />
    </div>
  );
};

export const Default: Story = {
  render: (args) => <FormFieldDateWithState {...args} />,
  args: {
    label: "Birth Date",
    placeholder: "Select a date",
    helpText: "Enter your date of birth",
    validateOn: "change",
  },
};

export const WithCustomFormat: Story = {
  render: (args) => <FormFieldDateWithState {...args} />,
  args: {
    label: "Birth Date",
    placeholder: "Select a date",
    helpText: "Date will be formatted as Month DD, YYYY",
    displayFormat: "MMMM DD, YYYY",
    setFormat: "YYYY-MM-DD",
    validateOn: "change",
  },
};

export const WithDateConstraints: Story = {
  render: (args) => <FormFieldDateWithState {...args} />,
  args: {
    label: "Appointment Date",
    placeholder: "Select a date",
    helpText: "Select a date between now and 30 days from now",
    minDate: new Date(),
    maxDate: dayjs().add(30, "day").toDate(),
    validateOn: "change",
  },
};

export const WithPreselectedDate: Story = {
  render: (args) => {
    const [object] = useState(() => {
      const obj = createObjectWithValidation();
      obj.birth_date = "1990-01-15";
      return obj;
    });

    return (
      <div className="p-4">
        <FormFieldDate {...args} record={object} field="birth_date" />
      </div>
    );
  },
  args: {
    label: "Birth Date",
    validateOn: "change",
  },
};

export const WithIcon: Story = {
  render: (args) => <FormFieldDateWithState {...args} />,
  args: {
    label: "Birth Date",
    placeholder: "Select a date",
    icon: "calendar",
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
        <FormFieldDate
          {...args}
          record={object}
          field="birth_date"
          required={true}
        />
      </div>
    );
  },
  args: {
    label: "Birth Date (Required)",
    placeholder: "Please select a date",
    validateOn: "change",
  },
};
