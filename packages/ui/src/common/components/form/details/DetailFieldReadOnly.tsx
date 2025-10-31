import {
  TextInput,
  TextInputProps,
} from "@/ui/common/components/fields/TextInput";
import { observer } from "mobx-react-lite";
import { DetailFieldWrap } from "./DetailFieldWrap";
import { DetailFieldProps } from "./types";

interface DetailFieldReadOnlyProps<T>
  extends DetailFieldProps<T>,
    Omit<TextInputProps, "handleChange" | "value" | "errorMessages"> {}

// Define the component with correct generic syntax
const DetailFieldReadOnly = observer(
  <T extends object>(props: DetailFieldReadOnlyProps<T>) => {
    const value = props.displayField
      ? (props.record[props.displayField] as string)
      : (props.record[props.field] as string);

    // ignore types cause this is read only
    const record = props.record as any;
    return (
      <DetailFieldWrap {...props} value={value} readOnly={true} record={record}>
        {() => (
          <TextInput
            {...props}
            value={props.record[props.field] as string}
            handleChange={() => {}}
          />
        )}
      </DetailFieldWrap>
    );
  },
);

export default DetailFieldReadOnly;
