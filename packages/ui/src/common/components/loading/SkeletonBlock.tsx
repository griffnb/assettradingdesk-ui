import clsx from "clsx";
import { observer } from "mobx-react";
import React from "react";

type SkeletonProps = {
  className?: string;
  barHeight?: number; // px
  gap?: number; // px
};

export const SkeletonBlock = observer(function SkeletonBlock({
  className,
  barHeight = 12,
  gap = 10,
}: SkeletonProps) {
  return (
    <div
      aria-hidden
      className={clsx("skeleton-bars size-full rounded-md", className)}
      style={
        {
          ["--bar-h" as any]: `${barHeight}px`,
          ["--gap" as any]: `${gap}px`,
        } as React.CSSProperties
      }
    />
  );
});
