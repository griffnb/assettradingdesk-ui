import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue
} from './select';

const meta: Meta<typeof SelectTrigger> = {
  title: 'Components/Select',
  component: SelectTrigger,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'select', options: ['sm', 'default'] },
      description: 'Size of the select trigger',
      defaultValue: 'default'
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the select component'
    }
  }
};

export default meta;

type Story = StoryObj<typeof SelectTrigger>;

export const Default: Story = {
  render: (args) => (
    <Select>
      <SelectTrigger {...args}>
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Fruits</SelectLabel>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
          <SelectItem value="orange">Orange</SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectLabel>Vegetables</SelectLabel>
          <SelectItem value="carrot">Carrot</SelectItem>
          <SelectItem value="broccoli">Broccoli</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
};

export const SmallSize: Story = {
  render: (args) => (
    <Select>
      <SelectTrigger size="sm" {...args}>
        <SelectValue placeholder="Select a color" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Colors</SelectLabel>
          <SelectItem value="red">Red</SelectItem>
          <SelectItem value="blue">Blue</SelectItem>
          <SelectItem value="green">Green</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
};

export const Disabled: Story = {
  render: (args) => (
    <Select>
      <SelectTrigger disabled {...args}>
        <SelectValue placeholder="Select a country" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Countries</SelectLabel>
          <SelectItem value="usa">United States</SelectItem>
          <SelectItem value="canada">Canada</SelectItem>
          <SelectItem value="uk">United Kingdom</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
};

export const WithIcons: Story = {
  render: (args) => (
    <Select>
      <SelectTrigger {...args}>
        <SelectValue placeholder="Select a sport" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Sports</SelectLabel>
          <SelectItem value="soccer" className="flex items-center gap-2">
            <span>⚽</span>
            Soccer
          </SelectItem>
          <SelectItem value="basketball" className="flex items-center gap-2">
            <span>🏀</span>
            Basketball
          </SelectItem>
          <SelectItem value="tennis" className="flex items-center gap-2">
            <span>🎾</span>
            Tennis
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
};