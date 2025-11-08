import type { Meta, StoryObj } from "@storybook/react";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut
} from "./command";
import { FileIcon, MessageSquareIcon, SettingsIcon } from "lucide-react";

const meta: Meta<typeof Command> = {
  title: "Common/Components/UI/Command",
  component: Command,
  argTypes: {
    className: {
      control: "text",
      description: "Additional CSS classes for the command component",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="w-[300px] border">
      <Command>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem>
              <FileIcon className="mr-2" />
              <span>New File</span>
              <CommandShortcut>⌘N</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <MessageSquareIcon className="mr-2" />
              <span>New Message</span>
              <CommandShortcut>⌘M</CommandShortcut>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Settings">
            <CommandItem>
              <SettingsIcon className="mr-2" />
              <span>Settings</span>
              <CommandShortcut>⌘,</CommandShortcut>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </div>
  ),
};

export const EmptyState: Story = {
  render: () => (
    <div className="w-[300px] border">
      <Command>
        <CommandInput placeholder="Search for something..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
        </CommandList>
      </Command>
    </div>
  ),
};

export const DialogMode: Story = {
  render: () => (
    <CommandDialog open={true} onOpenChange={() => {}}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Actions">
          <CommandItem>
            <FileIcon className="mr-2" />
            <span>Create New Project</span>
          </CommandItem>
          <CommandItem>
            <SettingsIcon className="mr-2" />
            <span>Open Settings</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  ),
};

export const DisabledItems: Story = {
  render: () => (
    <div className="w-[300px] border">
      <Command>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandGroup heading="Actions">
            <CommandItem>
              <FileIcon className="mr-2" />
              <span>New File</span>
              <CommandShortcut>⌘N</CommandShortcut>
            </CommandItem>
            <CommandItem disabled>
              <MessageSquareIcon className="mr-2" />
              <span>New Message (Disabled)</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </div>
  ),
};

export const MultipleGroups: Story = {
  render: () => (
    <div className="w-[300px] border">
      <Command>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandGroup heading="Files">
            <CommandItem>
              <FileIcon className="mr-2" />
              <span>New File</span>
            </CommandItem>
            <CommandItem>
              <FileIcon className="mr-2" />
              <span>Open File</span>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Settings">
            <CommandItem>
              <SettingsIcon className="mr-2" />
              <span>Preferences</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </div>
  ),
};