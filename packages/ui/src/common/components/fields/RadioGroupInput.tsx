import { observer } from "mobx-react-lite";

import { IConstant } from "@/models/types/constants";
import { cn } from "@/utils/cn";
import { cva, VariantProps } from "class-variance-authority";
import { ReactNode } from "react";
import { ErrorMessages } from "./base/ErrorMessages";
import { HelpText } from "./base/HelpText";
import { RadioGroupBase, RadioGroupBaseProps } from "./base/RadioGroupBase";
// Define item style variants for checked and unchecked states
const styleVariants = cva(
  "relative flex group", // Common styles
  {
    variants: {
      variant: {
        default: "min-w-[142px]",
        custom: "",
      },
      flex: {
        row: "flex-row gap-x-4",
        column: "flex-col gap-y-2",
        grid: "grid",
        row_col: "flex flex-col lg:flex-row lg:gap-x-4 gap-y-2",
      },
    },
    defaultVariants: {
      variant: "default",
      flex: "row",
    },
  }
);

export type RadioGroupVariants = VariantProps<typeof styleVariants>;
export interface RadioGroupInputProps
  extends VariantProps<typeof styleVariants>,
    Omit<RadioGroupBaseProps, "checkedValue"> {
  options: IConstant[];
  onChange: (value: IConstant | undefined) => void;
  value: string | number | undefined;
  errorMessages?: string[];
  helpText?: ReactNode;
  className?: string;
}
export const RadioGroupInput = observer((props: RadioGroupInputProps) => {
  return (
    <div className="flex w-full flex-col">
      <div
        className={cn(
          styleVariants({
            variant: props.variant,
            flex: props.flex,
            className: props.className,
          })
        )}
      >
        <RadioGroupBase {...props} checkedValue={props.value} />
      </div>
      {props.helpText && <HelpText>{props.helpText}</HelpText>}
      {props.errorMessages && props.errorMessages?.length > 0 && (
        <ErrorMessages errorMessages={props.errorMessages} />
      )}
    </div>
  );
});
