import { AdminModel } from "@/models/models/admin/model/AdminModel";
import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { ModelSearchMultiSelectInput } from "./ModelSearchMultiSelectInput";

const meta = {
  title: "Common/Fields/ModelSearchMultiSelectInput",
  component: ModelSearchMultiSelectInput,
  argTypes: {},
} satisfies Meta<typeof ModelSearchMultiSelectInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  //@ts-expect-error - required args are not provided
  args: {},
  render: () => {
    const [selectedValues, setSelectedValues] = useState<any[]>([]);
    return (
      <ModelSearchMultiSelectInput<AdminModel>
        modelDisplayField="name"
        modelName="admin"
        modelSearchParam="q"
        values={selectedValues}
        handleChange={(newValues) => {
          setSelectedValues(newValues.map((v) => v.id as string));
        }}
      />
    );
  },
};

export const ComboBox: Story = {
  //@ts-expect-error - required args are not provided
  args: {},
  render: () => {
    const [selectedValues, setSelectedValues] = useState<any[]>([]);
    return (
      <ModelSearchMultiSelectInput<AdminModel>
        as="combobox"
        modelDisplayField="name"
        modelName="admin"
        modelSearchParam="q"
        values={selectedValues}
        handleChange={(newValues) => {
          setSelectedValues(newValues.map((v) => v.id as string));
        }}
      />
    );
  },
};
