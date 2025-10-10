import { cn } from "@/utils/cn";
import { cva, VariantProps } from "class-variance-authority";
import { ReactNode } from "react";
import { Badge, BadgeColorKeys } from "../badge/Badge";

const styleVariants = cva(
  "flex h-10 cursor-pointer items-center gap-x-3 px-3 py-2 group-[.leftnav-closed]:justify-center",
  {
    variants: {
      variant: {
        light:
          "hover:bg-gray-50 text-secondary bg-white rounded-md data-[active=true]:bg-brand-primary_hover data-[active=true]:text-brand-tertiary",
        dark: "hover:bg-gray-800 text-white rounded-md data-[active=true]:bg-gray-400",
        primary: [
          "font-semibold text-text-neutral-secondary bg-white rounded-md",
          "hover:bg-bg-neutral-secondary-hover  bg-white rounded-md data-[active=true]:bg-bg-brand-primary data-[active=true]:text-text-brand-tertiary",
        ],
      },
    },
    defaultVariants: {
      variant: "light",
    },
  }
);

const iconVariants = cva("flex-none", {
  variants: {
    variant: {
      light: "text-icon-neutral-quinary",
      dark: "text-white",
      primary:
        "text-icon-neutral-quinary data-[active=true]:text-icon-brand-primary",
    },
  },
  defaultVariants: {
    variant: "light",
  },
});

interface NavAccordianLinkProps
  extends VariantProps<typeof styleVariants>,
    VariantProps<typeof iconVariants> {
  icon: string;
  route: string;
  label?: string;
  children?: ReactNode;
  className?: string;
  active?: boolean;
  notifications?: string | number;
  notificationColor?: BadgeColorKeys;
}
export const NavAccordianLink = (props: NavAccordianLinkProps) => {
  const active = false; //TODO //router.asPath === props.route;

  return (
    <a
      data-active={props.active || active ? "true" : "false"}
      href={props.route}
      className={cn(
        styleVariants({ variant: props.variant, className: props.className })
      )}
    >
      {props.children ? (
        props.children
      ) : (
        <>
          <i
            data-active={props.active || active ? "true" : "false"}
            className={cn(
              iconVariants({
                variant: props.variant,
                className: `${props.icon}`,
              })
            )}
          ></i>
          <span className="group-[.leftnav-closed]:hidden">{props.label}</span>
          {Boolean(props.notifications) && (
            <div className="ml-auto">
              <Badge color={props.notificationColor ?? "error"} size="sm">
                {props.notifications}
              </Badge>
            </div>
          )}
        </>
      )}
    </a>
  );
};
