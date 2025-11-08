import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "@/ui/shadcn/ui/button";
import {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText
} from "./button-group";

const meta: Meta<typeof ButtonGroup> = {
  title: "Common/Components/UI/ButtonGroup",
  component: ButtonGroup,
  argTypes: {
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"],
      description: "Orientation of the button group",
    },
  },
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const HorizontalButtonGroup: Story = {
  render: (args) => (
    <ButtonGroup {...args}>
      <Button variant="outline">First</Button>
      <Button variant="outline">Second</Button>
      <Button variant="outline">Third</Button>
    </ButtonGroup>
  ),
  args: {
    orientation: "horizontal",
  },
};

export const VerticalButtonGroup: Story = {
  render: (args) => (
    <ButtonGroup {...args}>
      <Button variant="outline">First</Button>
      <Button variant="outline">Second</Button>
      <Button variant="outline">Third</Button>
    </ButtonGroup>
  ),
  args: {
    orientation: "vertical",
  },
};

export const ButtonGroupWithSeparator: Story = {
  render: () => (
    <ButtonGroup>
      <Button variant="outline">First</Button>
      <ButtonGroupSeparator />
      <Button variant="outline">Second</Button>
      <ButtonGroupSeparator />
      <Button variant="outline">Third</Button>
    </ButtonGroup>
  ),
};

export const ButtonGroupWithText: Story = {
  render: () => (
    <ButtonGroup>
      <ButtonGroupText>Group Label</ButtonGroupText>
      <Button variant="outline">First</Button>
      <Button variant="outline">Second</Button>
      <Button variant="outline">Third</Button>
    </ButtonGroup>
  ),
};

export const MixedButtonGroup: Story = {
  render: () => (
    <ButtonGroup>
      <Button variant="outline">Filter</Button>
      <ButtonGroupSeparator />
      <ButtonGroupText>Options</ButtonGroupText>
      <Button variant="outline">Edit</Button>
      <Button variant="outline">Delete</Button>
    </ButtonGroup>
  ),
};