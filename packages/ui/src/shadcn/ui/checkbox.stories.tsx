import type { Meta, StoryObj } from '@storybook/react'
import { Checkbox } from './checkbox'

const meta: Meta<typeof Checkbox> = {
  title: 'UI/Checkbox',
  component: Checkbox,
  argTypes: {
    checked: {
      control: 'boolean',
      description: 'Controls the checked state of the checkbox'
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the checkbox interaction'
    }
  }
}

export default meta

type Story = StoryObj<typeof Checkbox>

export const Default: Story = {
  args: {
    checked: false,
    children: 'Default Checkbox'
  }
}

export const Checked: Story = {
  args: {
    checked: true,
    children: 'Checked Checkbox'
  }
}

export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Disabled Checkbox'
  }
}

export const DisabledChecked: Story = {
  args: {
    checked: true,
    disabled: true,
    children: 'Disabled Checked Checkbox'
  }
}

export const WithLabel: Story = {
  args: {
    children: 'Checkbox with Label'
  },
  render: (args) => (
    <div className="flex items-center space-x-2">
      <Checkbox {...args} id="terms" />
      <label
        htmlFor="terms"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {args.children}
      </label>
    </div>
  )
}