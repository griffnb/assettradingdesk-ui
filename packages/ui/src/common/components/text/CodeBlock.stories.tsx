import type { Meta, StoryObj } from "@storybook/react";
import CodeBlock from "./CodeBlock";

const meta = {
  title: "Common/CodeBlock",
  component: CodeBlock,
  argTypes: {
    title: { control: "text" },
    color: {
      control: "select",
      options: ["light", "medium", "dark"],
    },
    children: { control: "text" },
  },
} satisfies Meta<typeof CodeBlock>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Default Code Block",
    color: "medium",
    children: "const hello = 'world';",
  },
};

export const LightTheme: Story = {
  args: {
    title: "Light Theme Code Block",
    color: "light",
    children: "const hello = 'world';",
  },
};

export const MediumTheme: Story = {
  args: {
    title: "Medium Theme Code Block",
    color: "medium",
    children: "const hello = 'world';",
  },
};

export const DarkTheme: Story = {
  args: {
    title: "Dark Theme Code Block",
    color: "dark",
    children: "const hello = 'world';",
  },
};
