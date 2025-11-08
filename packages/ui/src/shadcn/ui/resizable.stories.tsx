import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from './resizable';

const meta: Meta<typeof ResizablePanelGroup> = {
  title: 'UI/Resizable',
  component: ResizablePanelGroup,
  tags: ['autodocs'],
  argTypes: {
    direction: {
      control: { type: 'radio' },
      options: ['horizontal', 'vertical'],
      description: 'Direction of the resizable panel group',
    },
  },
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof ResizablePanelGroup>;

export const Horizontal: Story = {
  args: {
    direction: 'horizontal',
  },
  render: (args) => (
    <div className="h-[500px] w-full p-4">
      <ResizablePanelGroup {...args}>
        <ResizablePanel defaultSize={50} minSize={30} className="bg-blue-100 p-4">
          Left Panel
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={50} minSize={30} className="bg-green-100 p-4">
          Right Panel
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  ),
};

export const Vertical: Story = {
  args: {
    direction: 'vertical',
  },
  render: (args) => (
    <div className="h-[500px] w-full p-4">
      <ResizablePanelGroup {...args}>
        <ResizablePanel defaultSize={50} minSize={30} className="bg-red-100 p-4">
          Top Panel
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={50} minSize={30} className="bg-purple-100 p-4">
          Bottom Panel
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  ),
};

export const ThreePanels: Story = {
  args: {
    direction: 'horizontal',
  },
  render: (args) => (
    <div className="h-[500px] w-full p-4">
      <ResizablePanelGroup {...args}>
        <ResizablePanel defaultSize={25} minSize={20} className="bg-blue-100 p-4">
          Left Panel
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={50} minSize={30} className="bg-green-100 p-4">
          Center Panel
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={25} minSize={20} className="bg-orange-100 p-4">
          Right Panel
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  ),
};

export const WithoutHandles: Story = {
  args: {
    direction: 'horizontal',
  },
  render: (args) => (
    <div className="h-[500px] w-full p-4">
      <ResizablePanelGroup {...args}>
        <ResizablePanel defaultSize={50} minSize={30} className="bg-blue-100 p-4">
          Left Panel
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={50} minSize={30} className="bg-green-100 p-4">
          Right Panel
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  ),
};