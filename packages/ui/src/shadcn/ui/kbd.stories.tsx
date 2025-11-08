import type { Meta, StoryObj } from "@storybook/react";
import { Kbd, KbdGroup } from "./kbd";

const meta: Meta<typeof Kbd> = {
  title: "Common/Components/UI/Kbd",
  component: Kbd,
  argTypes: {
    children: {
      control: "text",
      description: "The key or text to display in the keyboard shortcut",
    },
  },
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "⌘",
  },
};

export const SingleKey: Story = {
  args: {
    children: "Enter",
  },
};

export const MultipleKeys: Story = {
  render: () => (
    <KbdGroup>
      <Kbd>⌘</Kbd>
      <Kbd>K</Kbd>
    </KbdGroup>
  ),
};

export const LongKey: Story = {
  args: {
    children: "Ctrl+Shift+Alt",
  },
};

export const WithIcon: Story = {
  render: () => (
    <Kbd>
      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 6 6 18" />
        <path d="m6 6 12 12" />
      </svg>
      Esc
    </Kbd>
  ),
};