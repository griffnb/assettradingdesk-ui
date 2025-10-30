import { Button } from "@/ui/shadcn/ui/button";
import { Input } from "@/ui/shadcn/ui/input";
import { Separator } from "@/ui/shadcn/ui/separator";
import { cn } from "@/utils/cn";
import { cva, VariantProps } from "class-variance-authority";
import { Search } from "lucide-react";
import { observer } from "mobx-react-lite";
import { HTMLAttributes, useState } from "react";
import { useNavigate } from "react-router";

const styleVariants = cva("bg-white relative w-full flex mb-2", {
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
      <div className="absolute left-0 top-0 isolate size-full overflow-hidden md:h-[554px]">
        <img
          className="absolute -z-10 size-full object-cover"
          src="/img/hero2.png"
        />
      </div>

      <div className="relative">
        <div className="flex size-full flex-row items-center rounded-[inherit]">
          <div className="flex w-full content-stretch items-center p-4 md:h-[544px] md:px-24 md:py-10">
            <div className="flex w-full shrink-0 flex-col content-stretch items-start justify-center gap-10 md:max-w-4xl">
              {/* Title Section */}
              <div className="flex w-full shrink-0 flex-col content-stretch items-start gap-4 whitespace-pre-wrap">
                <div className="flex w-full shrink-0 flex-col content-stretch items-start">
                  <p className="shrink-0 text-xs font-semibold leading-5 text-violet-400 md:visible md:text-sm">
                    Global platform
                  </p>
                  <div className="justify-start self-stretch font-serif text-5xl font-normal italic text-primary-foreground md:text-6xl md:leading-[60px]">
                    Simplify
                  </div>
                  <div className="justify-start self-stretch text-5xl font-bold text-primary-foreground md:text-7xl md:leading-[72px]">
                    Semiconductor Trading
                  </div>
                </div>
                <div className="justify-start text-base font-light leading-7 text-primary-foreground md:text-xl">
                  Second-hand equipment, first class service. Transact with
                  confidence with verified, up-to-date information on the tools
                  you need.
                </div>
              </div>

              {/* Search Bar */}
              <div className="relative box-border hidden w-full content-stretch items-center gap-1 rounded-lg border-black bg-white p-1 shadow-lg md:flex md:max-w-3xl md:border-2 md:p-3">
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
              <div className="relative flex shrink-0 flex-col content-stretch items-start gap-4 md:flex-row">
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
