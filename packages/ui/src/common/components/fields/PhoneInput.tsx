import {
  formatPhone,
  standardizePhoneNumber,
  toE164,
} from "@/utils/phone/en_US";
import { observer } from "mobx-react-lite";
import { TextInput, TextInputProps } from "./TextInput";

export interface PhoneInputProps extends Omit<TextInputProps, "handleChange"> {
  format?: string;
  handleChange: (value: string) => void;
}

export const PhoneInput = observer((props: PhoneInputProps) => {
  const { handleChange, value, ...rest } = props;

  const phoneChange = (value: string) => {
    const standardPhone = standardizePhoneNumber(value);
    if (standardPhone.length > 10) {
      return;
    }

    if (standardPhone.length === 10) {
      handleChange(toE164(value));
    } else {
      handleChange(standardPhone);
    }
  };

  return (
    <TextInput
      {...rest}
      handleChange={phoneChange}
      value={formatPhone(value?.toString()) || ""}
      type="tel"
      pattern="^\([0-9]{3}\) [0-9]{3}-[0-9]{4}$"
      onBlur={props.onBlur}
    />
  );
});
