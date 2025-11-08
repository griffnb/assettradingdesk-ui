import type { Meta, StoryObj } from "@storybook/react";
import { AspectRatio } from "./aspect-ratio";

const meta: Meta<typeof AspectRatio> = {
  title: "Common/Components/UI/AspectRatio",
  component: AspectRatio,
  argTypes: {
    ratio: {
      control: { type: "number" },
      description: "The aspect ratio of the container (width / height)",
      defaultValue: 16 / 9,
    },
  },
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="w-[450px]">
      <AspectRatio ratio={args.ratio}>
        <img
          src="https://images.unsplash.com/photo-1535025183041-0991a958e6b7"
          alt="A person sitting on a chair"
          className="rounded-md object-cover w-full h-full"
        />
      </AspectRatio>
    </div>
  ),
  args: {
    ratio: 16 / 9,
  },
};

export const SquareAspect: Story = {
  render: (args) => (
    <div className="w-[450px]">
      <AspectRatio ratio={args.ratio}>
        <img
          src="https://images.unsplash.com/photo-1444491741275-3747c833fc24"
          alt="A scenic landscape"
          className="rounded-md object-cover w-full h-full"
        />
      </AspectRatio>
    </div>
  ),
  args: {
    ratio: 1,
  },
};

export const WideAspect: Story = {
  render: (args) => (
    <div className="w-[450px]">
      <AspectRatio ratio={args.ratio}>
        <img
          src="https://images.unsplash.com/photo-1526304640581-d334cdbbf45e"
          alt="A wide landscape"
          className="rounded-md object-cover w-full h-full"
        />
      </AspectRatio>
    </div>
  ),
  args: {
    ratio: 21 / 9,
  },
};

export const TallAspect: Story = {
  render: (args) => (
    <div className="w-[450px]">
      <AspectRatio ratio={args.ratio}>
        <img
          src="https://images.unsplash.com/photo-1609916848962-e33f36115c10"
          alt="A portrait orientation image"
          className="rounded-md object-cover w-full h-full"
        />
      </AspectRatio>
    </div>
  ),
  args: {
    ratio: 9 / 16,
  },
};