import { Button } from "@/ui/shadcn/ui/button";
import { Card } from "@/ui/shadcn/ui/card";
import { cn } from "@/utils/cn";
import { cva, VariantProps } from "class-variance-authority";
import { observer } from "mobx-react";
import { HTMLAttributes } from "react";
import { useNavigate } from "react-router";

const styleVariants = cva("bg-neutral-100 relative shrink-0 w-full", {
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
 * CTA Section Component
 *
 * Call-to-action section for selling tools with buttons
 */

export interface CtaSectionProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof styleVariants> {}

export const CtaSection = observer(function CtaSection(
  fullProps: CtaSectionProps,
) {
  const { className, variant, ...props } = fullProps;
  const nav = useNavigate();

  return (
    <div className={cn(styleVariants({ variant, className }))} {...props}>
      <div className="size-full">
        <div className="relative box-border flex w-full flex-col content-stretch items-start gap-5 px-10 py-12">
          <Card className="relative w-full shrink-0 rounded-[10px] bg-white shadow-xl">
            <div className="flex size-full flex-row items-center">
              <div className="relative box-border flex w-full content-stretch items-center gap-1 p-14">
                <div className="relative flex w-full max-w-3xl shrink-0 flex-col content-stretch items-start justify-center gap-4">
                  {/* CTA Content */}
                  <div className="relative flex w-full shrink-0 flex-col content-stretch items-start gap-1 whitespace-pre-wrap">
                    <p className="relative shrink-0 text-sm font-semibold leading-5 text-indigo-600">
                      Sell your tools
                    </p>
                    <h2 className="relative mb-2 shrink-0 text-3xl font-bold leading-9 text-neutral-700">
                      Built to Sell. Trusted to Deliver.
                    </h2>
                    <p className="relative w-min min-w-full shrink-0 text-xl font-normal leading-7 text-neutral-500">
                      Join thousands of sellers who trust our platform to move
                      high-quality tools into the right hands—efficiently and
                      transparently.
                    </p>
                  </div>

                  {/* CTA Buttons */}
                  <div className="relative flex shrink-0 content-stretch items-start gap-3">
                    <Button
                      className="h-10 bg-indigo-600 px-6 py-2 hover:bg-indigo-700"
                      onClick={() => nav("/signup")}
                    >
                      <span className="text-sm font-medium text-neutral-50">
                        Start Selling
                      </span>
                    </Button>

                    <Button
                      variant="outline"
                      className="h-10 border-neutral-200 bg-white px-6 py-2 shadow-sm"
                      onClick={() => nav("/signup")}
                    >
                      <span className="text-sm font-medium text-neutral-700">
                        Contact Sales
                      </span>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
});
