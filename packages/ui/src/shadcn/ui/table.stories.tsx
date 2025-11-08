import type { Meta, StoryObj } from "@storybook/react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "./table";

const meta: Meta<typeof Table> = {
  title: "Common/Components/UI/Table",
  component: Table,
  argTypes: {
    className: {
      control: "text",
      description: "Additional CSS classes for the table",
    },
  },
  decorators: [
    (Story) => (
      <div className="p-4 bg-white dark:bg-neutral-900">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Table>
      <TableCaption>A list of sample items</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Description</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>Item 1</TableCell>
          <TableCell>Description of item 1</TableCell>
          <TableCell className="text-right">$100</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Item 2</TableCell>
          <TableCell>Description of item 2</TableCell>
          <TableCell className="text-right">$200</TableCell>
        </TableRow>
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={2}>Total</TableCell>
          <TableCell className="text-right">$300</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  ),
};

export const LightMode: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Header 1</TableHead>
          <TableHead>Header 2</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>Light mode content</TableCell>
          <TableCell>More light mode content</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
  parameters: {
    backgrounds: { default: 'light' }
  }
};

export const DarkMode: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Header 1</TableHead>
          <TableHead>Header 2</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>Dark mode content</TableCell>
          <TableCell>More dark mode content</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
  parameters: {
    backgrounds: { default: 'dark' }
  }
};

export const SelectedRow: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>Unselected Item</TableCell>
          <TableCell>Active</TableCell>
        </TableRow>
        <TableRow data-state="selected">
          <TableCell>Selected Item</TableCell>
          <TableCell>Active</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
};

export const LongContent: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Long Name Header</TableHead>
          <TableHead>Description Header</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>A very long name that might wrap</TableCell>
          <TableCell>A very long description that could potentially extend beyond the normal table width</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
};