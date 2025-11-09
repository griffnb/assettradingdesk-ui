import { FormFieldText } from "@/ui/common/components/form/fields/FormFieldText";
import { ValidationType } from "@/utils/validations";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { PasswordValidationField } from "./PasswordValidationField";

interface SetPasswordFieldsProps {
  record: ValidationType & {
    password: string;
    password_confirmation: string;
  };
  syncIsPasswordValid: (isPasswordValid: boolean) => void;
  showNew?: boolean;
}

export const SetPasswordFields = observer((props: SetPasswordFieldsProps) => {
  const { record } = props;
  if (!record) return;

  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [validationRules, setValidationRules] = useState({
    has_length: false,
    has_lower_and_upper: false,
    has_number: false,
    has_symbol: false,
    has_match: false,
  });

  useEffect(
    () => props.syncIsPasswordValid(isPasswordValid),
    [isPasswordValid],
  );

  useEffect(() => {
    const password = record.password;

    // Check for a minimum of 8 characters
    const hasMinLength = password.length >= 8;

    // Check for lowercase and uppercase letters
    const hasLowercase = /[a-z]/.test(password);
    const hasUppercase = /[A-Z]/.test(password);

    // Check for at least 1 number
    const hasNumber = /\d/.test(password);

    // Check for at least 1 symbol
    const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    const hasMatch =
      record.password === record.password_confirmation &&
      record.password !== "";

    setValidationRules({
      has_length: hasMinLength,
      has_lower_and_upper: hasLowercase && hasUppercase,
      has_number: hasNumber,
      has_symbol: hasSymbol,
      has_match: hasMatch,
    });
    if (
      hasMinLength &&
      hasLowercase &&
      hasUppercase &&
      hasNumber &&
      hasSymbol &&
      hasMatch
    ) {
      setIsPasswordValid(true);
    } else {
      setIsPasswordValid(false);
    }
  }, [record.password, record.password_confirmation]);

  return (
    <div className={"w-full items-start space-y-2"}>
      <FormFieldText
        type={showNew ? "text" : "password"}
        record={record}
        field="password"
        label={`${props.showNew ? "New " : ""}Password`}
        autoComplete="new-password"
        append={
          <i
            onClick={() => setShowNew(!showNew)}
            className={`u cursor-pointer ${showNew ? "u-eye-off" : "u-eye"} text-text-neutral-secondary`}
          />
        }
        required={true}
      />
      <div className="inline-flex h-[92px] flex-col items-start justify-start gap-1">
        <PasswordValidationField
          variant={
            record.password === ""
              ? "empty"
              : validationRules.has_length
                ? "valid"
                : "invalid"
          }
          label="Minimum 8 characters"
        />
        <PasswordValidationField
          variant={
            record.password === ""
              ? "empty"
              : validationRules.has_lower_and_upper
                ? "valid"
                : "invalid"
          }
          label="Lower and uppercase letters"
        />
        <PasswordValidationField
          variant={
            record.password === ""
              ? "empty"
              : validationRules.has_number
                ? "valid"
                : "invalid"
          }
          label="At least 1 number"
        />
        <PasswordValidationField
          variant={
            record.password === ""
              ? "empty"
              : validationRules.has_symbol
                ? "valid"
                : "invalid"
          }
          label="At least 1 symbol"
        />
      </div>
      <FormFieldText
        type={showConfirm ? "text" : "password"}
        record={record}
        field="password_confirmation"
        label={`Confirm ${props.showNew ? "New " : ""}Password`}
        autoComplete="new-password"
        append={
          <i
            onClick={() => setShowConfirm(!showConfirm)}
            className={`u cursor-pointer ${showConfirm ? "u-eye-off" : "u-eye"} text-text-neutral-secondary`}
          />
        }
        required={true}
      />
      <PasswordValidationField
        variant={
          record.password === "" || record.password_confirmation === ""
            ? "empty"
            : validationRules.has_match
              ? "valid"
              : "invalid"
        }
        label="Passwords must match"
      />
    </div>
  );
});
