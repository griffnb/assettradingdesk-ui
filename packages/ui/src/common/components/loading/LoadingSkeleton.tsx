import { cn } from "@/utils/cn";
import { cva, VariantProps } from "class-variance-authority";
import { HTMLAttributes, useEffect, useState } from "react";

const styleVariants = cva("mx-auto animate-pulse", {
  variants: {
    variant: {
      default: "",
      center: "flex flex-col self-stretch flex-1 justify-center",
    },
    size: {
      sm: "h-8 w-24",
      md: "h-64 w-40",
      full: "size-full",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "full",
  },
});

const barVariants = cva("", {
  variants: {
    bar_variant: {
      default: "mb-2.5 h-2 rounded-full bg-gray-200 dark:bg-gray-700",
    },
    bar_size: {
      sm: "h-2",
      md: "h-4",
      lg: "h-6",
      xl: "h-12",
    },
  },
  defaultVariants: {
    bar_variant: "default",
    bar_size: "sm",
  },
});

interface LoadingSkeletonProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof styleVariants>,
    VariantProps<typeof barVariants> {
  rows?: number;
}

const widthClasses = ["w-1/4", "w-1/3", "w-1/2", "w-2/3", "w-3/4", "w-full"];

export const LoadingSkeleton = (fullProps: LoadingSkeletonProps) => {
  const { className, variant, size, bar_size, bar_variant } = fullProps;
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Create a timeout to show the loading skeleton after a delay
    // This prevents flicker on fast loads
    const timer = setTimeout(() => {
      setShow(true);
    }, 500);

    // Clean up the timeout when component unmounts
    return () => {
      clearTimeout(timer);
    };
  }, []);

  const rows = fullProps.rows || 6;

  if (!show) {
    return null;
  }

  return (
    <div className={cn(styleVariants({ variant, size, className }))}>
      {Array.from({ length: rows }).map((_, index) => {
        return (
          <div
            key={index}
            className={cn(
              barVariants({ bar_variant, bar_size }),
              index % 2 === 0
                ? "w-3/4"
                : widthClasses[index % widthClasses.length],
            )}
          ></div>
        );
      })}

      <span className="sr-only">Loading...</span>
    </div>
  );
};
