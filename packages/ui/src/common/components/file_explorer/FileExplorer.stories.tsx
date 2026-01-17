import {
  Sidebar,
  SidebarContent,
  SidebarProvider,
} from "@/ui/shadcn/ui/sidebar";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { FileCode, FileJson, FileText, FolderOpen } from "lucide-react";
import React from "react";
import { FileExplorer, FileNode } from "./FileExplorer";

const meta = {
  title: "Common/FileExplorer",
  component: FileExplorer,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [
    (Story: React.ComponentType) => (
      <SidebarProvider>
        <Sidebar className="w-[300px]">
          <SidebarContent>
            <Story />
          </SidebarContent>
        </Sidebar>
      </SidebarProvider>
    ),
  ],
} satisfies Meta<typeof FileExplorer>;

export default meta;
type Story = StoryObj<typeof meta>;

// Sample data mimicking a typical project structure
const sampleFileTree: FileNode[] = [
  {
    id: "1",
    label: "src",
    type: "folder",
    defaultExpanded: true,
    children: [
      {
        id: "1-1",
        label: "components",
        type: "folder",
        children: [
          {
            id: "1-1-1",
            label: "Button.tsx",
            type: "file",
            icon: <FileCode className="size-4 text-blue-500" />,
          },
          {
            id: "1-1-2",
            label: "Input.tsx",
            type: "file",
            icon: <FileCode className="size-4 text-blue-500" />,
          },
          {
            id: "1-1-3",
            label: "Form.tsx",
            type: "file",
            icon: <FileCode className="size-4 text-blue-500" />,
          },
          {
            id: "1-1-4",
            label: "Button.test.tsx",
            type: "file",
            icon: <FileCode className="size-4 text-green-500" />,
          },
        ],
      },
      {
        id: "1-2",
        label: "utils",
        type: "folder",
        children: [
          {
            id: "1-2-1",
            label: "helpers.ts",
            type: "file",
            icon: <FileCode className="size-4 text-amber-500" />,
          },
          {
            id: "1-2-2",
            label: "constants.ts",
            type: "file",
            icon: <FileCode className="size-4 text-amber-500" />,
          },
          {
            id: "1-2-3",
            label: "helpers.test.ts",
            type: "file",
            icon: <FileCode className="size-4 text-green-500" />,
          },
        ],
      },
      {
        id: "1-3",
        label: "index.ts",
        type: "file",
        icon: <FileCode className="size-4 text-amber-500" />,
      },
    ],
  },
  {
    id: "2",
    label: "public",
    type: "folder",
    children: [
      {
        id: "2-1",
        label: "images",
        type: "folder",
        children: [
          {
            id: "2-1-1",
            label: "logo.png",
            type: "file",
          },
          {
            id: "2-1-2",
            label: "hero.jpg",
            type: "file",
          },
        ],
      },
    ],
  },
  {
    id: "3",
    label: "package.json",
    type: "file",
    icon: <FileJson className="size-4 text-green-500" />,
  },
  {
    id: "4",
    label: "README.md",
    type: "file",
    icon: <FileText className="size-4 text-slate-500" />,
  },
  {
    id: "5",
    label: "tsconfig.json",
    type: "file",
    icon: <FileJson className="size-4 text-green-500" />,
  },
];

// Deep nesting example
const deeplyNestedTree: FileNode[] = [
  {
    id: "root",
    label: "project",
    type: "folder",
    defaultExpanded: true,
    children: [
      {
        id: "level1",
        label: "level-1",
        type: "folder",
        defaultExpanded: true,
        children: [
          {
            id: "level2",
            label: "level-2",
            type: "folder",
            defaultExpanded: true,
            children: [
              {
                id: "level3",
                label: "level-3",
                type: "folder",
                defaultExpanded: true,
                children: [
                  {
                    id: "level4",
                    label: "level-4",
                    type: "folder",
                    defaultExpanded: true,
                    children: [
                      {
                        id: "deep-file",
                        label: "deeply-nested.ts",
                        type: "file",
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];

// Simple flat structure
const flatStructure: FileNode[] = [
  {
    id: "f1",
    label: "index.html",
    type: "file",
  },
  {
    id: "f2",
    label: "styles.css",
    type: "file",
  },
  {
    id: "f3",
    label: "script.js",
    type: "file",
  },
];

export const Default: Story = {
  args: {
    data: sampleFileTree,
  },
};

export const WithClickHandler: Story = {
  args: {
    data: sampleFileTree,
    onNodeClick: (node: FileNode) => {
      console.log("Clicked node:", node);
      alert(`Clicked: ${node.label} (${node.type})`);
    },
  },
};

export const AllExpanded: Story = {
  args: {
    data: sampleFileTree,
    defaultExpandAll: true,
  },
};

export const DeeplyNested: Story = {
  args: {
    data: deeplyNestedTree,
  },
};

export const FlatStructure: Story = {
  args: {
    data: flatStructure,
  },
};

export const CustomIcons: Story = {
  args: {
    data: [
      {
        id: "c1",
        label: "Open Folder",
        type: "folder",
        icon: <FolderOpen className="size-4 text-purple-500" />,
        defaultExpanded: true,
        children: [
          {
            id: "c1-1",
            label: "TypeScript File",
            type: "file",
            icon: <FileCode className="size-4 text-blue-500" />,
          },
          {
            id: "c1-2",
            label: "JSON Config",
            type: "file",
            icon: <FileJson className="size-4 text-yellow-500" />,
          },
        ],
      },
    ],
  },
};

export const EmptyFolder: Story = {
  args: {
    data: [
      {
        id: "empty",
        label: "empty-folder",
        type: "folder",
        children: [],
      },
      {
        id: "file",
        label: "readme.md",
        type: "file",
      },
    ],
  },
};

export const WithOnClickCallbacks: Story = {
  args: {
    data: [
      {
        id: "clickable1",
        label: "Click me (folder)",
        type: "folder",
        onClick: () => alert("Folder clicked!"),
        children: [
          {
            id: "clickable2",
            label: "Click me too (file)",
            type: "file",
            onClick: () => alert("File clicked!"),
          },
        ],
      },
    ],
  },
};

// Search/Filter Stories

export const WithInternalFilter: Story = {
  args: {
    data: sampleFileTree,
    showSearch: true,
  },
};

export const WithExternalSearch: Story = {
  args: {
    data: sampleFileTree,
    showSearch: true,
    onSearch: (query: string) => {
      console.log("External search query:", query);
      // In a real app, this would trigger an async search
      alert(`Searching for: ${query}`);
    },
  },
};

export const FilterExamples: Story = {
  args: {
    data: sampleFileTree,
    showSearch: true,
  },
  render: (args) => {
    return (
      <div className="space-y-4">
        <div className="px-2 text-sm text-muted-foreground">
          <p className="mb-2 font-semibold">Try these patterns:</p>
          <ul className="list-inside list-disc space-y-1">
            <li>index - Partial match (finds index.ts)</li>
            <li>Button - Partial match (finds Button.tsx, Button.test.tsx)</li>
            <li>test - Partial match (finds all test files)</li>
            <li>*.tsx - Wildcard: All TypeScript React files</li>
            <li>*.test.* - Wildcard: All test files</li>
            <li>Button* - Wildcard: Files starting with &quot;Button&quot;</li>
            <li>*.json - Wildcard: All JSON files</li>
          </ul>
        </div>
        <FileExplorer {...args} />
      </div>
    );
  },
};
