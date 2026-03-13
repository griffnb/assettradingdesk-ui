import {
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/ui/shadcn/ui/dropdown-menu";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Building2Icon,
  CircleDollarSignIcon,
  ContactIcon,
  FileTextIcon,
  LogOutIcon,
  SettingsIcon,
  SquareCheckIcon,
  UserIcon,
  ZapIcon,
} from "lucide-react";
import {
  AdminBreadcrumbBar,
  AdminNavBar,
  LeftSidebar,
  NavLink,
  NavSearch,
  NavUserMenu,
} from "../nav";
import type { LeftSidebarTab, NavSearchItem } from "../nav";

/**
 * Storybook-friendly version of the AdminLayout that doesn't
 * depend on react-router, MobX, or app-specific services.
 */
function AdminLayoutPreview(props: {
  showLeftSidebar?: boolean;
  showBreadcrumbs?: boolean;
  children?: React.ReactNode;
}) {
  const { showLeftSidebar = true, showBreadcrumbs = true, children } = props;

  return (
    <div className="flex h-dvh flex-col overflow-hidden">
      {/* Sticky Top Nav */}
      <div className="sticky top-0 z-[var(--z-nav-bar)] shrink-0">
        <AdminNavBar
          logo={<LogoPreview />}
          trailing={
            <>
              <NavSearch className="flex-1" placeholder="Search..." items={searchItems} />
              <NavUserMenu initials="NG">
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
              </NavUserMenu>
            </>
          }
        >
          <NavLink label="Home" active />
          <NavLink label="Pipelines" />
          <NavLink
            label="Companies"
            dropdownContent={
              <>
                <DropdownMenuItem>Companies</DropdownMenuItem>
                <DropdownMenuItem>Facilities</DropdownMenuItem>
                <DropdownMenuItem>Clients</DropdownMenuItem>
              </>
            }
          />
          <NavLink label="Assets" />
          <NavLink label="Requests" />
          <NavLink
            label="Models"
            dropdownContent={
              <>
                <DropdownMenuItem>Categories</DropdownMenuItem>
                <DropdownMenuItem>Manufacturers</DropdownMenuItem>
                <DropdownMenuItem>Models</DropdownMenuItem>
              </>
            }
          />
          <NavLink
            label="Organizations"
            dropdownContent={
              <>
                <DropdownMenuItem>Organizations</DropdownMenuItem>
                <DropdownMenuItem>Accounts</DropdownMenuItem>
                <DropdownMenuItem>Test Accounts</DropdownMenuItem>
              </>
            }
          />
          <NavLink
            label="System"
            dropdownContent={
              <>
                <DropdownMenuItem>Billing Plans</DropdownMenuItem>
                <DropdownMenuItem>Validate Fields</DropdownMenuItem>
                <DropdownMenuItem>Sync Objects</DropdownMenuItem>
              </>
            }
          />
        </AdminNavBar>

        {showBreadcrumbs && (
          <AdminBreadcrumbBar
            segments={[
              { label: "Home", href: "/" },
              { label: "Pipelines", href: "/pipelines" },
              { label: "Acme Corp Deal" },
            ]}
          />
        )}
      </div>

      {/* Body: Left Sidebar + Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {showLeftSidebar && (
          <LeftSidebar tabs={leftSidebarTabs} className="shrink-0" />
        )}

        <main className="relative flex flex-1 flex-col overflow-auto min-w-0">
          {children}
        </main>
      </div>
    </div>
  );
}

// --- Shared data ---

const LogoPreview = () => (
  <div className="flex items-center gap-1">
    <div className="size-10 rounded bg-white/10 flex items-center justify-center">
      <svg viewBox="0 0 48 48" className="size-8 text-white">
        <path
          d="M24 4L4 44h40L24 4zm0 8l14 28H10l14-28z"
          fill="currentColor"
          opacity="0.8"
        />
      </svg>
    </div>
    <span className="text-lg text-[hsl(var(--admin-nav-logo-text))]">
      <span className="font-semibold">A</span>
      <span className="font-medium">T</span>
      <span className="font-normal">D</span>
    </span>
  </div>
);

const searchItems: NavSearchItem[] = [
  { label: "Acme Corporation", value: "acme", group: "Accounts", icon: <Building2Icon className="size-4" /> },
  { label: "Globex Industries", value: "globex", group: "Accounts", icon: <Building2Icon className="size-4" /> },
  { label: "John Smith", value: "john", group: "Contacts", icon: <ContactIcon className="size-4" /> },
  { label: "Acme - Q4 Renewal", value: "acme-q4", group: "Opportunities", icon: <CircleDollarSignIcon className="size-4" /> },
  { label: "NDA - Acme Corp", value: "nda", group: "Documents", icon: <FileTextIcon className="size-4" /> },
];

const leftSidebarTabs: LeftSidebarTab[] = [
  {
    key: "actions",
    label: "Actions",
    icon: <ZapIcon />,
    content: (
      <div className="p-4 flex flex-col gap-3">
        <h3 className="text-sm font-semibold text-neutral-700">Quick Actions</h3>
        <div className="flex flex-col gap-1">
          {["Send Follow-up", "Schedule Meeting", "Create Proposal", "Log Activity"].map((action) => (
            <button
              key={action}
              type="button"
              className="text-left text-sm text-neutral-600 hover:text-neutral-900 px-3 py-2 rounded hover:bg-white transition-colors"
            >
              {action}
            </button>
          ))}
        </div>
      </div>
    ),
  },
  {
    key: "qualifications",
    label: "Qualifications",
    icon: <SquareCheckIcon />,
    content: (
      <div className="p-4 flex flex-col gap-3">
        <h3 className="text-sm font-semibold text-neutral-700">Qualification Checklist</h3>
        <div className="flex flex-col gap-2">
          {["Budget Confirmed", "Authority Identified", "Need Established", "Timeline Set"].map((item) => (
            <label key={item} className="flex items-center gap-2 text-sm text-neutral-600">
              <input type="checkbox" className="rounded" />
              {item}
            </label>
          ))}
        </div>
      </div>
    ),
  },
];

// --- Storybook ---

const meta = {
  component: AdminLayoutPreview,
  title: "Admin/Layout/AdminLayout",
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof AdminLayoutPreview>;

export default meta;
type Story = StoryObj<typeof meta>;

const SampleContent = () => (
  <div className="p-6 space-y-4">
    <h1 className="text-2xl font-bold text-neutral-900">Pipeline Overview</h1>
    <p className="text-neutral-600">
      This is the main content area. The top nav is sticky, the left sidebar
      expands when you click an icon, and the content scrolls independently.
    </p>
    <div className="grid grid-cols-3 gap-4">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="rounded-lg border border-neutral-200 bg-white p-4 shadow-sm"
        >
          <h3 className="text-sm font-semibold text-neutral-700">
            Card {index + 1}
          </h3>
          <p className="mt-1 text-xs text-neutral-500">
            Sample card content to show layout behavior.
          </p>
        </div>
      ))}
    </div>
    {/* Extra content to show scrolling */}
    <div className="space-y-4 pt-8">
      {Array.from({ length: 10 }).map((_, index) => (
        <div key={index} className="rounded border border-neutral-200 bg-white p-4">
          <p className="text-sm text-neutral-600">
            Row {index + 1} — scroll down to verify the top nav stays sticky
            and the left sidebar stays full height.
          </p>
        </div>
      ))}
    </div>
  </div>
);

export const Default: Story = {
  args: {},
  render: () => (
    <AdminLayoutPreview>
      <SampleContent />
    </AdminLayoutPreview>
  ),
};

export const WithSidebarOpen: Story = {
  args: {},
  render: () => (
    <AdminLayoutPreview>
      <SampleContent />
    </AdminLayoutPreview>
  ),
  parameters: {
    docs: {
      description: {
        story: "Click the Zap or CheckSquare icon in the left sidebar to expand the panel.",
      },
    },
  },
};

export const NoLeftSidebar: Story = {
  args: {},
  render: () => (
    <AdminLayoutPreview showLeftSidebar={false}>
      <SampleContent />
    </AdminLayoutPreview>
  ),
};

export const NoBreadcrumbs: Story = {
  args: {},
  render: () => (
    <AdminLayoutPreview showBreadcrumbs={false}>
      <SampleContent />
    </AdminLayoutPreview>
  ),
};

export const EmptyContent: Story = {
  args: {},
  render: () => (
    <AdminLayoutPreview>
      <div className="flex flex-1 items-center justify-center text-neutral-400">
        No content to display
      </div>
    </AdminLayoutPreview>
  ),
};
