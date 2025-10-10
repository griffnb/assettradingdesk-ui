import { cn } from "@/utils/cn";
import { cva, VariantProps } from "class-variance-authority";

import { ReactNode } from "react";
import { Badge, BadgeColorKeys } from "../badge/Badge";

const styleVariants = cva(
  "flex h-10 cursor-pointer items-center gap-x-3 px-3 py-2 group-[.leftnav-closed]:justify-center",
  {
    variants: {
      variant: {
        light: [
          "font-semibold text-text-neutral-secondary bg-white rounded-md",
          "hover:bg-bg-neutral-secondary-hover",
          "group-[.active]:bg-bg-brand-primary group-[.active]:text-text-brand-tertiary",
        ],
        dark: "hover:bg-gray-800 text-white rounded-md",
      },
    },
    defaultVariants: {
      variant: "light",
    },
  }
);

const iconVariants = cva("", {
  variants: {
    variant: {
      light: [
        "text-icon-neutral-quinary bg-icon-neutral-quinary",
        "group-[.active]:bg-icon-brand-primary",
      ],
      dark: "text-white",
    },
  },
  defaultVariants: {
    variant: "light",
  },
});

interface MainLinkProps extends VariantProps<typeof styleVariants> {
  icon: string;
  route: string;
  label: string;
  className?: string;
  active?: boolean;
  notifications?: number | string | ReactNode;
  notificationColor?: BadgeColorKeys;
  onClick?: () => void;
  locked?: boolean;
}

export const MainLink = (props: MainLinkProps) => {
  //TODO fix active state
  const active = false; //router.asPath.startsWith(props.route);

  return (
    <>
      {props.locked ? (
        <div
          className={`group ${props.active || active ? "active" : ""}`}
          onClick={props.onClick}
        >
          <div
            className={cn(
              styleVariants({
                variant: props.variant,
                className: props.className,
              })
            )}
          >
            <i
              className={cn(
                iconVariants({
                  variant: props.variant,
                  className: `${props.icon}`,
                })
              )}
            ></i>
            <span className="group-[.leftnav-closed]:hidden">
              {props.label}
            </span>

            <div className="ml-auto">
              <i className="u u-lock text-icon-neutral-quinary"></i>
            </div>
          </div>
        </div>
      ) : (
        <a
          href={props.route}
          className={`group ${props.active || active ? "active" : ""}`}
          onClick={props.onClick}
        >
          <div
            className={cn(
              styleVariants({
                variant: props.variant,
                className: props.className,
              })
            )}
          >
            <i
              className={cn(
                iconVariants({
                  variant: props.variant,
                  className: `${props.icon}`,
                })
              )}
            ></i>
            <span className="group-[.leftnav-closed]:hidden">
              {props.label}
            </span>
            {props.notifications && (
              <div className="ml-auto flex flex-col items-center">
                {typeof props.notifications == "number" ||
                typeof props.notifications == "string" ? (
                  <Badge color={props.notificationColor ?? "error"} size="sm">
                    {props.notifications}
                  </Badge>
                ) : (
                  props.notifications
                )}
              </div>
            )}
          </div>
        </a>
      )}
    </>
  );
};
