import { cn } from "@/common_lib/utils/cn";
import { Button } from "@/ui/shadcn/ui/button";
import { Input } from "@/ui/shadcn/ui/input";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
} from "@/ui/shadcn/ui/sidebar";
import { cva, VariantProps } from "class-variance-authority";
import {
  ChevronDownIcon,
  ChevronRightIcon,
  FileIcon,
  FolderIcon,
  SearchIcon,
  XIcon,
} from "lucide-react";
import { observer } from "mobx-react-lite";
import { HTMLAttributes, ReactNode, useMemo, useState } from "react";

const styleVariants = cva("w-full", {
  variants: {
    variant: {
      default: "",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

/**
 * File node structure for the file explorer tree
 */
export interface FileNode {
  id: string;
  label: string;
  icon?: ReactNode;
  url?: string;
  onClick?: () => void;
  type: "file" | "folder";
  children?: FileNode[];
  defaultExpanded?: boolean;
}

/**
 * Convert pattern to regex
 * Supports wildcards (* and ?) or partial matching
 */
function patternToRegex(pattern: string): RegExp {
  const hasWildcard = pattern.includes("*") || pattern.includes("?");

  if (hasWildcard) {
    // Wildcard mode: exact matching with wildcards
    const escaped = pattern
      .replace(/[.+^${}()|[\]\\]/g, "\\$&")
      .replace(/\*/g, ".*")
      .replace(/\?/g, ".");
    return new RegExp(`^${escaped}$`, "i");
  } else {
    // Partial matching mode: match anywhere in the string
    const escaped = pattern.replace(/[.+^${}()|[\]\\]/g, "\\$&");
    return new RegExp(escaped, "i");
  }
}

/**
 * Filter tree while preserving structure for matched nodes
 */
function filterTree(nodes: FileNode[], pattern: string): FileNode[] {
  if (!pattern) return nodes;

  const regex = patternToRegex(pattern);

  return nodes
    .map((node) => {
      const currentMatches = regex.test(node.label);

      if (node.children && node.children.length > 0) {
        const filteredChildren = filterTree(node.children, pattern);

        // Include folder if it matches OR has matching children
        if (currentMatches || filteredChildren.length > 0) {
          return {
            ...node,
            children: filteredChildren,
            defaultExpanded: filteredChildren.length > 0, // Auto-expand folders with matches
          };
        }
      } else if (currentMatches) {
        return node;
      }

      return null;
    })
    .filter((node): node is FileNode => node !== null);
}

/**
 * FileExplorer - A VSCode-like file browser with infinite nesting support
 *
 * @example
 * ```tsx
 * // Internal filtering (default)
 * <FileExplorer
 *   data={fileTree}
 *   showSearch
 * />
 *
 * // External search function
 * <FileExplorer
 *   data={fileTree}
 *   showSearch
 *   onSearch={(query) => handleExternalSearch(query)}
 * />
 * ```
 *
 * @slot {"header"} data-slot="header" - Search header container
 * @slot {"search-input"} data-slot="search-input" - Search input field
 * @slot {"item"} data-slot="item" - Individual file/folder item
 * @slot {"button"} data-slot="button" - The clickable button for each item
 * @slot {"icon"} data-slot="icon" - Icon container
 * @slot {"label"} data-slot="label" - Label text
 */
export interface FileExplorerProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "onClick">,
    VariantProps<typeof styleVariants> {
  data: FileNode[];
  onNodeClick?: (node: FileNode) => void;
  defaultExpandAll?: boolean;
  showSearch?: boolean;
  onSearch?: (query: string) => void | Promise<void>;
  searchPlaceholder?: string;
}

interface FileTreeItemProps {
  node: FileNode;
  level: number;
  onNodeClick?: (node: FileNode) => void;
  defaultExpandAll?: boolean;
}

const FileTreeItem = observer(function FileTreeItem({
  node,
  level,
  onNodeClick,
  defaultExpandAll = false,
}: FileTreeItemProps) {
  const [expanded, setExpanded] = useState(
    node.defaultExpanded ?? defaultExpandAll ?? false,
  );

  const hasChildren = node.children && node.children.length > 0;
  const isFolder = node.type === "folder";

  const handleClick = () => {
    if (isFolder && hasChildren) {
      setExpanded(!expanded);
    }
    if (node.onClick) {
      node.onClick();
    }
    if (onNodeClick) {
      onNodeClick(node);
    }
  };

  const icon =
    node.icon ||
    (isFolder ? (
      <FolderIcon className="size-4" />
    ) : (
      <FileIcon className="size-4" />
    ));

  return (
    <>
      <SidebarMenuItem data-slot="item">
        <SidebarMenuButton
          data-slot="button"
          onClick={handleClick}
          className="gap-2"
        >
          {isFolder && hasChildren && (
            <span data-slot="chevron" className="shrink-0">
              {expanded ? (
                <ChevronDownIcon className="size-4" />
              ) : (
                <ChevronRightIcon className="size-4" />
              )}
            </span>
          )}
          {!isFolder && !hasChildren && <span className="w-4" />}
          <span data-slot="icon" className="shrink-0">
            {icon}
          </span>
          <span data-slot="label" className="truncate">
            {node.label}
          </span>
        </SidebarMenuButton>
      </SidebarMenuItem>

      {isFolder && hasChildren && expanded && (
        <SidebarMenuSub>
          {node.children?.map((child) => (
            <SidebarMenuSubItem key={child.id}>
              <FileTreeItem
                node={child}
                level={level + 1}
                onNodeClick={onNodeClick}
                defaultExpandAll={defaultExpandAll}
              />
            </SidebarMenuSubItem>
          ))}
        </SidebarMenuSub>
      )}
    </>
  );
});

export const FileExplorer = observer(function FileExplorer(
  fullProps: FileExplorerProps,
) {
  const {
    className,
    variant,
    data,
    onNodeClick,
    defaultExpandAll,
    showSearch = false,
    onSearch,
    searchPlaceholder,
    ...props
  } = fullProps;

  const [searchQuery, setSearchQuery] = useState("");

  // If onSearch is provided, use external search; otherwise use internal filtering
  const isExternalSearch = !!onSearch;

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    if (isExternalSearch && onSearch) {
      onSearch(value);
    }
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    if (isExternalSearch && onSearch) {
      onSearch("");
    }
  };

  // Filter data in internal mode only
  const displayData = useMemo(() => {
    if (!isExternalSearch && searchQuery) {
      return filterTree(data, searchQuery);
    }
    return data;
  }, [data, searchQuery, isExternalSearch]);

  const placeholder =
    searchPlaceholder ||
    (isExternalSearch
      ? "Search files..."
      : "Filter files (index, *.ts, test*, etc.)");

  return (
    <div className={cn(styleVariants({ variant, className }))} {...props}>
      {showSearch && (
        <div data-slot="header" className="mb-2 px-2">
          <div className="relative">
            <SearchIcon className="absolute left-2 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              data-slot="search-input"
              type="text"
              placeholder={placeholder}
              value={searchQuery}
              onChange={(event) => handleSearchChange(event.target.value)}
              className="px-8"
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClearSearch}
                className="absolute right-0 top-1/2 size-8 -translate-y-1/2 p-0"
              >
                <XIcon className="size-4" />
              </Button>
            )}
          </div>
        </div>
      )}
      <SidebarMenu>
        {displayData.length > 0 ? (
          displayData.map((node) => (
            <FileTreeItem
              key={node.id}
              node={node}
              level={0}
              onNodeClick={onNodeClick}
              defaultExpandAll={defaultExpandAll}
            />
          ))
        ) : searchQuery ? (
          <div className="px-4 py-8 text-center text-sm text-muted-foreground">
            No files match {searchQuery}
          </div>
        ) : null}
      </SidebarMenu>
    </div>
  );
});
