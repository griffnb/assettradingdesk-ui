import type { Meta, StoryObj } from "@storybook/react-vite";
import { SelectOptions } from "./SelectOptions";

interface Option {
  id: number;
  name: string;
}

const options: Option[] = [
  { id: 1, name: "Option 1" },
  { id: 2, name: "Option 2" },
  { id: 3, name: "Option 3" },
];

const meta = {
  title: "Common/Fields/Base/SelectOptions",
  component: SelectOptions<Option>,
  argTypes: {
    displayedOptions: { control: "object" },
    idField: { control: "text" },
    displayField: { control: "text" },
    selected: { control: "object" },
    show: { control: "boolean" },
    toggleOption: { action: "toggled" },
    showNoOptions: { control: "boolean" },
    searching: { control: "boolean" },
  },
} satisfies Meta<typeof SelectOptions<Option>>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    displayedOptions: options,
    idField: "id",
    displayField: "name",
    selected: [options[0] as Option],
    show: true,
    showNoOptions: false,
    toggleOption: (option: Option) => console.log("Toggled option:", option),
    searching: false,
  },
};

export const NoOptions: Story = {
  args: {
    displayedOptions: [],
    idField: "id",
    displayField: "name",
    selected: undefined,
    show: true,
    showNoOptions: true,
    toggleOption: (option: Option) => console.log("Toggled option:", option),
    searching: false,
  },
};
