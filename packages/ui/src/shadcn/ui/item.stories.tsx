import type { Meta, StoryObj } from "@storybook/react";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemFooter,
  ItemGroup,
  ItemHeader,
  ItemMedia,
  ItemSeparator,
  ItemTitle
} from "./item";
import { Button } from "./button";
import { HelpCircleIcon, StarIcon } from "lucide-react";

const meta: Meta<typeof Item> = {
  title: "Common/Components/UI/Item",
  component: Item,
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "outline", "muted"],
      description: "Visual variant of the item",
    },
    size: {
      control: "select",
      options: ["default", "sm"],
      description: "Size of the item",
    },
    asChild: {
      control: "boolean",
      description: "Render as a child component (Radix UI Slot)",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Item {...args}>
      <ItemContent>
        <ItemTitle>Default Item</ItemTitle>
        <ItemDescription>This is a default item with standard styling.</ItemDescription>
      </ItemContent>
    </Item>
  ),
};

export const WithMedia: Story = {
  render: () => (
    <Item>
      <ItemMedia variant="icon">
        <StarIcon />
      </ItemMedia>
      <ItemContent>
        <ItemTitle>Item with Icon Media</ItemTitle>
        <ItemDescription>An item featuring an icon in the media section.</ItemDescription>
      </ItemContent>
    </Item>
  ),
};

export const FullItem: Story = {
  render: () => (
    <Item>
      <ItemHeader>
        <ItemTitle>Full Item Example</ItemTitle>
        <ItemActions>
          <Button variant="ghost" size="sm">
            <HelpCircleIcon className="mr-2 size-4" />
            Info
          </Button>
        </ItemActions>
      </ItemHeader>
      <ItemMedia variant="image">
        <img
          src="https://via.placeholder.com/150"
          alt="Placeholder"
        />
      </ItemMedia>
      <ItemContent>
        <ItemDescription>
          A comprehensive item with header, media, content, and actions.
          It demonstrates the versatility of the Item component.
        </ItemDescription>
      </ItemContent>
      <ItemFooter>
        <Button size="sm">View Details</Button>
      </ItemFooter>
    </Item>
  ),
};

export const ItemGroupExample: Story = {
  render: () => (
    <ItemGroup>
      <Item variant="default">
        <ItemContent>
          <ItemTitle>First Item</ItemTitle>
          <ItemDescription>First item in the group</ItemDescription>
        </ItemContent>
      </Item>
      <ItemSeparator />
      <Item variant="muted">
        <ItemContent>
          <ItemTitle>Second Item</ItemTitle>
          <ItemDescription>Second item in the group</ItemDescription>
        </ItemContent>
      </Item>
      <ItemSeparator />
      <Item variant="outline">
        <ItemContent>
          <ItemTitle>Third Item</ItemTitle>
          <ItemDescription>Third item in the group</ItemDescription>
        </ItemContent>
      </Item>
    </ItemGroup>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="space-y-4">
      <Item variant="default">
        <ItemContent>
          <ItemTitle>Default Variant</ItemTitle>
          <ItemDescription>Default styling with transparent background</ItemDescription>
        </ItemContent>
      </Item>
      <Item variant="outline">
        <ItemContent>
          <ItemTitle>Outline Variant</ItemTitle>
          <ItemDescription>Item with a border outline</ItemDescription>
        </ItemContent>
      </Item>
      <Item variant="muted">
        <ItemContent>
          <ItemTitle>Muted Variant</ItemTitle>
          <ItemDescription>Slightly subdued background</ItemDescription>
        </ItemContent>
      </Item>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-4">
      <Item size="default">
        <ItemContent>
          <ItemTitle>Default Size</ItemTitle>
          <ItemDescription>Standard padding and sizing</ItemDescription>
        </ItemContent>
      </Item>
      <Item size="sm">
        <ItemContent>
          <ItemTitle>Small Size</ItemTitle>
          <ItemDescription>Compact item with reduced padding</ItemDescription>
        </ItemContent>
      </Item>
    </div>
  ),
};