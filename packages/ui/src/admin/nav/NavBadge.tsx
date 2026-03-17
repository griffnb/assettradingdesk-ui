import { Badge } from "@/ui/shadcn/ui/badge";
import { cn } from "@/ui/shadcn/utils";
import { cva, type VariantProps } from "class-variance-authority";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

const navBadgeVariants = cva(
  [
    "h-4 rounded-sm border-transparent",
    "text-[9px] font-medium leading-[1.5] text-white",
    "px-0 py-0 gap-0.5",
  ],
  {
    variants: {
      variant: {
        danger: "bg-[hsl(var(--admin-badge-danger))]",
        warning: "bg-[hsl(var(--admin-badge-warning))]",
        success: "bg-[hsl(var(--admin-badge-success))]",
        neutral: [
          "bg-[hsl(var(--admin-badge-neutral))]",
          "text-[hsl(var(--admin-breadcrumb-bg))]",
        ],
      },
      size: {
        default: "pl-1 pr-0.5 py-0.5",
        icon: "px-0.5 justify-center",
      },
    },
    defaultVariants: {
      variant: "warning",
      size: "default",
    },
  },
);

interface NavBadgeProps extends VariantProps<typeof navBadgeVariants> {
  className?: string;
  count?: number;
  icon?: LucideIcon;
  children?: ReactNode;
}

export function NavBadge(props: NavBadgeProps) {
  const { className, count, icon: Icon, variant, size, children } = props;

  return (
    <Badge
      data-slot="nav-badge"
      className={cn(navBadgeVariants({ variant, size }), className)}
    >
      {count !== undefined && (
        <span className="text-center capitalize">{count}</span>
      )}
      {Icon && <Icon className="size-3" />}
      {children}
    </Badge>
  );
}

export { navBadgeVariants };
