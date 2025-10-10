import { cn } from "@/utils/cn";
import { cva, VariantProps } from "class-variance-authority";
import dayjs from "dayjs";
import { observer } from "mobx-react-lite";
import { ReactNode, useState } from "react";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { Button } from "../buttons/Button";
import { ErrorMarker } from "./base/ErrorMarker";
import { ErrorMessages } from "./base/ErrorMessages";
import { HelpText } from "./base/HelpText";
import { InputEnd } from "./base/InputEnd";

const wrapStyles = cva(
  `relative flex w-full items-center rounded-lg border  text-xs `,
  {
    variants: {
      variant: {
        default: "text-gray-400 group-[.errors]:border-error-600 bg-white",
        custom: "",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const inputStyles = cva(
  `w-full flex-1 rounded-lg border-none px-4 py-1.5  !ring-0`,
  {
    variants: {
      variant: {
        default:
          "text-gray-700 placeholder:text-gray-500 disabled:text-gray-300",
        custom: "",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const calendarStyles = cva("absolute top-10 z-popover flex flex-col", {
  variants: {
    variant: {
      default: "border border-gray-300 shadow-lg bg-white",
      custom: "",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

interface DateRangeInputProps extends VariantProps<typeof inputStyles> {
  start: dayjs.Dayjs | undefined;
  end: dayjs.Dayjs | undefined;
  placeholder?: string;
  append?: ReactNode;
  prepend?: ReactNode;
  errorMessages?: string[];
  helpText?: ReactNode;
  handleChange: (start: dayjs.Dayjs, end: dayjs.Dayjs) => void;
  position?: "left" | "right";
}
export const DateRangeInput = observer((props: DateRangeInputProps) => {
  const hasErrors = props.errorMessages && props.errorMessages?.length > 0;

  const [inputValue, setInputValue] = useState<string>("");
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectionRange, setSelectionRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  if (
    props.start &&
    props.end &&
    inputValue !=
      `${props.start.format("YYYY-MM-DD")} - ${props.end.format("YYYY-MM-DD")}`
  ) {
    setInputValue(
      `${props.start.format("YYYY-MM-DD")} - ${props.end.format("YYYY-MM-DD")}`
    );

    setSelectionRange({
      startDate: props.start.toDate(),
      endDate: props.end.toDate(),
      key: "selection",
    });
  }

  const handleCalendarPick = (ranges: any) => {
    setSelectionRange({
      startDate: ranges.selection.startDate,
      endDate: ranges.selection.endDate,
      key: "selection",
    });
  };

  const apply = () => {
    const start = dayjs(selectionRange.startDate);
    const end = dayjs(selectionRange.endDate);

    setInputValue(
      `${start.format("YYYY-MM-DD")} - ${end.format("YYYY-MM-DD")}`
    );

    props.handleChange(
      dayjs(selectionRange.startDate),
      dayjs(selectionRange.endDate)
    );
    setShowCalendar(false);
  };

  let postitionCSS = "left-0";
  if (props.position === "left") {
    postitionCSS = "left-0";
  }
  if (props.position === "right") {
    postitionCSS = "right-0";
  }

  return (
    <div className={`${hasErrors ? "errors" : ""} group flex-1`}>
      <div className={cn(wrapStyles({ variant: props.variant }))}>
        {props.prepend ? (
          <InputEnd side="prepend">{props.prepend}</InputEnd>
        ) : (
          <InputEnd side="prepend">
            <i className="fa fa-calendar pointer-events-none text-lg"></i>
          </InputEnd>
        )}

        <input
          type={"text"}
          value={inputValue ?? ""}
          placeholder={props.placeholder}
          className={cn(inputStyles({ variant: props.variant }))}
          onClick={() => setShowCalendar(!showCalendar)}
          readOnly
        />
        {showCalendar && (
          <div
            className={cn(
              calendarStyles({ variant: props.variant }),
              postitionCSS
            )}
          >
            <DateRangePicker
              ranges={[selectionRange]}
              onChange={handleCalendarPick}
              moveRangeOnFirstSelection={true}
              retainEndDateOnFirstSelection={false}
              editableDateInputs={true}
              direction="horizontal"
              months={2}
              preventSnapRefocus={true}
            />
            <Button variant={"primary"} className="m-3 ml-auto" onClick={apply}>
              Apply
            </Button>
          </div>
        )}

        {hasErrors && <ErrorMarker />}
        {props.append && <InputEnd side="append">{props.append}</InputEnd>}
      </div>
      {props.helpText && <HelpText>{props.helpText}</HelpText>}
      {props.errorMessages && props.errorMessages?.length > 0 && (
        <ErrorMessages errorMessages={props.errorMessages} />
      )}
    </div>
  );
});
