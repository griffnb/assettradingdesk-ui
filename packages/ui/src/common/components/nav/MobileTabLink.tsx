import { cn } from "@/utils/cn";
import { cva, VariantProps } from "class-variance-authority";
import { CountBadge } from "../badge/CountBadge";

interface MobileTabLinkProps extends VariantProps<typeof styleVariants> {
  icon: string;
  route: string;
  label: string;
  className?: string;
  active?: boolean;
  notifications?: number;
  onClick?: () => void;
  iconColor?:
    | "red"
    | "orange"
    | "yellow"
    | "green"
    | "teal"
    | "blue"
    | "indigo"
    | "purple"
    | "pink";
}

const styleVariants = cva("", {
  variants: {
    variant: {
      light: [" group-[.active]:bg-bg-brand-primary rounded-md "],

      dark: "hover:bg-gray-800 text-white rounded-md",
    },
  },
  defaultVariants: {
    variant: "light",
  },
});

export const MobileTabLink = (props: MobileTabLinkProps) => {
  const active = false; //todo
  const { notifications = 0, iconColor = "red" } = props;
  return (
    <a
      href={props.route}
      className={`group w-full ${props.active || active ? "active" : ""}`}
      onClick={props.onClick}
    >
      <div
        className={cn(
          styleVariants({ variant: props.variant, className: props.className })
        )}
      >
        <div className="flex h-14 w-full flex-col items-center justify-end rounded-md p-2">
          <div className="relative flex size-6 items-center justify-center text-icon-neutral-quinary group-[.active]:text-text-brand-tertiary">
            <i className={`${props.icon} text-xl`} />
            <CountBadge count={notifications} color={iconColor} size="sm" />
          </div>
          <div className="inactive whitespace-nowrap text-xs leading-[18px] text-text-neutral-secondary group-[.active]:text-text-brand-tertiary">
            {props.label}
          </div>
        </div>
      </div>
    </a>
  );
};
