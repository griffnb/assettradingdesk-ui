import isEmpty from "./empty";

export type ValidationType = {
  validationRules: ValidationRules;
  tryValidation: boolean;
};

export class ValidationClass {
  validationRules: ValidationRules = {};
  tryValidation = false;
}

export type ValidationRule = {
  required?: {
    message: string;
  };
  min_length?: {
    setting: number; // This is the required value
    message: string;
  };
  max_length?: {
    setting: number; // This is the required value
    message: string;
  };
  substituted_max_length?: {
    setting: number; // This is the required value
    message: string;
  };
  min_value?: {
    setting: number; // This is the required value
    message: string;
  };
  max_value?: {
    setting: number; // This is the required value
    message: string;
  };
  numbers_only?: {
    message: string;
  };
  numeric?: {
    message: string;
  };
  non_numeric?: {
    message: string;
  };
  email?: {
    message: string;
  };
  phone?: {
    message: string;
  };
  url?: {
    message: string;
  };
  custom?: {
    validate: (value: unknown, record: any) => string | null;
  };
};

export type ValidationRules = {
  [key: string]: ValidationRule;
};

// Seperate typing here for validation, if it was on regular validation rules it creates a circular dependency and forces pushing around types too far
export type ValidationRulesType<T> = {
  [K in keyof T]?: ValidationRule;
};

export function isFieldRequired<T extends ValidationType>(
  obj: T,
  field: keyof T & string
) {
  const objectRules = obj.validationRules;
  if (isEmpty(objectRules) || isEmpty(objectRules[field])) {
    return false;
  }

  const fieldRules = objectRules[field];
  if (fieldRules && fieldRules.required) {
    return true;
  }

  return false;
}

export function isFieldValid<T extends ValidationType>(
  obj: T,
  field: keyof T,
  customRule?: ValidationRule
): string[] {
  const objectRules = obj.validationRules;
  const theErrors: string[] = [];

  let fieldRules: ValidationRule | undefined;
  if (customRule) {
    fieldRules = customRule;
  } else {
    if (isEmpty(objectRules) || isEmpty(objectRules[field])) {
      return [];
    }
    fieldRules = objectRules[field as string];
  }

  for (const ruleType in fieldRules) {
    const rule = fieldRules[ruleType as keyof typeof fieldRules];
    if (!rule) continue;

    if (ruleType === "custom") {
      // @ts-expect-error - This is a custom rule
      const msg = validateCustomRule(obj[field], rule.validate, obj);
      if (msg) {
        theErrors.push(msg);
      }
      continue;
    }

    let validationValue;
    if ("setting" in rule) {
      validationValue = rule.setting;
    }
    if (!validateRule(ruleType, validationValue, obj[field])) {
      // @ts-expect-error - This is is normal cept for custom rule which is caught above
      theErrors.push(rule.message);
    }
  }

  return theErrors;
}

export function isObjectValid<T extends ValidationType>(
  obj: T,
  checkOnly?: boolean
): string[] {
  //Try validation if i ask if its valid unless im checking only, otherwise it will force errors on fields
  if (!checkOnly) {
    obj.tryValidation = true;
  }
  const objectRules = obj.validationRules;
  const theErrors: string[] = [];
  for (const field in objectRules) {
    isFieldValid(obj, field as keyof T & string).forEach((error) => {
      theErrors.push(error);
    });
  }

  return theErrors;
}

export function validateCustomRule<T extends ValidationType>(
  field_value: any | undefined,
  ruleFunction: (value: string, record: T) => string | null,
  obj: T
) {
  return ruleFunction(field_value, obj);
}

export function validateRule(
  rule: string,
  rule_value: any | undefined,
  field_value: any
) {
  let valid = true;

  if (typeof field_value !== "undefined") {
    switch (rule) {
      case "required":
        if (!field_value || field_value.length == 0) {
          valid = false;
        }

        break;
      case "min_length":
        if (!field_value || field_value.length < parseInt(rule_value)) {
          valid = false;
        }
        break;
      case "max_length":
        if (!field_value || field_value.length > parseInt(rule_value)) {
          valid = false;
        }
        break;
      case "substituted_max_length": {
        const subVal = field_value.replace(/\{(.*?)\}/, "");
        if (subVal.length > parseInt(rule_value)) {
          valid = false;
        }
        break;
      }
      case "min_value":
        if (!field_value || field_value < rule_value) {
          valid = false;
        }
        break;
      case "max_value":
        if (!field_value || field_value > rule_value) {
          valid = false;
        }
        break;
      case "numeric":
        {
          let tmp = false;

          if (!isNaN(parseFloat(field_value)) && isFinite(field_value)) {
            tmp = true;
          }

          if (rule_value && !tmp) {
            valid = false;
          } else if (!rule_value && tmp) {
            valid = false;
          }
        }
        break;
      case "numbers_only": {
        // Check if the field_value is a string and contains only digits like zip codes
        // If the string contains only digits, tmp will be true
        const tmp = /^[0-9]+$/.test(field_value);
        valid = tmp;
        break;
      }
      case "non_numeric":
        {
          let tmp = false;

          // Check if the field_value contains any numeric characters
          if (typeof field_value === "string") {
            // If the string contains any digit, tmp will be true
            tmp = /\d/.test(field_value);
          } else if (typeof field_value === "number") {
            tmp = true;
          } else if (field_value === null || field_value === undefined) {
            tmp = false;
          }

          if (rule_value && !tmp) {
            valid = false;
          } else if (!rule_value && tmp) {
            valid = false;
          }
        }
        break;
      case "email":
        valid = isValidEmail(field_value);
        break;
      case "phone":
        {
          const re = /^(\+?1-?)?\(?\d{3}\)?-?\d{3}-?\d{4}$/;
          valid = re.test(field_value);
        }
        break;
      case "url": {
        const re =
          /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!$&'()*+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!$&'()*+,;=]|:|@|\{[\w]+?\})+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!$&'()*+,;=]|:|@|\{[\w]+?\})*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!$&'()*+,;=]|:|@|\{[\w]+?\})|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!$&'()*+,;=]|:|@|\{[\w]+?\})|\/|\?)*)?$/i;
        valid = re.test(field_value);
        break;
      }

      default:
        console.log("validateRule: Invalid validation rule", rule);
        break;
    }

    return valid;
  } else {
    return false;
  }
}

export function isValidEmail(value: string) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(value);
}
