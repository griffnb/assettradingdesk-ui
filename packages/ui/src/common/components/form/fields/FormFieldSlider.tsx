import { TextInputProps } from "@/ui/common/components/fields/TextInput";

import { ValidationType, isFieldValid } from "@/utils/validations";

import { Slider } from "@/ui/shadcn/ui/slider";
import { runInAction } from "mobx";
import { observer } from "mobx-react-lite";
import { FocusEvent, useState } from "react";
import { ErrorMessages } from "../../fields/base/ErrorMessages";
import { HelpText } from "../../fields/base/HelpText";
import { FormFieldWrap } from "./FormFieldWrap";
import { FormFieldProps } from "./types";

interface FormFieldSliderProps<T extends ValidationType>
  extends FormFieldProps<T>,
    Omit<TextInputProps, "handleChange"> {
  min?: number;
  max?: number;
  step?: number;

  isRange?: boolean;
  endField?: keyof T;

  readOnly?: boolean;

  wrapVariant?: "default" | "custom" | "inline" | null;
  errorMessages?: string[];
  topLabels?: React.ReactNode;
  bottomLabels?: React.ReactNode;
}

export const FormFieldSlider = observer(
  <T extends ValidationType>(rawProps: FormFieldSliderProps<T>) => {
    const {
      onRecordUpdate,
      validateOn = "change",
      className,
      min,
      max,
      isRange,
      step,
      topLabels,
      bottomLabels,
      helpText,
      ...props
    } = rawProps;
    const [validate, setValidate] = useState<boolean>(false);

    let errorMessages: string[] = [];
    if (props.record.tryValidation || validate) {
      errorMessages = isFieldValid<T>(
        props.record,
        props.field,
        props.validationRule,
      );
    }

    const handleChange = (value: number[]) => {
      runInAction(() => {
        if (isRange) {
          props.record[props.field as keyof T] = value[0] as T[keyof T];
          props.record[props.endField as keyof T] = value[1] as T[keyof T];
        } else {
          props.record[props.field as keyof T] = value[0] as T[keyof T];
        }

        if (validateOn == "change") {
          setValidate(true);
        }
        if (onRecordUpdate) onRecordUpdate(props.record);
      });
    };

    const onBlur = (event: FocusEvent<HTMLInputElement>) => {
      if (validateOn == "blur") {
        setValidate(true);
      }
      if (props.onBlur) {
        props.onBlur(event);
      }
    };

    if (props.errorMessages) {
      errorMessages = [...errorMessages, ...props.errorMessages];
    }

    const value = isRange
      ? [
          (props.record[props.field as keyof T] as unknown as number) ||
            min ||
            0,
          (props.record[props.endField as keyof T] as unknown as number) ||
            max ||
            0,
        ]
      : [(props.record[props.field as keyof T] as unknown as number) || 0];

    return (
      <FormFieldWrap
        {...props}
        className={className}
        variant={props.wrapVariant}
      >
        <div className="flex flex-col gap-y-3" data-slot="slider-container">
          {topLabels}
          <Slider
            min={min}
            max={max}
            step={step}
            value={value}
            onValueChange={handleChange}
            aria-label="Timeframe"
            onBlur={onBlur}
          />
          {bottomLabels}
        </div>
        {helpText ? <HelpText>{helpText}</HelpText> : null}

        {errorMessages && errorMessages?.length > 0 && (
          <ErrorMessages errorMessages={errorMessages} />
        )}
      </FormFieldWrap>
    );
  },
);
