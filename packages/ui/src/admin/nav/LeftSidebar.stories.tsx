import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  BotIcon,
  CheckSquareIcon,
  FileTextIcon,
  ListChecksIcon,
  MessageSquareIcon,
  SettingsIcon,
  ZapIcon,
} from "lucide-react";
import type { LeftSidebarTab } from "./LeftSidebar";
import { LeftSidebar } from "./LeftSidebar";

const meta = {
  component: LeftSidebar,
  title: "Admin/Nav/LeftSidebar",
  argTypes: {
    panelWidth: { control: "number" },
    defaultTab: { control: "text" },
  },
  decorators: [
    (Story) => (
      <div className="h-[600px] w-full">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof LeftSidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleTabs: LeftSidebarTab[] = [
  {
    key: "qualifications",
    label: "Qualifications",
    icon: <CheckSquareIcon />,
    content: (
      <div className="p-4 flex flex-col gap-3">
        <h3 className="text-sm font-semibold text-neutral-700">
          Qualification Checklist
        </h3>
        <div className="flex flex-col gap-2">
          {["Budget Confirmed", "Authority Identified", "Need Established", "Timeline Set"].map(
            (item) => (
              <label key={item} className="flex items-center gap-2 text-sm text-neutral-600">
                <input type="checkbox" className="rounded" />
                {item}
              </label>
            ),
          )}
        </div>
      </div>
    ),
  },
  {
    key: "actions",
    label: "Actions",
    icon: <ZapIcon />,
    content: (
      <div className="p-4 flex flex-col gap-3">
        <h3 className="text-sm font-semibold text-neutral-700">
          Quick Actions
        </h3>
        <div className="flex flex-col gap-2">
          {["Send Follow-up", "Schedule Meeting", "Create Proposal", "Log Activity"].map(
            (item) => (
              <button
                key={item}
                type="button"
                className="text-left text-sm text-neutral-600 hover:text-neutral-900 px-3 py-2 rounded hover:bg-white transition-colors"
              >
                {item}
              </button>
            ),
          )}
        </div>
      </div>
    ),
  },
  {
    key: "automation",
    label: "Automation",
    icon: <BotIcon />,
    content: (
      <div className="p-4 flex flex-col gap-3">
        <h3 className="text-sm font-semibold text-neutral-700">
          Automation Rules
        </h3>
        <p className="text-xs text-neutral-500">
          Configure automated workflows for this record.
        </p>
      </div>
    ),
  },
];

export const Default: Story = {
  args: {
    tabs: sampleTabs,
  },
};

export const WithDefaultOpen: Story = {
  args: {
    tabs: sampleTabs,
    defaultTab: "actions",
  },
};

export const CustomWidth: Story = {
  args: {
    tabs: sampleTabs,
    defaultTab: "qualifications",
    panelWidth: 400,
  },
};

export const ManyTabs: Story = {
  args: {
    tabs: [
      ...sampleTabs,
      {
        key: "notes",
        label: "Notes",
        icon: <FileTextIcon />,
        content: (
          <div className="p-4">
            <h3 className="text-sm font-semibold text-neutral-700">Notes</h3>
            <p className="text-xs text-neutral-500 mt-2">No notes yet.</p>
          </div>
        ),
      },
      {
        key: "tasks",
        label: "Tasks",
        icon: <ListChecksIcon />,
        content: (
          <div className="p-4">
            <h3 className="text-sm font-semibold text-neutral-700">Tasks</h3>
            <p className="text-xs text-neutral-500 mt-2">All tasks completed.</p>
          </div>
        ),
      },
      {
        key: "messages",
        label: "Messages",
        icon: <MessageSquareIcon />,
        content: (
          <div className="p-4">
            <h3 className="text-sm font-semibold text-neutral-700">Messages</h3>
            <p className="text-xs text-neutral-500 mt-2">No new messages.</p>
          </div>
        ),
      },
      {
        key: "settings",
        label: "Settings",
        icon: <SettingsIcon />,
        content: (
          <div className="p-4">
            <h3 className="text-sm font-semibold text-neutral-700">Settings</h3>
            <p className="text-xs text-neutral-500 mt-2">Panel configuration.</p>
          </div>
        ),
      },
    ],
    defaultTab: "qualifications",
  },
};

export const Collapsed: Story = {
  args: {
    tabs: sampleTabs,
  },
  parameters: {
    docs: {
      description: {
        story: "No tab selected - only the icon strip is visible. Click an icon to expand the panel.",
      },
    },
  },
};
