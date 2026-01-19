import { describe, expect, it } from "vitest";
import { isFieldValid } from "./validations";

class TestModel {
  validationRules: any;
  tryValidation: boolean = true;
  name: string = "";
  email: string = "";
  age: any;
  website: string = "";
  password: string = "";
}

describe("isFieldValid", () => {
  it("should return an empty array if validation rules are empty", () => {
    const model = new TestModel();
    model.validationRules = {};

    const errors = isFieldValid(model, "name");

    expect(errors).toEqual([]);
  });

  it("should return an empty array if field value passes all validation rules", () => {
    const model = new TestModel();
    model.validationRules = {
      name: {
        required: {
          message: "Name is required",
        },
        minLength: {
          setting: 3,
          message: "Name should have at least 3 characters",
        },
      },
    };
    model.name = "John";

    const errors = isFieldValid(model, "name");

    expect(errors).toEqual([]);
  });

  it("should return an array of error messages if field value fails validation rules", () => {
    const model = new TestModel();
    model.validationRules = {
      name: {
        required: {
          message: "Name is required",
        },
        min_length: {
          setting: 3,
          message: "Name should have at least 3 characters",
        },
      },
    };
    model.name = "";
    const errors = isFieldValid(model, "name");

    expect(errors).toEqual([
      "Name is required",
      "Name should have at least 3 characters",
    ]);
  });

  it("should return an array of error messages if field value is not numeric", () => {
    const model = new TestModel();
    model.validationRules = {
      age: {
        numeric: {
          setting: true,
          message: "Age must be a numeric value",
        },
      },
    };
    model.age = "twenty";

    const errors = isFieldValid(model, "age");

    expect(errors).toEqual(["Age must be a numeric value"]);
  });

  it("should return an array of error messages if field value is not a valid email", () => {
    const model = new TestModel();
    model.validationRules = {
      email: {
        email: {
          message: "Invalid email format",
        },
      },
    };
    model.email = "john@example";

    const errors = isFieldValid(model, "email");

    expect(errors).toEqual(["Invalid email format"]);
  });

  it("should return an array of error messages if field value is not a valid URL", () => {
    const model = new TestModel();
    model.validationRules = {
      website: {
        url: {
          message: "Invalid URL format",
        },
      },
    };
    model.website = "example.com";

    const errors = isFieldValid(model, "website");

    expect(errors).toEqual(["Invalid URL format"]);
  });

  it("should return an array of error messages if field value fails custom validation rule", () => {
    const model = new TestModel();
    model.validationRules = {
      password: {
        custom: {
          validate: (value: string) => {
            if (value.length < 8) {
              return "Password must be at least 8 characters long";
            }
            return null;
          },
        },
      },
    };
    model.password = "1234567";

    const errors = isFieldValid(model, "password");

    expect(errors).toEqual(["Password must be at least 8 characters long"]);
  });

  // Add more test cases as needed
});
