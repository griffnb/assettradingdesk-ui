import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import CodeEdit from "./CodeEdit";

const meta = {
  title: "Common/Form/CodeEdit",
  component: CodeEdit,
  argTypes: {
    value: { control: "text" },
    language: { control: "text" },
    wrapperClassName: { control: "text" },
    editorClassName: { control: "text" },
    onChange: { action: "changed" },
  },
} satisfies Meta<typeof CodeEdit>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: "const hello = 'world';",
    language: "javascript",
    onChange: () => {},
  },
  render: (args) => {
    const [value, setValue] = useState(args.value);
    return (
      <CodeEdit
        {...args}
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
          args.onChange(newValue);
        }}
      />
    );
  },
};

export const WithDifferentLanguage: Story = {
  args: {
    value: "<h1>Hello, World!</h1>",
    language: "html",
    onChange: () => {},
  },
  render: (args) => {
    const [value, setValue] = useState(args.value);
    return (
      <CodeEdit
        {...args}
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
          args.onChange(newValue);
        }}
      />
    );
  },
};

export const WithCustomStyles: Story = {
  args: {
    value: "body { background-color: #f0f0f0; }",
    language: "css",
    wrapperClassName: "custom-wrapper",
    editorClassName: "custom-editor",
    onChange: () => {},
  },
  render: (args) => {
    const [value, setValue] = useState(args.value);
    return (
      <CodeEdit
        {...args}
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
          args.onChange(newValue);
        }}
      />
    );
  },
};
