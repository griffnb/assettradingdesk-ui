import type { Meta, StoryObj } from "@storybook/react";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle
} from "./empty";

import {
  FileIcon,
  MessageCircleIcon,
  SearchIcon
} from "lucide-react";

const meta: Meta = {
  title: "Common/Components/UI/Empty",
  component: Empty,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <Empty>
      <EmptyContent>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <FileIcon />
          </EmptyMedia>
          <EmptyTitle>No Items</EmptyTitle>
          <EmptyDescription>
            There are currently no items to display.
          </EmptyDescription>
        </EmptyHeader>
      </EmptyContent>
    </Empty>
  ),
};

export const WithSearch: Story = {
  render: () => (
    <Empty>
      <EmptyContent>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <SearchIcon />
          </EmptyMedia>
          <EmptyTitle>No Results Found</EmptyTitle>
          <EmptyDescription>
            Your search did not match any items. Try different keywords.
          </EmptyDescription>
        </EmptyHeader>
      </EmptyContent>
    </Empty>
  ),
};

export const WithMessage: Story = {
  render: () => (
    <Empty>
      <EmptyContent>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <MessageCircleIcon />
          </EmptyMedia>
          <EmptyTitle>No Messages</EmptyTitle>
          <EmptyDescription>
            You have no messages at the moment.
          </EmptyDescription>
        </EmptyHeader>
      </EmptyContent>
    </Empty>
  ),
};

export const CustomStyle: Story = {
  render: () => (
    <Empty className="bg-gray-50 border-2">
      <EmptyContent>
        <EmptyHeader>
          <EmptyMedia variant="default">
            Custom styled empty state
          </EmptyMedia>
          <EmptyTitle>Custom Empty</EmptyTitle>
          <EmptyDescription>
            This empty state has a custom background and border.
          </EmptyDescription>
        </EmptyHeader>
      </EmptyContent>
    </Empty>
  ),
};