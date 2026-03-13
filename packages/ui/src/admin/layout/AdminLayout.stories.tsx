import { ServerService } from "@/common_lib/services/ServerService";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { MemoryRouter } from "react-router";
import { AdminLayout } from "./AdminLayout";

ServerService.addMock({
  method: "GET",
  path: "/api/session/admin",
  response: { success: true, data: { name: "Nick Griffin", role: 10 } },
});

const meta = {
  component: AdminLayout,
  title: "Admin/Layout/AdminLayout",
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={["/"]}>
        <Story />
      </MemoryRouter>
    ),
  ],
} satisfies Meta<typeof AdminLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

const SampleContent = () => (
  <div className="p-6 space-y-4">
    <h1 className="text-2xl font-bold text-neutral-900">Pipeline Overview</h1>
    <p className="text-neutral-600">
      This is the main content area. The left sidebar expands when you click an
      icon, and the content scrolls independently.
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
    <div className="space-y-4 pt-8">
      {Array.from({ length: 10 }).map((_, index) => (
        <div
          key={index}
          className="rounded border border-neutral-200 bg-white p-4"
        >
          <p className="text-sm text-neutral-600">
            Row {index + 1} — scroll down to verify the nav stays at the top and
            the left sidebar stays full height.
          </p>
        </div>
      ))}
    </div>
  </div>
);

export const Default: Story = {
  args: {
    children: <SampleContent />,
  },
};

export const WithBreadcrumbs: Story = {
  args: {
    children: <SampleContent />,
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Pipelines", href: "/pipelines" },
      { label: "Acme Corp Deal" },
    ],
  },
};

export const NoLeftSidebar: Story = {
  args: {
    children: <SampleContent />,
    showLeftSidebar: false,
  },
};

export const EmptyContent: Story = {
  args: {
    children: (
      <div className="flex flex-1 items-center justify-center text-neutral-400">
        No content to display
      </div>
    ),
  },
};
