import type { Meta, StoryObj } from "@storybook/react";
import { ScrollArea, ScrollBar } from "./scroll-area";

const meta: Meta<typeof ScrollArea> = {
  title: "Common/Components/UI/ScrollArea",
  component: ScrollArea,
  argTypes: {
    className: {
      control: "text",
      description: "Additional CSS classes",
    },
  },
  decorators: [
    (Story) => (
      <div className="w-full h-64 border border-gray-200 rounded-lg p-4">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Long content for vertical scrolling
const LongContentVertical = () => (
  <div>
    {Array.from({ length: 20 }, (_, i) => (
      <p key={i} className="mb-2">
        Scroll content line {i + 1} - Lorem ipsum dolor sit amet, consectetur
        adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua.
      </p>
    ))}
  </div>
);

// Wide content for horizontal scrolling
const WideContentHorizontal = () => (
  <div className="inline-block min-w-[800px]">
    {Array.from({ length: 10 }, (_, i) => (
      <span key={i} className="inline-block mr-4 p-2 bg-gray-100">
        Wide content block {i + 1}
      </span>
    ))}
  </div>
);

export const Default: Story = {
  args: {
    children: <LongContentVertical />,
  },
  render: (args) => (
    <ScrollArea {...args}>
      {args.children}
    </ScrollArea>
  ),
};

export const HorizontalScroll: Story = {
  args: {
    children: <WideContentHorizontal />,
  },
  render: (args) => (
    <div className="w-64">
      <ScrollArea {...args}>
        {args.children}
      </ScrollArea>
    </div>
  ),
};

export const CustomScrollbar: Story = {
  render: () => (
    <div className="w-64 h-64 border border-gray-200 rounded-lg p-4">
      <ScrollArea>
        <LongContentVertical />
        <ScrollBar
          orientation="vertical"
          className="bg-blue-100 hover:bg-blue-200"
        />
      </ScrollArea>
    </div>
  ),
};

export const DarkModeScrollbar: Story = {
  parameters: {
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'dark', value: '#000000' },
      ],
    },
  },
  render: () => (
    <div className="dark w-64 h-64 border border-gray-800 rounded-lg p-4">
      <ScrollArea>
        <LongContentVertical />
        <ScrollBar orientation="vertical" />
      </ScrollArea>
    </div>
  ),
};