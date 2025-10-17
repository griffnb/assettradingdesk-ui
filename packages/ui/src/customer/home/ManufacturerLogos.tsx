import { cn } from "@/utils/cn";
import { cva, VariantProps } from "class-variance-authority";
import { observer } from "mobx-react-lite";
import { HTMLAttributes } from "react";

const styleVariants = cva("h-32 relative w-full", {
  variants: {
    variant: {
      default: "",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

/**
 * Manufacturer Logos Component
 *
 * Displays premium tools and manufacturer logos section
 */

export interface ManufacturerLogosProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof styleVariants> {}

export const ManufacturerLogos = observer(function ManufacturerLogos(
  fullProps: ManufacturerLogosProps,
) {
  const { className, variant, ...props } = fullProps;

  const logos = [
    "/img/logos/applied.png",
    "/img/logos/asml.png",
    "/img/logos/lam.png",
    "/img/logos/tel.png",
  ];

  return (
    <div className={cn(styleVariants({ variant, className }))} {...props}>
      <div className="relative flex h-32 w-full content-stretch items-center rounded-[inherit]">
        {/* Premium Tools Text Section */}
        <div className="relative box-border flex h-full w-96 shrink-0 flex-col content-stretch items-start justify-center gap-1 whitespace-pre-wrap bg-white px-10 py-0">
          <h2 className="relative shrink-0 text-xl font-semibold leading-7 text-neutral-700">
            Premium tools. Proven brands.
          </h2>
          <p className="relative w-min min-w-full shrink-0 text-base font-normal leading-6 text-neutral-500">
            Trusted OEMs—ensuring quality, compatibility, and high resale value.
          </p>
        </div>

        {logos.map((logo, index) => (
          <div
            key={index}
            className="relative h-full min-h-px min-w-px flex-1 shrink-0 border-l border-neutral-200 bg-white shadow-sm"
          >
            <div className="flex size-full flex-col items-center justify-center rounded-[inherit]">
              <div className="relative box-border flex size-full flex-col content-stretch items-center justify-center px-6 py-10">
                <div className="flex shrink-0 flex-col content-stretch items-center justify-center gap-2">
                  <img src={logo} className="flex-none object-contain" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Top and bottom borders */}
      <div className="pointer-events-none absolute inset-0 border-x-0 border-y border-solid border-neutral-200" />
    </div>
  );
});
