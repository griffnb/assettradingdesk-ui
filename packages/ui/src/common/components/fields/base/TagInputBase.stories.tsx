import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Tag, TagInputBase } from "./TagInputBase";

const tags: Tag[] = ["Tag 1", "Tag 2", "Tag 3"];

const meta = {
  title: "Common/Fields/Base/TagInputBase",
  component: TagInputBase,
  argTypes: {
    placeholder: { control: "text" },
    errorMessages: { control: "object" },
    handleChange: { control: false },
    tags: { control: "object" },
    prepend: { control: "text" },
    append: { control: "text" },
  },
} satisfies Meta<typeof TagInputBase>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    tags: tags,
    errorMessages: [],
    handleChange: () => {},
    prepend: null,
    append: null,
    placeholder: "Enter tags",
  },
  render: (args) => {
    const [value, setValue] = useState<Tag[]>(args.tags);
    return (
      <TagInputBase
        {...args}
        tags={value}
        handleChange={(newTags) => {
          setValue(newTags);
        }}
      />
    );
  },
};

export const WithPlaceholder: Story = {
  args: {
    tags: [],
    errorMessages: [],
    handleChange: () => {},
    prepend: null,
    append: null,
    placeholder: "Enter tags",
  },
  render: (args) => {
    const [value, setValue] = useState<Tag[]>(args.tags);
    return (
      <TagInputBase
        {...args}
        tags={value}
        handleChange={(newTags) => {
          setValue(newTags);
        }}
      />
    );
  },
};

export const WithPrepend: Story = {
  args: {
    tags: [],
    errorMessages: [],
    handleChange: () => {},
    prepend: "Prepend",
    append: null,
    placeholder: "Enter tags",
  },
  render: (args) => {
    const [value, setValue] = useState<Tag[]>(args.tags);
    return (
      <TagInputBase
        {...args}
        tags={value}
        handleChange={(newTags) => {
          setValue(newTags);
        }}
      />
    );
  },
};

export const WithAppend: Story = {
  args: {
    tags: [],
    errorMessages: [],
    handleChange: () => {},
    prepend: null,
    append: "Append",
    placeholder: "Enter tags",
  },
  render: (args) => {
    const [value, setValue] = useState<Tag[]>(args.tags);
    return (
      <TagInputBase
        {...args}
        tags={value}
        handleChange={(newTags) => {
          setValue(newTags);
        }}
      />
    );
  },
};

export const WithErrors: Story = {
  args: {
    tags: [],
    errorMessages: ["This field is required.", "Please enter valid tags."],
    handleChange: () => {},
    prepend: null,
    append: null,
    placeholder: "Enter tags",
  },
  render: (args) => {
    const [value, setValue] = useState<Tag[]>(args.tags);
    return (
      <TagInputBase
        {...args}
        tags={value}
        handleChange={(newTags) => {
          setValue(newTags);
        }}
      />
    );
  },
};

export const WithPrependAndAppend: Story = {
  args: {
    tags: [],
    errorMessages: [],
    handleChange: () => {},
    prepend: "Prepend",
    append: "Append",
    placeholder: "Enter tags",
  },
  render: (args) => {
    const [value, setValue] = useState<Tag[]>(args.tags);
    return (
      <TagInputBase
        {...args}
        tags={value}
        handleChange={(newTags) => {
          setValue(newTags);
        }}
      />
    );
  },
};
