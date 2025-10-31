import { StoreModel } from "@/models/store/StoreModel";
import { isFieldValid, ValidationType } from "@/utils/validations";
import { runInAction } from "mobx";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { Button } from "../../buttons/Button";
import { ArrayInput, ArrayInputProps } from "../../fields/ArrayInput";
import { DetailFieldWrap } from "./DetailFieldWrap";
import { DetailFieldProps } from "./types";

interface DetailFieldArrayProps<T extends StoreModel & ValidationType>
  extends DetailFieldProps<T>,
    Omit<ArrayInputProps, "values" | "onUpdate" | "append" | "errorMessages"> {}

// Define the component with correct generic syntax
export const DetailFieldArray = observer(function DetailFieldArray<
  T extends StoreModel & ValidationType,
>(props: DetailFieldArrayProps<T>) {
  const [validate, setValidate] = useState<boolean>(false);

  let errorMessages: string[] = [];
  if (props.record.tryValidation || validate) {
    errorMessages = isFieldValid<T>(
      props.record,
      props.field,
      props.validationRule,
    );
  }

  const handleChange = (value: any[]) => {
    runInAction(() => {
      const key = props.field as keyof T;
      props.record[key] = value as T[keyof T];
      setValidate(true);
    });
  };

  const values = props.record[props.field] as any[];

  return (
    <DetailFieldWrap
      {...props}
      value={""}
      labelClassName="flex flex-row items-center"
      labelButton={({ isEditing, setIsEditing, handleCancel, handleSave }) => (
        <>
          {!isEditing ? (
            <Button
              variant={"tertiary"}
              className="ml-auto"
              onClick={() => setIsEditing(true)}
            >
              <i className="fa fa-pencil"></i>
            </Button>
          ) : (
            <div className="ml-auto flex flex-row items-center gap-x-4 self-stretch">
              <Button variant={"tertiary"} onClick={handleCancel}>
                Cancel
              </Button>
              <Button variant={"primary"} onClick={handleSave}>
                Save
              </Button>
            </div>
          )}
        </>
      )}
      render={() => (
        <div className="flex flex-col items-start gap-y-2 self-stretch border-y border-gray-200 py-2">
          {values &&
            values.length > 0 &&
            values.map((value, index) => (
              <div
                className="self-stretch rounded-lg border bg-white px-3 py-1"
                key={index}
              >
                {value}
              </div>
            ))}
        </div>
      )}
    >
      {() => (
        <div className="py-3">
          <ArrayInput
            {...props}
            values={props.record[props.field] as any[]}
            onUpdate={handleChange}
            errorMessages={errorMessages}
          />
        </div>
      )}
    </DetailFieldWrap>
  );
});
