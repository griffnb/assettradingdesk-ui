import { Badge } from "@/ui/shadcn/ui/badge";
import { Button } from "@/ui/shadcn/ui/button";
import { Card, CardContent } from "@/ui/shadcn/ui/card";
import { cn } from "@/utils/cn";
import { cva, VariantProps } from "class-variance-authority";
import { Heart } from "lucide-react";
import { observer } from "mobx-react";
import { HTMLAttributes } from "react";

const styleVariants = cva(
  "bg-white relative shrink-0 w-full border-t border-neutral-200",
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
 * Exclusive Listings Component
 *
 * Displays exclusive products section with smaller listing cards
 */

export interface ExclusiveListingsProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof styleVariants> {}

export const ExclusiveListings = observer(function ExclusiveListings(
  fullProps: ExclusiveListingsProps,
) {
  const { className, variant, ...props } = fullProps;

  // Sample exclusive product data
  const exclusiveProducts = [
    {
      id: 1,
      name: "Canon FPA-2000 i1 Stepper",
      category: "Stepper",
      price: "$10,000.00 USD",
      badge: "Exclusive",
    },
    {
      id: 2,
      name: "Canon FPA-2000 i1 Stepper",
      category: "Stepper",
      price: "$10,000.00 USD",
      badge: "Exclusive",
    },
    {
      id: 3,
      name: "Canon FPA-2000 i1 Stepper",
      category: "Stepper",
      price: "$10,000.00 USD",
      badge: "Exclusive",
    },
    {
      id: 4,
      name: "Canon FPA-2000 i1 Stepper",
      category: "Stepper",
      price: "$10,000.00 USD",
      badge: "Exclusive",
    },
    {
      id: 5,
      name: "Canon FPA-2000 i1 Stepper",
      category: "Stepper",
      price: "$10,000.00 USD",
      badge: "Exclusive",
    },
  ];

  return (
    <div className={cn(styleVariants({ variant, className }))} {...props}>
      <div className="size-full">
        <div className="relative box-border flex w-full flex-col content-stretch items-start gap-5 px-10 pb-16 pt-12">
          {/* Section Header */}
          <div className="relative flex w-full shrink-0 content-stretch items-center gap-1">
            <div className="relative flex min-h-px min-w-px flex-1 shrink-0 flex-col content-stretch items-start justify-center gap-1 whitespace-pre-wrap font-semibold">
              <p className="relative shrink-0 text-sm leading-5 text-indigo-600">
                Exclusive Listings
              </p>
              <p className="relative shrink-0 text-2xl leading-8 text-neutral-700">
                Only on our platform.
              </p>
            </div>
            <Button
              variant="outline"
              className="h-9 rounded-lg border-neutral-200 bg-white px-4 py-2 shadow-sm"
            >
              <span className="text-sm font-medium text-neutral-700">
                View All
              </span>
            </Button>
          </div>

          {/* Exclusive Product Cards Grid */}
          <div className="relative flex w-full shrink-0 flex-wrap content-center items-center gap-6">
            {exclusiveProducts.map((product) => (
              <Card
                key={product.id}
                className="relative min-w-[260px] max-w-[320px] flex-1 rounded-[10px] border border-neutral-200"
              >
                <div className="max-w-inherit min-w-inherit relative flex w-full flex-col content-stretch items-start overflow-clip rounded-[inherit]">
                  {/* Product Image Section */}
                  <div className="relative w-full shrink-0">
                    <div className="relative box-border flex w-full flex-col content-stretch items-start gap-2.5 px-4 pb-0 pt-4">
                      <div className="flex h-52 w-full shrink-0 items-center justify-center overflow-clip bg-neutral-100">
                        <span className="text-sm text-neutral-400">
                          Product Image
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Product Details */}
                  <CardContent className="relative w-full shrink-0 p-4">
                    <div className="relative flex w-full shrink-0 flex-col content-stretch items-start gap-2 whitespace-pre-wrap">
                      <div className="relative flex w-full shrink-0 flex-col content-stretch items-start">
                        <h3 className="relative w-full shrink-0 text-lg font-semibold leading-7 text-neutral-700">
                          {product.name}
                        </h3>
                        <p className="relative w-full shrink-0 text-sm font-normal leading-5 text-neutral-500">
                          {product.category}
                        </p>
                      </div>
                      <p className="relative w-full shrink-0 text-lg font-semibold leading-7 text-neutral-700">
                        {product.price}
                      </p>
                    </div>
                  </CardContent>

                  {/* Exclusive Badge */}
                  <Badge className="absolute left-4 top-3 rounded-full bg-neutral-700 px-2.5 py-0.5 text-neutral-50 hover:bg-neutral-700">
                    <span className="text-xs font-semibold">
                      {product.badge}
                    </span>
                  </Badge>

                  {/* Favorite Button */}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-3 top-3 h-8 w-8 rounded-lg bg-transparent hover:bg-white/80"
                  >
                    <Heart className="h-4 w-4 text-neutral-600" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
});
