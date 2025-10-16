import { cn } from "@/utils/cn";
import { cva, VariantProps } from "class-variance-authority";
import dayjs from "dayjs";
import { observer } from "mobx-react";
import { HTMLAttributes } from "react";
import { Link } from "react-router";

const styleVariants = cva(
  "inline-flex flex-col items-start justify-start gap-8 self-stretch border-t bg-dark-background px-16 text-dark-foreground py-20",
  {
    variants: {
      variant: {
        default: "",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

/**
 * A Sample Component
 *
 * @example
 * [&_*[data-slot='my-slot']]:mx-auto
 *
 * @slot {"my-slot"} data-slot="my-slot"
 */

export interface FooterProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof styleVariants> {}
export const Footer = observer(function Footer(fullProps: FooterProps) {
  const { className, variant } = fullProps;
  return (
    <div className={cn(styleVariants({ variant, className }))}>
      <div className="inline-flex items-center justify-between self-stretch">
        <div className="flex items-center justify-start gap-6">
          <div className="relative size-10 overflow-hidden">
            <img src="/img/logo_icon.svg" alt="Logo" />
          </div>
          <div className="flex items-center justify-start gap-6">
            <div
              data-direction="Horizontal"
              data-show-icon="No"
              data-state="Default"
              className="flex items-center justify-center gap-2.5"
            >
              <Link
                to="/"
                className="justify-start text-sm font-medium leading-tight text-dark-foreground"
              >
                Home
              </Link>
            </div>
            <div
              data-direction="Horizontal"
              data-show-icon="No"
              data-state="Default"
              className="flex items-center justify-center gap-2.5"
            >
              <Link
                to="/assets"
                className="justify-start text-sm font-medium leading-tight text-dark-foreground"
              >
                Assets
              </Link>
            </div>
            <div
              data-direction="Horizontal"
              data-show-icon="No"
              data-state="Default"
              className="flex items-center justify-center gap-2.5"
            >
              <div className="justify-start text-sm font-medium leading-tight text-dark-foreground">
                About Us
              </div>
            </div>
            <div
              data-direction="Horizontal"
              data-show-icon="No"
              data-state="Default"
              className="flex items-center justify-center gap-2.5"
            >
              <div className="justify-start text-sm font-medium leading-tight text-dark-foreground">
                Contact
              </div>
            </div>
            <div
              data-direction="Horizontal"
              data-show-icon="No"
              data-state="Default"
              className="flex items-center justify-center gap-2.5"
            >
              <div className="justify-start text-sm font-medium leading-tight text-dark-foreground">
                FAQ
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="h-0 self-stretch border-b-2"></div>
      <div className="inline-flex items-center justify-between self-stretch">
        <div className="justify-start text-sm font-medium leading-tight text-muted-foreground">
          Copyright @{dayjs().year()} AssetTradingDesk.com. All right reserved
        </div>
        <div className="flex items-center justify-start gap-6">
          <div
            data-direction="Horizontal"
            data-show-icon="No"
            data-state="Default"
            className="flex items-center justify-center gap-2.5"
          >
            <div className="justify-start text-sm font-medium leading-tight text-dark-foreground">
              Privacy Policy
            </div>
          </div>
          <div
            data-direction="Horizontal"
            data-show-icon="No"
            data-state="Default"
            className="flex items-center justify-center gap-2.5"
          >
            <div className="justify-start text-sm font-medium leading-tight text-dark-foreground">
              Terms of Service
            </div>
          </div>
          <div
            data-direction="Horizontal"
            data-show-icon="No"
            data-state="Default"
            className="flex items-center justify-center gap-2.5"
          >
            <div className="justify-start text-sm font-medium leading-tight text-dark-foreground">
              Cookies Settings
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
