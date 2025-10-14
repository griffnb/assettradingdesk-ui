import { cn } from "@/utils/cn";
import { observer } from "mobx-react-lite";

export interface ProductSpecsProps {
  specs: { label: string; value: string }[];
  className?: string;
}

export const ProductSpecs = observer(function ProductSpecs({
  specs,
  className,
}: ProductSpecsProps) {
  return (
    <div className={cn("flex w-full flex-col gap-1", className)}>
      {specs.map((spec, index) => (
        <div
          key={index}
          className="flex w-full items-start gap-2 text-base leading-6 text-gray-700"
        >
          <span className="shrink-0 font-normal">{spec.label}:</span>
          <span className="font-semibold">{spec.value}</span>
        </div>
      ))}
    </div>
  );
});
