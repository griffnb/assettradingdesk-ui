import type { Meta, StoryObj } from '@storybook/react'
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from './collapsible'
import { Button } from './button'
import React from 'react'

const meta: Meta<typeof Collapsible> = {
  title: 'Components/Collapsible',
  component: Collapsible,
  argTypes: {
    // Add any custom argTypes if needed
  },
  parameters: {
    layout: 'centered',
  },
}

export default meta

type Story = StoryObj<typeof Collapsible>

export const Default: Story = {
  render: (args) => (
    <Collapsible {...args}>
      <CollapsibleTrigger asChild>
        <Button variant="outline">Toggle Content</Button>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="p-4 border rounded mt-2">
          This is the collapsible content that will be shown or hidden.
        </div>
      </CollapsibleContent>
    </Collapsible>
  ),
}

export const InitiallyOpen: Story = {
  render: (args) => (
    <Collapsible defaultOpen {...args}>
      <CollapsibleTrigger asChild>
        <Button variant="outline">Toggle Content</Button>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="p-4 border rounded mt-2">
          This content is initially visible.
        </div>
      </CollapsibleContent>
    </Collapsible>
  ),
}

export const WithMultipleContent: Story = {
  render: (args) => (
    <Collapsible {...args}>
      <CollapsibleTrigger asChild>
        <Button variant="outline">Toggle Multiple Contents</Button>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="p-4 border rounded mt-2 mb-2">
          First collapsible content section
        </div>
        <div className="p-4 border rounded">
          Second collapsible content section
        </div>
      </CollapsibleContent>
    </Collapsible>
  ),
}

export const NestedCollapsibles: Story = {
  render: (args) => (
    <Collapsible {...args}>
      <CollapsibleTrigger asChild>
        <Button variant="outline">Outer Collapsible</Button>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="p-4 border rounded mt-2">
          Outer content
          <Collapsible className="mt-4">
            <CollapsibleTrigger asChild>
              <Button variant="outline" size="sm">Inner Collapsible</Button>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="p-2 border rounded mt-2">
                Inner content
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </CollapsibleContent>
    </Collapsible>
  ),
}