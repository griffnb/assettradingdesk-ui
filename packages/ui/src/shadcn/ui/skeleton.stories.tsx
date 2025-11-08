import type { Meta, StoryObj } from "@storybook/react";
import { Skeleton } from "./skeleton";

const meta: Meta<typeof Skeleton> = {
  title: "UI/Skeleton",
  component: Skeleton,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    className: {
      control: 'text',
      description: 'Additional CSS classes to apply to the skeleton'
    }
  }
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

export const Default: Story = {
  args: {
    className: "w-[200px] h-[100px]",
  },
  render: (args) => <Skeleton {...args} />,
};

export const CustomSize: Story = {
  args: {
    className: "w-[300px] h-[150px] bg-blue-100",
  },
  render: (args) => <Skeleton {...args} />,
};

export const SmallSkeleton: Story = {
  args: {
    className: "w-[100px] h-[50px]",
  },
  render: (args) => <Skeleton {...args} />,
};

export const SkeletonList: Story = {
  render: () => (
    <div className="space-y-3">
      <Skeleton className="w-full h-[50px]" />
      <Skeleton className="w-full h-[50px]" />
      <Skeleton className="w-full h-[50px]" />
    </div>
  ),
};

export const SkeletonWithText: Story = {
  render: () => (
    <div className="flex items-center space-x-4">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  ),
};