import { Button } from "@/ui/shadcn/ui/button";
import { Input } from "@/ui/shadcn/ui/input";
import { Separator } from "@/ui/shadcn/ui/separator";
import { cn } from "@/utils/cn";
import { cva, VariantProps } from "class-variance-authority";
import { Search } from "lucide-react";
import { observer } from "mobx-react-lite";
import { HTMLAttributes, useState } from "react";
import { useNavigate } from "react-router";

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
  const [searchQuery, setSearchQuery] = useState("");
  const { className, variant, ...props } = fullProps;
  const nav = useNavigate();

  const goSearch = () => {
    nav(`/assets?q=${searchQuery}`);
  };

  return (
    <div className={cn(styleVariants({ variant, className }))} {...props}>
      {/* Hero Background with gradient and blur effect */}
      <div className="absolute left-0 top-0 isolate h-[554px] w-full overflow-hidden">
        <img
          className="absolute -z-10 size-full object-cover"
          src="/img/hero2.png"
        />
      </div>

      <div className="relative">
        <div className="flex size-full flex-row items-center rounded-[inherit]">
          <div className="flex h-[544px] w-full content-stretch items-center px-24 py-10">
            <div className="flex w-full max-w-4xl shrink-0 flex-col content-stretch items-start justify-center gap-10">
              {/* Title Section */}
              <div className="flex w-full shrink-0 flex-col content-stretch items-start gap-4 whitespace-pre-wrap">
                <div className="flex w-full shrink-0 flex-col content-stretch items-start">
                  <p className="shrink-0 text-sm font-semibold leading-5 text-violet-400">
                    Global platform
                  </p>
                  <div className="justify-start self-stretch font-serif text-6xl font-normal italic leading-[60px] text-primary-foreground">
                    Simplify
                  </div>
                  <div className="justify-start self-stretch text-7xl font-bold leading-[72px] text-primary-foreground">
                    Semiconductor Trading
                  </div>
                </div>
                <div className="justify-start text-xl font-light leading-7 text-primary-foreground">
                  Second-hand equipment, first class service. Transact with
                  confidence with verified, up-to-date information on the tools
                  you need.
                </div>
              </div>

              {/* Search Bar */}
              <div className="relative box-border flex w-full max-w-3xl content-stretch items-center gap-1 rounded-lg border-2 border-black bg-white p-3 shadow-lg">
                <div className="relative flex min-h-px min-w-px flex-1 shrink-0 content-stretch items-center gap-2">
                  <Search className="size-5 text-neutral-500" />
                  <Input
                    placeholder="Search equipment, manufacturers, models..."
                    className="flex-1 border-0 bg-transparent text-lg shadow-none placeholder:text-neutral-500 focus-visible:ring-0"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button
                  className="h-10 bg-primary px-10 py-2 hover:bg-indigo-700"
                  onClick={goSearch}
                >
                  Search
                </Button>
              </div>

              {/* Statistics Section */}
              <div className="relative flex shrink-0 content-stretch items-start gap-4">
                <div className="relative flex shrink-0 flex-col content-stretch items-start justify-center">
                  <p className="relative shrink-0 text-base font-extrabold leading-6 text-violet-400">
                    40,417
                  </p>
                  <p className="relative shrink-0 text-sm font-normal leading-5 text-primary-foreground">
                    Active Listings:
                  </p>
                </div>

                <Separator orientation="vertical" className="h-5" />

                <div className="relative flex shrink-0 flex-col content-stretch items-start justify-center">
                  <p className="relative shrink-0 text-base font-extrabold leading-6 text-violet-400">
                    $7.1 Billion
                  </p>
                  <p className="relative shrink-0 text-sm font-normal leading-5 text-primary-foreground">
                    Total Equipment Value:
                  </p>
                </div>

                <Separator orientation="vertical" className="h-5" />

                <div className="relative flex shrink-0 flex-col content-stretch items-start justify-center">
                  <p className="relative shrink-0 text-base font-extrabold leading-6 text-violet-400">
                    5,884+
                  </p>
                  <p className="relative shrink-0 text-sm font-normal leading-5 text-primary-foreground">
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
