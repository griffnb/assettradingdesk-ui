import { Avatar, AvatarFallback, AvatarImage } from "@/ui/shadcn/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/ui/shadcn/ui/dropdown-menu";
import { cn } from "@/ui/shadcn/utils";
import { ChevronDownIcon } from "lucide-react";
import type { ReactNode } from "react";

interface NavUserMenuProps {
  className?: string;
  initials?: string;
  avatarUrl?: string;
  children?: ReactNode;
}

export function NavUserMenu(props: NavUserMenuProps) {
  const { className, initials = "??", avatarUrl, children } = props;

  const trigger = (
    <button
      data-slot="nav-user-menu"
      type="button"
      className={cn([
        "flex items-center gap-1 h-7 py-1",
        "transition-opacity",
        "hover:opacity-80",
        className,
      ])}
    >
      <Avatar className="size-8">
        {avatarUrl && <AvatarImage src={avatarUrl} alt="User avatar" />}
        <AvatarFallback
          className={cn([
            "bg-[hsl(var(--admin-nav-avatar-bg))]",
            "text-white text-xs font-medium",
          ])}
        >
          {initials}
        </AvatarFallback>
      </Avatar>
      <ChevronDownIcon className="size-5 text-[hsl(var(--admin-nav-text))]" />
    </button>
  );

  if (!children) {
    return trigger;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
      <DropdownMenuContent align="end" sideOffset={8}>
        {children}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
