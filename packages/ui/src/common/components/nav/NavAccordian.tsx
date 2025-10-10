import { cn } from "@/utils/cn";
import { cva, VariantProps } from "class-variance-authority";
import { ReactNode, useEffect, useState } from "react";
import { Badge, BadgeColorKeys } from "../badge/Badge";

const styleVariants = cva(
  "flex h-10 cursor-pointer items-center gap-x-3 px-3 py-2 group-[.leftnav-closed]:justify-center group-[.leftnav-closed]:flex-col",
  {
    variants: {
      variant: {
        light:
          "hover:bg-gray-50 text-secondary bg-white rounded-md group-[.active]:bg-brand-primary_hover group-[.active]:text-brand-tertiary",
        dark: "hover:bg-gray-800 text-white rounded-md",
        primary:
          "hover:bg-gray-50 font-semibold text-text-neutral-secondary bg-white rounded-md group-[.active]:bg-bg-brand-primary group-[.active]:text-text-brand-tertiary",
      },
    },
    defaultVariants: {
      variant: "light",
    },
  },
);

const iconVariants = cva("flex-none", {
  variants: {
    variant: {
      light: "text-icon-neutral-quinary",
      dark: "text-white",
      primary:
        "text-icon-neutral-quinary group-[.active]:text-icon-brand-primary",
    },
  },
  defaultVariants: {
    variant: "light",
  },
});

const chevronVariant = cva(
  "ml-auto transition-transform duration-200 ease-out group-[.leftnav-closed]:hidden group-[.accordion-closed]:-rotate-90",
  {
    variants: {
      variant: {
        light: "fa fa-chevron-down fa-sm text-icon-neutral-quinary",
        dark: "fa fa-chevron-down fa-sm text-white",
        primary: "fa fa-chevron-down fa-sm text-icon-neutral-quinary",
      },
    },
    defaultVariants: {
      variant: "light",
    },
  },
);

const dropdownVariant = cva(
  "transition-max-h pl-1 duration-500 ease-out group-[.leftnav-closed]:hidden group-[.accordion-closed]:max-h-0",
  {
    variants: {
      variant: {
        light: " ml-1 border-l-2 border-gray-100",
        dark: " ml-1 border-l-2 border-gray-100",
        primary: " ml-1 border-l-2 border-gray-100",
      },
    },
    defaultVariants: {
      variant: "light",
    },
  },
);

interface NavAccordianProps
  extends VariantProps<typeof styleVariants>,
    VariantProps<typeof iconVariants>,
    VariantProps<typeof chevronVariant>,
    VariantProps<typeof dropdownVariant> {
  icon: string;
  label: string;
  toggleMenu: () => void;
  isMenuOpen: boolean;
  children: ReactNode;
  className?: string;
  notifications?: string | number | ReactNode;
  notificationColor?: BadgeColorKeys;
  active?: boolean;
}
export const NavAccordian = (props: NavAccordianProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(props.active);

  const menuClass = isDropdownOpen ? "" : "accordion-closed";
  const toggleDropdown = () => {
    if (!props.isMenuOpen) {
      props.toggleMenu();
      setIsDropdownOpen(true);
      return;
    }
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    if (isDropdownOpen != props.active) {
      setIsDropdownOpen(props.active);
    }
  }, [props.active]);

  return (
    <div className={`${menuClass} group`}>
      <div
        className={cn(
          styleVariants({ variant: props.variant, className: props.className }),
        )}
        onClick={() => toggleDropdown()}
      >
        <i
          className={cn(
            iconVariants({
              variant: props.variant,
              className: `${props.icon}`,
            }),
          )}
        ></i>
        <span className="group-[.leftnav-closed]:hidden">{props.label}</span>

        <div className="ml-auto flex flex-row items-center gap-x-3">
          {Boolean(props.notifications) && (
            <>
              {typeof props.notifications == "number" ||
              typeof props.notifications == "string" ? (
                <Badge color={props.notificationColor ?? "error"} size="sm">
                  {props.notifications}
                </Badge>
              ) : (
                props.notifications
              )}
            </>
          )}
          <i
            className={cn(
              chevronVariant({
                variant: props.variant,
              }),
            )}
          ></i>
        </div>
      </div>
      {isDropdownOpen && (
        <div
          className={cn(
            dropdownVariant({
              variant: props.variant,
            }),
          )}
        >
          {props.children}
        </div>
      )}
    </div>
  );
};
