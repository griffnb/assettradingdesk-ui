import {
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/ui/shadcn/ui/dropdown-menu";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { LogOutIcon, SettingsIcon, UserIcon } from "lucide-react";
import { NavUserMenu } from "./NavUserMenu";

const meta = {
  component: NavUserMenu,
  title: "Admin/Nav/NavUserMenu",
  argTypes: {
    initials: { control: "text" },
    avatarUrl: { control: "text" },
  },
  decorators: [
    (Story) => (
      <div className="bg-[hsl(200,17%,29%)] p-8 flex justify-end">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof NavUserMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    initials: "NG",
    children: (
      <>
        <DropdownMenuLabel>Nick Griffin</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <UserIcon className="size-4" />
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem>
          <SettingsIcon className="size-4" />
          Settings
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogOutIcon className="size-4" />
          Sign Out
        </DropdownMenuItem>
      </>
    ),
  },
};

export const DifferentInitials: Story = {
  args: {
    initials: "JD",
    children: (
      <>
        <DropdownMenuLabel>John Doe</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <UserIcon className="size-4" />
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem>
          <SettingsIcon className="size-4" />
          Settings
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogOutIcon className="size-4" />
          Sign Out
        </DropdownMenuItem>
      </>
    ),
  },
};
