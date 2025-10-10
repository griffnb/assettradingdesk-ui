import { cn } from "@/utils/cn";
import { useMask } from "@react-input/mask";
import { cva, VariantProps } from "class-variance-authority";
import dayjs from "dayjs";
import { observer } from "mobx-react-lite";
import {
  ChangeEvent,
  FocusEvent,
  ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Calendar } from "react-date-range";
import { ClearMarker } from "./base/ClearMarker";
import { ErrorMarker } from "./base/ErrorMarker";
import { ErrorMessages } from "./base/ErrorMessages";
import { HelpText } from "./base/HelpText";
import { InputEnd } from "./base/InputEnd";

const wrapStyles = cva(
  `relative flex w-full items-center rounded-lg border text-xs `,
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

export interface DateInputProps extends VariantProps<typeof inputStyles> {
  value?: dayjs.Dayjs;
  placeholder?: string;
  prepend?: ReactNode;
  append?: ReactNode;
  errorMessages?: string[];
  helpText?: ReactNode;
  handleChange: (date: dayjs.Dayjs | null) => void;
  allowClear?: boolean;
  icon?: string;
  displayFormat?: string;
  minDate?: Date;
  maxDate?: Date;
  position?: "left" | "right";
  readOnly?: boolean;
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
}

export const DateInput = observer((props: DateInputProps) => {
  const hasErrors = props.errorMessages && props.errorMessages?.length > 0;
  const [inputValue, setInputValue] = useState<string>(
    props.value?.format(
      props.displayFormat ? props.displayFormat : "YYYY-MM-DD"
    ) || ""
  );

  const dateFormat = useMemo(
    () => props.displayFormat || "YYYY-MM-DD",
    [props.displayFormat]
  );

  useEffect(() => {
    if (props.value && props.value?.format(dateFormat) != inputValue) {
      setInputValue(props.value?.format(dateFormat) || "");
    }
  }, [props.value, dateFormat]);

  const maskOptions = {
    mask: dateFormat,
    replacement: { y: /\d/, Y: /\d/, m: /\d/, M: /\d/, d: /\d/, D: /\d/ },
    showMask: true,
  };

  const inputRef = useMask(maskOptions);
  const [showCalendar, setShowCalendar] = useState(false);

  const pickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Function to call on click event
    const handleClickOutside = (event: MouseEvent) => {
      if (
        pickerRef.current &&
        !pickerRef.current.contains(event.target as Node)
      ) {
        setShowCalendar(false);
      }
    };

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside); // Step 2
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside); // Step 4
    };
  }, []); // Empty dependency array ensures that effect runs only once

  const handleCalendarPick = (date: Date) => {
    const dayjsDate = dayjs(date);
    setInputValue(dayjsDate.format(dateFormat));
    props.handleChange(dayjsDate);
    setShowCalendar(false);
  };

  const clear = () => {
    setInputValue("");
    props.handleChange(null);
  };

  let postitionCSS = "left-0";
  if (props.position === "left") {
    postitionCSS = "left-0";
  }
  if (props.position === "right") {
    postitionCSS = "right-0";
  }
  const handleTypedDate = (e: ChangeEvent<HTMLInputElement>) => {
    const format = props.displayFormat || "YYYY-MM-DD"; // Mask format
    const inputValue = e.target.value;
    setInputValue(inputValue);
    // Emit change only if the input matches the full format and is valid
    const date = dayjs(inputValue, format, true); // Strict parsing
    if (date.isValid() && inputValue.length === format.length) {
      props.handleChange(date);
    } else {
      props.handleChange(null);
    }
  };

  return (
    <div
      className={`${hasErrors ? "errors" : ""} group flex-1`}
      ref={pickerRef}
    >
      <div className={cn(wrapStyles({ variant: props.variant }))}>
        {props.prepend && (
          <InputEnd
            side="prepend"
            onClick={() => setShowCalendar(!showCalendar)}
            className="cursor-pointer"
          >
            {props.prepend}
          </InputEnd>
        )}

        <input
          ref={inputRef}
          type={"text"}
          value={inputValue ?? ""} // Type casting to string
          placeholder={props.placeholder}
          className={cn(inputStyles({ variant: props.variant }))}
          readOnly={props.readOnly}
          onChange={handleTypedDate}
          onBlur={props.onBlur}
        />
        {showCalendar && (
          <div
            className={cn(
              calendarStyles({ variant: props.variant }),
              postitionCSS
            )}
          >
            <Calendar
              date={props.value?.toDate() || new Date()}
              onChange={handleCalendarPick}
              minDate={props.minDate}
              maxDate={props.maxDate}
            />
          </div>
        )}

        {props.allowClear && <ClearMarker clearSelection={clear} />}
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
