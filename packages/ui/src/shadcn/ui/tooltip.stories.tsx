import type { Meta, StoryObj } from "@storybook/react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip";
import { Button } from "./button";

const meta: Meta<typeof Tooltip> = {
  title: "Common/Components/UI/Tooltip",
  component: Tooltip,
  argTypes: {
    delayDuration: {
      control: { type: "number", min: 0, max: 1000, step: 100 },
      description: "Delay before tooltip appears (in milliseconds)",
    },
  },
  decorators: [
    (Story) => (
      <div className="flex justify-center items-center h-[300px] w-full p-4">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Tooltip {...args}>
      <TooltipTrigger asChild>
        <Button variant="outline">Hover me</Button>
      </TooltipTrigger>
      <TooltipContent>
        This is a tooltip
      </TooltipContent>
    </Tooltip>
  ),
};

export const WithDelay: Story = {
  render: () => (
    <Tooltip delayDuration={500}>
      <TooltipTrigger asChild>
        <Button variant="outline">Hover with 500ms delay</Button>
      </TooltipTrigger>
      <TooltipContent>
        Delayed tooltip (500ms)
      </TooltipContent>
    </Tooltip>
  ),
};

export const MultipleTooltips: Story = {
  render: () => (
    <div className="flex gap-4">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">First Tooltip</Button>
        </TooltipTrigger>
        <TooltipContent>
          First tooltip content
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="secondary">Second Tooltip</Button>
        </TooltipTrigger>
        <TooltipContent>
          Second tooltip content
        </TooltipContent>
      </Tooltip>
    </div>
  ),
};

export const LongContent: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline">Hover for long text</Button>
      </TooltipTrigger>
      <TooltipContent>
        This is a very long tooltip content that demonstrates how the tooltip
        handles multiple lines of text with additional context and explanation.
      </TooltipContent>
    </Tooltip>
  ),
};