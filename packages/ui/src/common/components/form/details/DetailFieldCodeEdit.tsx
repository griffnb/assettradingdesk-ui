import { StoreModel } from "@/models/store/StoreModel";
import { isFieldValid, ValidationType } from "@/utils/validations";
import { runInAction } from "mobx";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { ErrorMessages } from "../../fields/base/ErrorMessages";
import CodeEdit, { CodeEditProps } from "../CodeEdit";
import { DetailFieldWrap } from "./DetailFieldWrap";
import { DetailFieldProps } from "./types";

interface DetailFieldCodeEditProps<T extends StoreModel & ValidationType>
  extends DetailFieldProps<T>,
    Omit<CodeEditProps, "value" | "onChange"> {
  prependVal?: string;
}

// Define the component with correct generic syntax
export const DetailFieldCodeEdit = observer(function DetailFieldCodeEdit<
  T extends StoreModel & ValidationType,
>(props: DetailFieldCodeEditProps<T>) {
  const [validate, setValidate] = useState<boolean>(false);

  let errorMessages: string[] = [];
  if (props.record.tryValidation || validate) {
    errorMessages = isFieldValid<T>(
      props.record,
      props.field,
      props.validationRule,
    );
  }

  const handleChange = (value: string) => {
    runInAction(() => {
      const key = props.field as keyof T;
      props.record[key] = value as T[keyof T];
      setValidate(true);
    });
  };

  const value = props.displayField
    ? (props.record[props.displayField] as string)
    : (props.record[props.field] as string);

  return (
    <DetailFieldWrap
      {...props}
      value={value}
      render={(detailFieldProps, setIsEditing) => (
        <>
          <CodeEdit
            {...props}
            value={props.record[props.field] as string}
            onChange={handleChange}
            readOnly={true}
            append={
              <div className="contents" data-nowrap={true}>
                <button
                  type="button"
                  className="relative inline-flex items-center rounded-r-md border-l px-4 py-3 align-bottom text-sm font-semibold text-gray-900 hover:bg-gray-50"
                  onClick={() => setIsEditing(true)}
                >
                  <i className="fa fa-pencil"></i>
                </button>
              </div>
            }
          />
          {errorMessages.length > 0 && (
            <ErrorMessages errorMessages={errorMessages} />
          )}
        </>
      )}
    >
      {({ append }) => (
        <>
          <CodeEdit
            {...props}
            value={props.record[props.field] as string}
            onChange={handleChange}
            append={append}
          />
          {errorMessages.length > 0 && (
            <ErrorMessages errorMessages={errorMessages} />
          )}
        </>
      )}
    </DetailFieldWrap>
  );
});
