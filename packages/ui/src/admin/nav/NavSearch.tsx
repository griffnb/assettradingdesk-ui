import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/ui/shadcn/ui/command";
import {
  Popover,
  PopoverAnchor,
  PopoverContent,
} from "@/ui/shadcn/ui/popover";
import { cn } from "@/ui/shadcn/utils";
import { Search } from "lucide-react";
import { useRef, useState, type ReactNode } from "react";

export interface NavSearchItem {
  label: string;
  value: string;
  group?: string;
  icon?: ReactNode;
}

interface NavSearchProps {
  className?: string;
  placeholder?: string;
  items?: NavSearchItem[];
  emptyMessage?: string;
  onSelect?: (value: string) => void;
}

export function NavSearch(props: NavSearchProps) {
  const {
    className,
    placeholder = "Search",
    items = [],
    emptyMessage = "No results found.",
    onSelect,
  } = props;

  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = query.length > 0
    ? items.filter((item) =>
        item.label.toLowerCase().includes(query.toLowerCase()),
      )
    : items;

  const groups = filtered.reduce<Record<string, NavSearchItem[]>>(
    (acc, item) => {
      const group = item.group ?? "Results";
      if (!acc[group]) acc[group] = [];
      acc[group].push(item);
      return acc;
    },
    {},
  );

  const handleSelect = (value: string) => {
    onSelect?.(value);
    setOpen(false);
    setQuery("");
  };

  return (
    <Popover open={open} onOpenChange={(isOpen) => {
      if (!isOpen && !inputRef.current?.matches(":focus")) setOpen(false);
    }}>
      <PopoverAnchor asChild>
        <div
          data-slot="nav-search"
          className={cn([
            "flex items-center gap-2 h-8",
            "px-3 rounded",
            "bg-white border border-white",
            className,
          ])}
        >
          <Search className="size-4 shrink-0 text-neutral-400" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            placeholder={placeholder}
            onChange={(event) => {
              setQuery(event.target.value);
              if (event.target.value.length > 0) setOpen(true);
            }}
            onFocus={() => setOpen(true)}
            onBlur={(event) => {
              if (!event.relatedTarget?.closest("[data-slot=popover-content]")) {
                setOpen(false);
              }
            }}
            className={cn([
              "flex-1 bg-transparent border-none shadow-none",
              "!outline-none !ring-0 focus:!outline-none focus:!ring-0 focus:!border-none focus:!shadow-none",
              "text-xs text-neutral-900",
              "placeholder:text-neutral-400",
            ])}
          />
        </div>
      </PopoverAnchor>
      <PopoverContent
        className="w-[var(--radix-popover-trigger-width)] p-0"
        align="start"
        sideOffset={4}
        onOpenAutoFocus={(event) => event.preventDefault()}
      >
        <Command shouldFilter={false}>
          <CommandList>
            {filtered.length === 0 && (
              <CommandEmpty>{emptyMessage}</CommandEmpty>
            )}
            {Object.entries(groups).map(([group, groupItems]) => (
              <CommandGroup key={group} heading={group}>
                {groupItems.map((item) => (
                  <CommandItem
                    key={item.value}
                    value={item.value}
                    onSelect={() => handleSelect(item.value)}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
