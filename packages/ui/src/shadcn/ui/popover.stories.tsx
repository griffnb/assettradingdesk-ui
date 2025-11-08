import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "@/ui/shadcn/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

const meta: Meta<typeof Popover> = {
  title: "Common/Components/UI/Popover",
  component: Popover,
  subcomponents: {
    PopoverTrigger,
    PopoverContent,
  },
  argTypes: {
    // Note: Popover root component doesn't have significant prop variations
    // We'll showcase different configurations through its subcomponents
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Open Popover</Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="space-y-2">
          <h4 className="font-medium leading-none">Popover Content</h4>
          <p className="text-sm text-neutral-500">
            This is a simple popover with some example content.
          </p>
        </div>
      </PopoverContent>
    </Popover>
  ),
};

export const WithAlignments: Story = {
  render: () => (
    <div className="flex gap-4">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">Center (Default)</Button>
        </PopoverTrigger>
        <PopoverContent>
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Center Aligned</h4>
            <p className="text-sm text-neutral-500">
              This popover is center-aligned by default.
            </p>
          </div>
        </PopoverContent>
      </Popover>

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">Start Aligned</Button>
        </PopoverTrigger>
        <PopoverContent align="start">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Start Aligned</h4>
            <p className="text-sm text-neutral-500">
              This popover is aligned to the start of the trigger.
            </p>
          </div>
        </PopoverContent>
      </Popover>

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">End Aligned</Button>
        </PopoverTrigger>
        <PopoverContent align="end">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">End Aligned</h4>
            <p className="text-sm text-neutral-500">
              This popover is aligned to the end of the trigger.
            </p>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  ),
};

export const WithDifferentSideOffsets: Story = {
  render: () => (
    <div className="flex gap-4">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">Default Offset</Button>
        </PopoverTrigger>
        <PopoverContent>
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Default Offset</h4>
            <p className="text-sm text-neutral-500">
              Uses the default 4px side offset.
            </p>
          </div>
        </PopoverContent>
      </Popover>

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">Larger Offset</Button>
        </PopoverTrigger>
        <PopoverContent sideOffset={10}>
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Larger Offset</h4>
            <p className="text-sm text-neutral-500">
              Uses a 10px side offset for more spacing.
            </p>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  ),
};

export const WithComplexContent: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Complex Popover</Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Notifications</h4>
            <p className="text-sm text-neutral-500">
              Configure your email notifications.
            </p>
          </div>
          <div className="grid gap-2">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="comments"
                className="h-4 w-4 rounded border-neutral-300"
              />
              <label
                htmlFor="comments"
                className="text-sm font-medium leading-none"
              >
                Comments
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="mentions"
                className="h-4 w-4 rounded border-neutral-300"
              />
              <label
                htmlFor="mentions"
                className="text-sm font-medium leading-none"
              >
                Mentions
              </label>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  ),
};