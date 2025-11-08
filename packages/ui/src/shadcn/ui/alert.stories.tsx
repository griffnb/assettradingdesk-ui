import type { Meta, StoryObj } from "@storybook/react";
import { Alert, AlertDescription, AlertTitle } from "./alert";
import { InfoIcon, AlertTriangleIcon, XCircleIcon } from "lucide-react";

const meta: Meta<typeof Alert> = {
  title: "UI/Alert",
  component: Alert,
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["default", "destructive"],
    },
  },
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof Alert>;

export const Default: Story = {
  render: (args) => (
    <Alert {...args}>
      <InfoIcon className="size-4" />
      <AlertTitle>Information Alert</AlertTitle>
      <AlertDescription>
        This is a default informational alert with some additional context.
      </AlertDescription>
    </Alert>
  ),
  args: {
    variant: "default",
  },
};

export const Destructive: Story = {
  render: (args) => (
    <Alert {...args}>
      <XCircleIcon className="size-4" />
      <AlertTitle>Error Alert</AlertTitle>
      <AlertDescription>
        Something went wrong. Please check your input and try again.
      </AlertDescription>
    </Alert>
  ),
  args: {
    variant: "destructive",
  },
};

export const WithLongDescription: Story = {
  render: (args) => (
    <Alert {...args}>
      <AlertTriangleIcon className="size-4" />
      <AlertTitle>Warning Alert</AlertTitle>
      <AlertDescription>
        This is a longer description that demonstrates how the alert component
        handles multi-line text. It will show how the text wraps and maintains
        readability across multiple lines of content.
      </AlertDescription>
    </Alert>
  ),
  args: {
    variant: "default",
  },
};

export const NoIcon: Story = {
  render: (args) => (
    <Alert {...args}>
      <AlertTitle>Alert Without Icon</AlertTitle>
      <AlertDescription>
        This alert demonstrates the component when no icon is present.
      </AlertDescription>
    </Alert>
  ),
  args: {
    variant: "default",
  },
};