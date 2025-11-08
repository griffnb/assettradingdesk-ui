import type { Meta, StoryObj } from "@storybook/react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  CardAction
} from "./card";
import { Button } from "@/ui/shadcn/ui/button";

const meta: Meta<typeof Card> = {
  title: "Common/Components/UI/Card",
  component: Card,
  argTypes: {
    // Note: most props are passed through, so no specific argTypes needed
  },
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>This is a description of the card.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Some content goes here. This could be text, components, or any other React elements.</p>
      </CardContent>
      <CardFooter>
        <p>Card footer content</p>
      </CardFooter>
    </Card>
  ),
};

export const WithAction: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Project Details</CardTitle>
        <CardDescription>Overview of the current project status</CardDescription>
        <CardAction>
          <Button variant="outline" size="sm">Edit</Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <p>Project is currently in development phase.</p>
      </CardContent>
      <CardFooter>
        <p>Last updated: 2 days ago</p>
      </CardFooter>
    </Card>
  ),
};

export const LongContent: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Detailed Information</CardTitle>
        <CardDescription>A card with more extensive content</CardDescription>
      </CardHeader>
      <CardContent>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
          nisi ut aliquip ex ea commodo consequat.
        </p>
      </CardContent>
      <CardFooter>
        <Button>Learn More</Button>
      </CardFooter>
    </Card>
  ),
};

export const DarkMode: Story = {
  parameters: {
    backgrounds: {
      default: 'dark',
    },
  },
  render: () => (
    <div className="dark">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Dark Mode Card</CardTitle>
          <CardDescription>This is how the card looks in dark mode</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Dark mode provides a comfortable viewing experience in low-light environments.</p>
        </CardContent>
        <CardFooter>
          <Button variant="secondary">Dark Mode Action</Button>
        </CardFooter>
      </Card>
    </div>
  ),
};