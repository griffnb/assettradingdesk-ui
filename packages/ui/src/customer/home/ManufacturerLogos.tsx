import { cn } from "@/utils/cn";
import { cva, VariantProps } from "class-variance-authority";
import { observer } from "mobx-react-lite";
import { HTMLAttributes } from "react";

const styleVariants = cva(
  "flex w-full flex-col  items-center md:flex-row bg-white divide-x divide-y",
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
      {/* Premium Tools Text Section */}
      <div className="flex size-full flex-col content-stretch items-start justify-center gap-1 whitespace-pre-wrap !border-y bg-white p-5 shadow-sm md:h-32 md:w-[30rem]">
        <h2 className="flex shrink-0 text-xl font-semibold leading-7 text-neutral-700">
          Premium tools. Proven brands.
        </h2>
        <p className="relative w-min min-w-full shrink-0 text-base font-normal leading-6 text-neutral-500">
          Trusted OEMs—ensuring quality, compatibility, and high resale value.
        </p>
      </div>
      {/* Logos Section */}
      <div className="grid w-full grid-cols-2 divide-x divide-y md:flex md:flex-row md:divide-inherit md:!border-y">
        {logos.map((logo, index) => (
          <div
            key={index}
            className="relative flex-1 shrink-0 bg-white shadow-sm first:border-t md:h-32 md:border-y"
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
    </div>
  );
});
