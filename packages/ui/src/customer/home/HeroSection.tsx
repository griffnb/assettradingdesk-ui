import { Button } from "@/ui/shadcn/ui/button";
import { Input } from "@/ui/shadcn/ui/input";
import { Separator } from "@/ui/shadcn/ui/separator";
import { cn } from "@/utils/cn";
import { cva, VariantProps } from "class-variance-authority";
import { Search } from "lucide-react";
import { observer } from "mobx-react-lite";
import { HTMLAttributes } from "react";

const styleVariants = cva("bg-white relative w-full", {
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
 * Hero Section Component
 *
 * Main hero section with gradient background, title, search bar, and statistics
 */

export interface HeroSectionProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof styleVariants> {}

export const HeroSection = observer(function HeroSection(
  fullProps: HeroSectionProps,
) {
  const { className, variant, ...props } = fullProps;

  return (
    <div className={cn(styleVariants({ variant, className }))} {...props}>
      {/* Hero Background with gradient and blur effect */}
      <div className="absolute left-0 top-0 isolate h-[554px] w-full overflow-hidden">
        <div className="absolute z-10 h-[554px] w-full bg-gradient-to-bl from-transparent from-40% to-white/90" />
        <img
          className="absolute -z-10 size-full object-cover"
          src="/img/hero.png"
        />
      </div>

      <div className="relative">
        <div className="flex size-full flex-row items-center overflow-clip rounded-[inherit]">
          <div className="flex h-[544px] w-full content-stretch items-center px-24 py-10">
            <div className="flex w-full max-w-4xl shrink-0 flex-col content-stretch items-start justify-center gap-10">
              {/* Title Section */}
              <div className="flex w-full shrink-0 flex-col content-stretch items-start gap-4 whitespace-pre-wrap">
                <div className="flex w-full shrink-0 flex-col content-stretch items-start">
                  <p className="shrink-0 text-sm font-semibold leading-5 text-indigo-600">
                    Global platform
                  </p>
                  <h1 className="mb-2 text-5xl font-semibold leading-none text-neutral-700 lg:text-6xl">
                    The simplest way to buy & sell{" "}
                    <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                      Semiconductor Assets
                    </span>
                  </h1>
                </div>
                <p className="max-w-3xl text-2xl font-light leading-8 text-black">
                  Second-hand equipment, first class service. Transact with
                  confidence with verified, up-to-date information on the tools
                  you need.
                </p>
              </div>

              {/* Search Bar */}
              <div className="relative box-border flex w-full max-w-3xl content-stretch items-center gap-1 rounded-lg border-2 border-black bg-white p-3 shadow-lg">
                <div className="relative flex min-h-px min-w-px flex-1 shrink-0 content-stretch items-center gap-2">
                  <Search className="h-5 w-5 text-neutral-500" />
                  <Input
                    placeholder="Search equipment, manufacturers, models..."
                    className="flex-1 border-0 bg-transparent text-lg shadow-none placeholder:text-neutral-500 focus-visible:ring-0"
                  />
                </div>
                <Button className="h-10 bg-indigo-600 px-10 py-2 hover:bg-indigo-700">
                  Search
                </Button>
              </div>

              {/* Statistics Section */}
              <div className="relative flex shrink-0 content-stretch items-start gap-4">
                <div className="relative flex shrink-0 flex-col content-stretch items-start justify-center">
                  <p className="relative shrink-0 text-base font-extrabold leading-6 text-indigo-600">
                    40,417
                  </p>
                  <p className="relative shrink-0 text-sm font-normal leading-5 text-neutral-700">
                    Active Listings:
                  </p>
                </div>

                <Separator orientation="vertical" className="h-5" />

                <div className="relative flex shrink-0 flex-col content-stretch items-start justify-center">
                  <p className="relative shrink-0 text-base font-extrabold leading-6 text-indigo-600">
                    $7.1 Billion
                  </p>
                  <p className="relative shrink-0 text-sm font-normal leading-5 text-neutral-700">
                    Total Equipment Value:
                  </p>
                </div>

                <Separator orientation="vertical" className="h-5" />

                <div className="relative flex shrink-0 flex-col content-stretch items-start justify-center">
                  <p className="relative shrink-0 text-base font-extrabold leading-6 text-indigo-600">
                    5,884+
                  </p>
                  <p className="relative shrink-0 text-sm font-normal leading-5 text-neutral-700">
                    Companies & Growing:
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
