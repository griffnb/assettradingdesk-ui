
export interface INumberConstant {
  id: number;
  label: string;
  longLabel?: string;
  helpText?: string;
  value?: string | number;
  icon?: string;
  textColor?: string;
  
  bgColor?: string;
  hidden?: boolean;
  aliases?: string[];
}

export interface IStringConstant {
  id: string;
  label: string;
  longLabel?: string;
  helpText?: string;
  value?: string | number;
  icon?: string;
  textColor?: string;
  bgColor?: string;
  
  hidden?: boolean;
  aliases?: string[];
}

export type IConstant = INumberConstant | IStringConstant;

export interface Status {
  id: number;
  label: string;
  helpText?: string;
  class: string;
  skipFilter?: boolean;
  
  short?: string; // Optional short label for display purposes
  icon?: string;
  hidden?: boolean;
}
