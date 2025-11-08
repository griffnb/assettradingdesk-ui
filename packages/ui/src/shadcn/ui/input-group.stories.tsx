import type { Meta, StoryObj } from "@storybook/react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
  InputGroupButton,
  InputGroupTextarea
} from "./input-group";
import { SearchIcon, SendIcon } from "lucide-react";

const meta: Meta<typeof InputGroup> = {
  title: "Common/Components/UI/InputGroup",
  component: InputGroup,
  subcomponents: {
    InputGroupAddon,
    InputGroupInput,
    InputGroupText,
    InputGroupButton,
    InputGroupTextarea
  },
  argTypes: {
    className: {
      control: 'text',
      description: 'Additional CSS classes for the input group',
    },
  },
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <InputGroup>
      <InputGroupAddon>
        <SearchIcon />
      </InputGroupAddon>
      <InputGroupInput placeholder="Search..." />
      <InputGroupButton>
        <SendIcon />
      </InputGroupButton>
    </InputGroup>
  ),
};

export const WithText: Story = {
  render: () => (
    <InputGroup>
      <InputGroupAddon>$</InputGroupAddon>
      <InputGroupInput placeholder="Enter amount" />
      <InputGroupText>.00</InputGroupText>
    </InputGroup>
  ),
};

export const InlineEndAlignment: Story = {
  render: () => (
    <InputGroup>
      <InputGroupInput placeholder="Enter text" />
      <InputGroupAddon align="inline-end">
        <SearchIcon />
      </InputGroupAddon>
    </InputGroup>
  ),
};

export const BlockStartAlignment: Story = {
  render: () => (
    <InputGroup>
      <InputGroupAddon align="block-start">
        <InputGroupText>Description</InputGroupText>
      </InputGroupAddon>
      <InputGroupTextarea placeholder="Enter description..." />
    </InputGroup>
  ),
};

export const WithMultipleButtons: Story = {
  render: () => (
    <InputGroup>
      <InputGroupAddon>https://</InputGroupAddon>
      <InputGroupInput placeholder="Enter website" />
      <InputGroupButton size="icon-xs">
        <SearchIcon />
      </InputGroupButton>
      <InputGroupButton size="icon-xs">
        <SendIcon />
      </InputGroupButton>
    </InputGroup>
  ),
};

export const ErrorState: Story = {
  render: () => (
    <InputGroup>
      <InputGroupAddon>@</InputGroupAddon>
      <InputGroupInput
        placeholder="Enter email"
        aria-invalid="true"
      />
      <InputGroupText>Invalid email</InputGroupText>
    </InputGroup>
  ),
};

export const Disabled: Story = {
  render: () => (
    <InputGroup data-disabled="true">
      <InputGroupAddon>Username</InputGroupAddon>
      <InputGroupInput
        placeholder="Enter username"
        disabled
      />
      <InputGroupButton disabled>
        <SendIcon />
      </InputGroupButton>
    </InputGroup>
  ),
};