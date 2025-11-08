import { Meta, StoryObj } from "@storybook/react";
import { CloudIcon, CopyIcon, EditIcon, TrashIcon } from "lucide-react";
import React from "react";
import { Button } from "./button";
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "./context-menu";

const meta: Meta = {
  title: "Components/Context Menu",
  component: ContextMenu,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof ContextMenu>;

export const DefaultContextMenu: Story = {
  render: (args) => (
    <ContextMenu {...args}>
      <ContextMenuTrigger asChild>
        <Button variant="outline">Right Click Me</Button>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem>
          <CopyIcon className="mr-2" />
          Copy
        </ContextMenuItem>
        <ContextMenuItem>Paste</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem variant="destructive">
          <TrashIcon className="mr-2" />
          Delete
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  ),
};

export const WithSubMenu: Story = {
  render: (args) => (
    <ContextMenu {...args}>
      <ContextMenuTrigger asChild>
        <Button variant="outline">Open Context Menu</Button>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem>
          <CopyIcon className="mr-2" />
          Copy
        </ContextMenuItem>
        <ContextMenuItem>Paste</ContextMenuItem>
        <ContextMenuSub>
          <ContextMenuSubTrigger>
            <CloudIcon className="mr-2" />
            Cloud
          </ContextMenuSubTrigger>
          <ContextMenuSubContent>
            <ContextMenuItem>Upload</ContextMenuItem>
            <ContextMenuItem>Download</ContextMenuItem>
            <ContextMenuItem>Sync</ContextMenuItem>
          </ContextMenuSubContent>
        </ContextMenuSub>
        <ContextMenuSeparator />
        <ContextMenuItem variant="destructive">
          <TrashIcon className="mr-2" />
          Delete
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  ),
};

export const WithCheckboxItems: Story = {
  render: (args) => {
    const [showLineNumbers, setShowLineNumbers] = React.useState(false);
    const [wordWrap, setWordWrap] = React.useState(true);

    return (
      <ContextMenu {...args}>
        <ContextMenuTrigger asChild>
          <Button variant="outline">Editor Settings</Button>
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuLabel>View</ContextMenuLabel>
          <ContextMenuCheckboxItem
            checked={showLineNumbers}
            onCheckedChange={setShowLineNumbers}
          >
            Show Line Numbers
          </ContextMenuCheckboxItem>
          <ContextMenuCheckboxItem
            checked={wordWrap}
            onCheckedChange={setWordWrap}
          >
            Word Wrap
          </ContextMenuCheckboxItem>
        </ContextMenuContent>
      </ContextMenu>
    );
  },
};

export const WithRadioItems: Story = {
  render: (args) => {
    const [theme, setTheme] = React.useState("system");

    return (
      <ContextMenu {...args}>
        <ContextMenuTrigger asChild>
          <Button variant="outline">Theme Settings</Button>
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuLabel>Theme</ContextMenuLabel>
          <ContextMenuRadioGroup value={theme} onValueChange={setTheme}>
            <ContextMenuRadioItem value="light">Light</ContextMenuRadioItem>
            <ContextMenuRadioItem value="dark">Dark</ContextMenuRadioItem>
            <ContextMenuRadioItem value="system">System</ContextMenuRadioItem>
          </ContextMenuRadioGroup>
        </ContextMenuContent>
      </ContextMenu>
    );
  },
};

export const DisabledItems: Story = {
  render: (args) => (
    <ContextMenu {...args}>
      <ContextMenuTrigger asChild>
        <Button variant="outline">Open Context Menu</Button>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem disabled>
          <EditIcon className="mr-2" />
          Edit
        </ContextMenuItem>
        <ContextMenuItem>
          <CopyIcon className="mr-2" />
          Copy
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem variant="destructive">
          <TrashIcon className="mr-2" />
          Delete
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  ),
};
