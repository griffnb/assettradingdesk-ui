import type { Meta, StoryObj } from '@storybook/react'
import { RadioGroup, RadioGroupItem } from './radio-group'
import { Label } from './label'
import { cn } from '../utils'

const meta: Meta<typeof RadioGroup> = {
  title: 'Components/RadioGroup',
  component: RadioGroup,
  argTypes: {
    disabled: {
      control: 'boolean',
      description: 'Disable the entire radio group'
    }
  },
  parameters: {
    layout: 'centered'
  }
}

export default meta

type Story = StoryObj<typeof RadioGroup>

export const Default: Story = {
  render: (args) => (
    <RadioGroup {...args} defaultValue="comfortable">
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="default" id="r1" />
        <Label htmlFor="r1">Default</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="comfortable" id="r2" />
        <Label htmlFor="r2">Comfortable</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="compact" id="r3" />
        <Label htmlFor="r3">Compact</Label>
      </div>
    </RadioGroup>
  )
}

export const Disabled: Story = {
  render: (args) => (
    <RadioGroup {...args} defaultValue="comfortable" disabled>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="default" id="r1-disabled" />
        <Label htmlFor="r1-disabled">Default</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="comfortable" id="r2-disabled" />
        <Label htmlFor="r2-disabled">Comfortable</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="compact" id="r3-disabled" />
        <Label htmlFor="r3-disabled">Compact</Label>
      </div>
    </RadioGroup>
  )
}

export const WithCustomStyling: Story = {
  render: (args) => (
    <RadioGroup {...args} defaultValue="comfortable" className="space-y-3">
      <div className="flex items-center space-x-2">
        <RadioGroupItem
          value="default"
          id="r1-custom"
          className={cn(
            "peer h-6 w-6 border-2 border-primary",
            "data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
          )}
        />
        <Label
          htmlFor="r1-custom"
          className="text-lg font-semibold text-gray-700 peer-data-[state=checked]:text-primary"
        >
          Default
        </Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem
          value="comfortable"
          id="r2-custom"
          className={cn(
            "peer h-6 w-6 border-2 border-primary",
            "data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
          )}
        />
        <Label
          htmlFor="r2-custom"
          className="text-lg font-semibold text-gray-700 peer-data-[state=checked]:text-primary"
        >
          Comfortable
        </Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem
          value="compact"
          id="r3-custom"
          className={cn(
            "peer h-6 w-6 border-2 border-primary",
            "data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
          )}
        />
        <Label
          htmlFor="r3-custom"
          className="text-lg font-semibold text-gray-700 peer-data-[state=checked]:text-primary"
        >
          Compact
        </Label>
      </div>
    </RadioGroup>
  )
}