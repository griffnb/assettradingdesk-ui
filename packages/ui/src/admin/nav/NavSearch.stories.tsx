import type { Meta, StoryObj } from "@storybook/react-vite";
import { Building2, CircleDollarSign, Contact, FileText } from "lucide-react";
import type { NavSearchItem } from "./NavSearch";
import { NavSearch } from "./NavSearch";

const meta = {
  component: NavSearch,
  title: "Admin/Nav/NavSearch",
  argTypes: {
    placeholder: { control: "text" },
  },
  decorators: [
    (Story) => (
      <div className="bg-[hsl(200,17%,29%)] p-8 w-80">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof NavSearch>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleItems: NavSearchItem[] = [
  {
    label: "Acme Corporation",
    value: "acme-corp",
    group: "Accounts",
    icon: <Building2 className="size-4" />,
  },
  {
    label: "Globex Industries",
    value: "globex",
    group: "Accounts",
    icon: <Building2 className="size-4" />,
  },
  {
    label: "Stark Enterprises",
    value: "stark",
    group: "Accounts",
    icon: <Building2 className="size-4" />,
  },
  {
    label: "John Smith",
    value: "john-smith",
    group: "Contacts",
    icon: <Contact className="size-4" />,
  },
  {
    label: "Jane Doe",
    value: "jane-doe",
    group: "Contacts",
    icon: <Contact className="size-4" />,
  },
  {
    label: "Acme - Q4 Renewal",
    value: "acme-q4",
    group: "Opportunities",
    icon: <CircleDollarSign className="size-4" />,
  },
  {
    label: "Globex - New Business",
    value: "globex-new",
    group: "Opportunities",
    icon: <CircleDollarSign className="size-4" />,
  },
  {
    label: "NDA - Acme Corp",
    value: "nda-acme",
    group: "Documents",
    icon: <FileText className="size-4" />,
  },
];

export const Default: Story = {
  args: {
    placeholder: "Search",
    items: sampleItems,
  },
};

export const CustomPlaceholder: Story = {
  args: {
    placeholder: "Search accounts, contacts...",
    items: sampleItems,
  },
};

export const Empty: Story = {
  args: {
    placeholder: "Search",
    items: [],
    emptyMessage: "No results found. Try a different search.",
  },
};
