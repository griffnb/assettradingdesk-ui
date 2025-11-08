import type { Meta, StoryObj } from "@storybook/react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./hover-card";
import { Button } from "./button";

const meta: Meta<typeof HoverCard> = {
  title: "Common/Components/UI/HoverCard",
  component: HoverCard,
  argTypes: {
    // No additional argTypes needed for root component
  },
  decorators: [
    (Story) => (
      <div className="flex justify-center items-center h-screen">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="outline">Hover Me</Button>
      </HoverCardTrigger>
      <HoverCardContent>
        <div className="space-y-2">
          <h4 className="text-sm font-semibold">@nextjs</h4>
          <p className="text-sm text-neutral-600">
            The React Framework – created and maintained by @vercel
          </p>
          <div className="flex items-center pt-2">
            <span className="text-xs text-neutral-500">Learn more</span>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  ),
};

export const AlignStart: Story = {
  render: () => (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="outline">Align Start</Button>
      </HoverCardTrigger>
      <HoverCardContent align="start">
        <div className="space-y-2">
          <h4 className="text-sm font-semibold">Alignment Start</h4>
          <p className="text-sm text-neutral-600">
            This hover card is aligned to the start of the trigger
          </p>
        </div>
      </HoverCardContent>
    </HoverCard>
  ),
};

export const AlignEnd: Story = {
  render: () => (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="outline">Align End</Button>
      </HoverCardTrigger>
      <HoverCardContent align="end">
        <div className="space-y-2">
          <h4 className="text-sm font-semibold">Alignment End</h4>
          <p className="text-sm text-neutral-600">
            This hover card is aligned to the end of the trigger
          </p>
        </div>
      </HoverCardContent>
    </HoverCard>
  ),
};

export const CustomOffset: Story = {
  render: () => (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="outline">Custom Offset</Button>
      </HoverCardTrigger>
      <HoverCardContent sideOffset={10}>
        <div className="space-y-2">
          <h4 className="text-sm font-semibold">Large Offset</h4>
          <p className="text-sm text-neutral-600">
            This hover card has a larger side offset of 10
          </p>
        </div>
      </HoverCardContent>
    </HoverCard>
  ),
};

export const DarkMode: Story = {
  render: () => (
    <div className="dark">
      <HoverCard>
        <HoverCardTrigger asChild>
          <Button variant="outline">Dark Mode</Button>
        </HoverCardTrigger>
        <HoverCardContent>
          <div className="space-y-2">
            <h4 className="text-sm font-semibold">Dark Mode Hover Card</h4>
            <p className="text-sm text-neutral-300">
              This hover card demonstrates dark mode styling
            </p>
          </div>
        </HoverCardContent>
      </HoverCard>
    </div>
  ),
};