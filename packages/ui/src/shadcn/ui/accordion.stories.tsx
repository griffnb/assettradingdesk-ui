import type { Meta, StoryObj } from '@storybook/react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from './accordion';

const meta: Meta<typeof Accordion> = {
  title: 'UI/Shadcn/Accordion',
  component: Accordion,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['single', 'multiple'],
      description: 'Controls whether one or multiple accordion items can be open at a time'
    }
  }
};

export default meta;
type Story = StoryObj<typeof Accordion>;

export const Default: Story = {
  render: (args) => (
    <Accordion {...args}>
      <AccordionItem value="item-1">
        <AccordionTrigger>First Item</AccordionTrigger>
        <AccordionContent>
          Content for the first accordion item. This shows how the accordion works
          with a simple example of expandable content.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Second Item</AccordionTrigger>
        <AccordionContent>
          Another accordion item to demonstrate multiple items in an accordion.
          Each item can have its own unique content.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Third Item</AccordionTrigger>
        <AccordionContent>
          A third item to show how the accordion handles multiple sections.
          The chevron icon rotates to indicate the open state.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
};

export const SingleOpen: Story = {
  args: {
    type: 'single',
    collapsible: false
  },
  render: (args) => (
    <Accordion {...args}>
      <AccordionItem value="item-1">
        <AccordionTrigger>First Item</AccordionTrigger>
        <AccordionContent>
          Only one item can be open at a time with this configuration.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Second Item</AccordionTrigger>
        <AccordionContent>
          Opening this item will close the previously opened item.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
};

export const Collapsible: Story = {
  args: {
    type: 'single',
    collapsible: true
  },
  render: (args) => (
    <Accordion {...args}>
      <AccordionItem value="item-1">
        <AccordionTrigger>Collapsible Item</AccordionTrigger>
        <AccordionContent>
          This item can be collapsed by clicking on the open trigger again.
          Great for saving space and providing an interactive UI.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
};

export const MultipleOpen: Story = {
  args: {
    type: 'multiple'
  },
  render: (args) => (
    <Accordion {...args}>
      <AccordionItem value="item-1">
        <AccordionTrigger>First Item</AccordionTrigger>
        <AccordionContent>
          Multiple items can be open simultaneously in this mode.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Second Item</AccordionTrigger>
        <AccordionContent>
          Another item that can be open alongside other items.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Third Item</AccordionTrigger>
        <AccordionContent>
          A third item that can also be open at the same time.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
};