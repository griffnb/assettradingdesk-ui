import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "./button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./collapsible";

const meta: Meta<typeof Collapsible> = {
  title: "Components/Collapsible",
  component: Collapsible,
  argTypes: {
    // Add any custom argTypes if needed
  },
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof Collapsible>;

export const Default: Story = {
  render: (args) => (
    <Collapsible {...args}>
      <CollapsibleTrigger asChild>
        <Button variant="outline">Toggle Content</Button>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="mt-2 rounded border p-4">
          This is the collapsible content that will be shown or hidden.
        </div>
      </CollapsibleContent>
    </Collapsible>
  ),
};

export const InitiallyOpen: Story = {
  render: (args) => (
    <Collapsible defaultOpen {...args}>
      <CollapsibleTrigger asChild>
        <Button variant="outline">Toggle Content</Button>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="mt-2 rounded border p-4">
          This content is initially visible.
        </div>
      </CollapsibleContent>
    </Collapsible>
  ),
};

export const WithMultipleContent: Story = {
  render: (args) => (
    <Collapsible {...args}>
      <CollapsibleTrigger asChild>
        <Button variant="outline">Toggle Multiple Contents</Button>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="mb-2 mt-2 rounded border p-4">
          First collapsible content section
        </div>
        <div className="rounded border p-4">
          Second collapsible content section
        </div>
      </CollapsibleContent>
    </Collapsible>
  ),
};

export const NestedCollapsibles: Story = {
  render: (args) => (
    <Collapsible {...args}>
      <CollapsibleTrigger asChild>
        <Button variant="outline">Outer Collapsible</Button>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="mt-2 rounded border p-4">
          Outer content
          <Collapsible className="mt-4">
            <CollapsibleTrigger asChild>
              <Button variant="outline" size="sm">
                Inner Collapsible
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="mt-2 rounded border p-2">Inner content</div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </CollapsibleContent>
    </Collapsible>
  ),
};
