export type WebclassCvars = {
  header_image?: string;
  header_text?: string;
  mobile_header_text?: string;
  webinar_id: string;
  step1: "registration" | "choose_time";
  register_popup_button_label?: string;
  step1_type?: "modal" | "page";
  step1_title: string;
  step1_button_label: string;
  step1_button_variant?: "red" | "green";
  step1_button_shape?: "squared" | "rounded";
  step2: "registration" | "choose_time";
  step2_title: string;
  step2_button_label: string;
  step2_button_variant?: "red" | "green";
  step2_button_shape?: "squared" | "rounded";
  step2_type: "modal" | "page";
  choose_time_subtitle?: string;
  choose_time_footer?: string;
  thankyou_video_url: string;
  affiliate_image?: string;
  affiliate_name?: string;
  affiliate_subtext?: string;
  cta_button1?:string;
  cta_button2?:string;
  video_url?: string;
  file_url?: string;
  payload_values?: string;
  time_options?: string;
  body_1?: string;
  body_2?: string;
  thankyou_type?: "default" | "new";
};

export type MultiStepWebclassCvars = {
  header_image?: string;
  header_text?: string;
  mobile_header_text?: string;
  webinar_id: string;
  step1: "registration" | "choose_time" | "customize_experience" | "";
  step2: "registration" | "choose_time" | "customize_experience" | "";
  step3: "registration" | "choose_time" | "customize_experience" | "";
  customize_experience_title: string;
  customize_experience_subtitle: string;
  customize_experience_button1: string;
  customize_experience_button1_color?: "red" | "green";
  customize_experience_button1_shape?: "squared" | "rounded";
  customize_experience_button2: string;
  customize_experience_button2_color?: "red" | "green";
  customize_experience_button2_shape?: "squared" | "rounded";

  registration_title: string;
  registration_button_label: string;
  registration_button_variant?: "red" | "green";
  registration_button_shape?: "squared" | "rounded";

  choose_time_title: string;
  choose_time_button_label: string;
  choose_time_button_variant?: "red" | "green";
  choose_time_button_shape?: "squared" | "rounded";
  choose_time_subtitle?: string;
  choose_time_footer?: string;

  step2_type: "modal" | "page";
  step3_type: "modal" | "page";

  thankyou_video_url: string;
  affiliate_image?: string;
  affiliate_name?: string;
  affiliate_subtext?: string;

  payload_values?: string;
  time_options?: string;
  file_url?: string;
  thankyou_type?: "default" | "new";
}

export type LongRegistrationPageCvars = {
  cta_button_1_text: string;
  cta_button_1_url: string;
  cta_button_1_subtext?: string;
  cta_button_2_text: string;
  cta_button_2_url: string;
  cta_button_2_subtext?: string;
  cta_button_3_text?: string;
  cta_button_3_url?: string;
  cta_button_3_subtext?: string;
  cta_button_4_text?: string;
  cta_button_4_url?: string;
  cta_button_4_subtext?: string;
  cta_button_5_text?: string;
  cta_button_5_url?: string;
  cta_button_5_subtext?: string;
  section_1: string;
  section_2: string;
  section_3: string;
  section_4?: string;
  section_5?: string;
  section_6?: string;
  section_7?: string;
  section_8?: string;
  section_9?: string;
  section_10?: string;
  section_11?: string;
  section_12?: string;
  section_13?: string;
  section_14?: string;
  section_15?: string;
  section_16?: string;
  section_17?: string;
  section_18?: string;
  section_19?: string;
  section_20?: string;
  section_21?: string;
  section_22?: string;
  section_23?: string;
  section_24?: string;
  section_25?: string;
  section_26?: string;
  section_27?: string;
  section_28?: string;
  section_29?: string;
  section_30?: string;
  section_31?: string;
  section_32?: string;
  section_33?: string;
  section_34?: string;
}

export type MultipleButtonsCvars = {
  header_image?: string;
  header_text?: string;
  mobile_header_text?: string;
  title: string;
  subtitle: string;
  button1_text: string;
  button1_variant?: "red" | "green";
  button1_url: string;
  button2_text: string;
  button2_variant?: "red" | "green";
  button2_url: string;
  button3_text: string;
  button3_variant?: "red" | "green";
  button3_url: string;
  button4_text: string;
  button4_variant?: "red" | "green";
  button4_url: string;
}
