import { IConstant } from "@/models/types/constants";
import type { Meta, StoryObj } from "@storybook/react";
import { MultiComboBoxBase, MultiComboBoxBaseProps } from "./MultiComboBoxBase";

const meta = {
  component: MultiComboBoxBase<IConstant>,
  title: "Common/Fields/Base/MultiComboBoxBase",
  argTypes: {
    options: { control: "object" },
    handleChange: { action: "handleChange" },
    selected: { control: "object" },
    idField: { control: "text" },
    optionField: { control: "text" },
  },
} satisfies Meta<typeof MultiComboBoxBase<IConstant>>;

export default meta;

type Story = StoryObj<typeof meta>;

const options: IConstant[] = [
  { id: 1, label: "Option 1" },
  { id: 2, label: "Option 2" },
  { id: 3, label: "Option 3" },
  { id: 4, label: "Option 4" },
  { id: 5, label: "Option 5" },
  { id: 6, label: "Option 6" },
  { id: 7, label: "Option 7" },
  { id: 8, label: "Option 8" },
  { id: 9, label: "Option 9" },
];

export const Default: Story = {
  args: {
    options: options,
    handleChange: (value: IConstant[]) => {
      console.log("Selected option:", value);
    },
    selected: options[0],
    idField: "id",
    optionField: "label",
  } as MultiComboBoxBaseProps<IConstant>,
  render: (args) => (
    <div className="w-64">
      <MultiComboBoxBase {...args} />
    </div>
  ),
};

export const WithPreFilledData: Story = {
  args: {
    options: options,
    handleChange: (value: IConstant[]) => {
      console.log("Selected option:", value);
    },
    selected: options[1],
    idField: "id",
    optionField: "label",
  } as MultiComboBoxBaseProps<IConstant>,
};

export const WithClear: Story = {
  args: {
    options: options,
    handleChange: (value: IConstant[]) => {
      console.log("Selected option:", value);
    },
    selected: options[1],
    idField: "id",
    optionField: "label",
    showClear: true,
  } as MultiComboBoxBaseProps<IConstant>,
};
