import { Button } from "@/ui/shadcn/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/ui/shadcn/ui/dropdown-menu";
import { cn } from "@/ui/shadcn/utils";
import { ChevronDownIcon } from "lucide-react";
import type { ReactNode } from "react";

interface NavLinkProps {
  className?: string;
  label: string;
  href?: string;
  active?: boolean;
  badges?: ReactNode;
  dropdownContent?: ReactNode;
  onClick?: () => void;
}

const triggerStyles = [
  "h-7 px-2 py-1 gap-1",
  "text-xs font-medium capitalize",
  "text-[hsl(var(--admin-nav-text))]",
  "hover:bg-white/10 hover:text-[hsl(var(--admin-nav-text-active))]",
  "data-[active]:text-[hsl(var(--admin-nav-text-active))]",
  "data-[active]:bg-white/10",
];

export function NavLink(props: NavLinkProps) {
  const {
    className,
    label,
    active = false,
    badges,
    dropdownContent,
    onClick,
  } = props;

  const trigger = (
    <Button
      data-slot="nav-link"
      data-active={active || undefined}
      variant="ghost"
      size="sm"
      onClick={dropdownContent ? undefined : onClick}
      className={cn(triggerStyles, className)}
    >
      <span>{label}</span>
      {badges}
      {dropdownContent && (
        <ChevronDownIcon className="size-4 text-[hsl(var(--admin-nav-text))]" />
      )}
    </Button>
  );

  if (!dropdownContent) {
    return trigger;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
      <DropdownMenuContent align="start" sideOffset={8}>
        {dropdownContent}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
