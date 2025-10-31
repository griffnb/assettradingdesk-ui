import { StoreModel } from "@/models/store/StoreModel";
import { isFieldValid, ValidationType } from "@/utils/validations";
import { runInAction } from "mobx";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { Tag, TagInputBase } from "../../fields/base/TagInputBase";
import { DetailFieldWrap } from "./DetailFieldWrap";
import { DetailFieldProps } from "./types";

interface DetailFieldTagInputProps<T extends StoreModel & ValidationType>
  extends DetailFieldProps<T> {}
const DetailFieldTagInput = observer(
  <T extends StoreModel & ValidationType>(
    props: DetailFieldTagInputProps<T>,
  ) => {
    const [validate, setValidate] = useState<boolean>(false);

    let errorMessages: string[] = [];
    if (props.record.tryValidation || validate) {
      errorMessages = isFieldValid<T>(
        props.record,
        props.field,
        props.validationRule,
      );
    }

    const handleChange = (value: Tag[]) => {
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
      <DetailFieldWrap {...props} value={value}>
        {({ append }) => (
          <TagInputBase
            tags={props.record[props.field] as Tag[]}
            placeholder={props.placeholder}
            handleChange={handleChange}
            errorMessages={errorMessages}
            append={append}
          />
        )}
      </DetailFieldWrap>
    );
  },
);

export default DetailFieldTagInput;
