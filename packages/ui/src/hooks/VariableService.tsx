import { makeAutoObservable } from "mobx";
import { CSSProperties } from "react";

class VariableServiceClass {
  private static instance: VariableServiceClass;

  variables: Record<string, string> = {};

  private constructor() {
    // Initialize your properties here
    makeAutoObservable(this, {
      //sample_method: action,
    });
  }

  addVariable(key: string, value: string) {
    this.variables[key] = value;
  }

  removeVariable(key: string) {
    delete this.variables[key];
  }

  getStyles(): CSSProperties {
    const style: CSSProperties = {};
    for (const [key, value] of Object.entries(this.variables)) {
      // @ts-expect-error using custom css variables
      style[`--${key}`] = value;
    }
    return style;
  }

  public static getInstance(): VariableServiceClass {
    if (!VariableServiceClass.instance) {
      VariableServiceClass.instance = new VariableServiceClass();
    }

    return VariableServiceClass.instance;
  }
}

// Export the single instance
export const VariableService = VariableServiceClass.getInstance();
