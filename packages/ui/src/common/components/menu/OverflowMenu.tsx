import { cn } from "@/utils/cn";
import { Menu, MenuButton, MenuItems } from "@headlessui/react";
import { cva, VariantProps } from "class-variance-authority";
import { observer } from "mobx-react-lite";
import { HTMLAttributes, ReactNode } from "react";

const buttonVariants = cva("", {
  variants: {
    buttonVariant: {
      borderless: [
        "bg-white flex flex-col flex-none justify-center items-center rounded-lg border border-white/0 size-9",
        "hover:bg-fg-neutral-septenary hover:border-border-neutral-primary",
        "data-[open]:bg-fg-neutral-septenary data-[open]:border-border-neutral-primary",
      ],
      border: [
        "bg-white flex flex-col flex-none justify-center items-center rounded-lg border border-border-neutral-primary size-9",
        "hover:bg-fg-neutral-septenary ",
        "data-[open]:bg-fg-neutral-septenary ",
      ],
    },
  },
  defaultVariants: {
    buttonVariant: "borderless",
  },
});

const menuVariants = cva("", {
  variants: {
    menuVariant: {
      default: [
        "mt-0 flex min-w-44  flex-col items-start divide-y rounded-md border border-gray-200 bg-white shadow transition duration-200 ease-out data-[closed]:opacity-0",
      ],
    },
    position: {
      "bottom-left":
        "absolute top-10 z-popover right-0 origin-top data-[closed]:-translate-y-1 ",
      "top-left":
        "absolute bottom-full z-popover right-0 origin-bottom data-[closed]:translate-y-1 ",
    },
  },
  defaultVariants: {
    menuVariant: "default",
    position: "bottom-left",
  },
});

/**
 * A Sample Component
 *
 * @example
 * [&_*[data-slot='my-slot']]:mx-auto
 *
 * @slot {"my-slot"} data-slot="my-slot"
 */

export interface OverflowMenuProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof buttonVariants>,
    VariantProps<typeof menuVariants> {
  children: ReactNode;
  buttonClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}
export const OverflowMenu = observer((fullProps: OverflowMenuProps) => {
  const { className, buttonVariant, menuVariant, position, ...props } =
    fullProps;
  return (
    <Menu as={"div"} className="relative inline-flex">
      <>
        <MenuButton
          className={cn(buttonVariants({ buttonVariant, className }))}
          onClick={props.buttonClick}
        >
          <i className="fa-solid fa-ellipsis-vertical"></i>
        </MenuButton>
        <MenuItems
          transition
          className={cn(menuVariants({ menuVariant, position, className }))}
          portal={false}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          {props.children}
        </MenuItems>
      </>
    </Menu>
  );
});
