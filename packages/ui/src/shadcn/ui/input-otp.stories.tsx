import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from './input-otp';

const meta: Meta<typeof InputOTP> = {
  title: 'Shadcn/Input OTP',
  component: InputOTP,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    disabled: { control: 'boolean' },
    maxLength: { control: 'number', defaultValue: 6 },
    'aria-invalid': { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<{
  maxLength?: number;
  disabled?: boolean;
  'aria-invalid'?: boolean;
}>;

const OTPStory: React.FC<{
  maxLength?: number;
  disabled?: boolean;
  'aria-invalid'?: boolean;
}> = ({
  maxLength = 6,
  disabled = false,
  'aria-invalid': ariaInvalid = false
}) => {
  const [value, setValue] = useState('');

  const handleChange = (text: string) => {
    setValue(text);
  };

  return (
    <InputOTP
      maxLength={maxLength}
      value={value}
      onChange={handleChange}
      disabled={disabled}
      aria-invalid={ariaInvalid}
    >
      <InputOTPGroup>
        {[...Array(maxLength)].map((_, index) => (
          <InputOTPSlot key={index} index={index} />
        ))}
      </InputOTPGroup>
    </InputOTP>
  );
};

export const Default: Story = {
  args: {
    maxLength: 6,
  },
  render: (args) => <OTPStory {...args} />,
};

export const WithSeparator: Story = {
  render: () => {
    const [value, setValue] = useState('');

    const handleChange = (text: string) => {
      setValue(text);
    };

    return (
      <InputOTP
        maxLength={6}
        value={value}
        onChange={handleChange}
      >
        <InputOTPGroup>
          {[...Array(3)].map((_, index) => (
            <InputOTPSlot key={index} index={index} />
          ))}
          <InputOTPSeparator />
          {[...Array(3)].map((_, index) => (
            <InputOTPSlot key={index + 3} index={index + 3} />
          ))}
        </InputOTPGroup>
      </InputOTP>
    );
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  render: (args) => <OTPStory {...args} />,
};

export const Error: Story = {
  args: {
    'aria-invalid': true,
  },
  render: (args) => <OTPStory {...args} />,
};

export const CustomLength: Story = {
  args: {
    maxLength: 4,
  },
  render: (args) => <OTPStory {...args} />,
};