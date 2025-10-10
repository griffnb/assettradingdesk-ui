import getMergedValues from "@/utils/defaultVariables";
import { getPublicEnvVar } from "@/utils/env";
import type { WebclassCvars } from "../../types/cvars";

export function flowDefaults(cvars: Partial<WebclassCvars>) {
  let defaultCvars: WebclassCvars;

  switch (getPublicEnvVar("PUBLIC_ENVIRONMENT")) {
    case "production":
      defaultCvars = {
        webinar_id: "167",
        step1: "registration",
        step1_title: "Register Now",
        step1_button_label: "Register For Free",
        step1_button_variant: "red",
        step1_button_shape: "squared",
        step2: "choose_time",
        step2_title: "Choose Time",
        step2_button_label: "Complete Registration",
        step2_button_shape: "rounded",
        step2_type: "modal",
        step2_button_variant: "green",
        choose_time_subtitle: "",
        choose_time_footer: "",
        thankyou_video_url:
          "https://player.vimeo.com/video/819688674?badge=0&autopause=0&quality_selector=0&player_id=0&app_id=58479&autoplay=1",
        payload_values: `{
          "page_type": "standard",
          "page_niche": "standard"
        }`,
        time_options: "",
      };
      break;
    default:
      defaultCvars = {
        webinar_id: "167",
        step1: "registration",
        step1_title: "Register Now",
        step1_button_label: "Register For Free",
        step1_button_variant: "red",
        step1_button_shape: "squared",
        step2: "choose_time",
        step2_title: "Choose Time",
        step2_button_label: "Complete Registration",
        step2_button_shape: "rounded",
        step2_type: "modal",
        step2_button_variant: "green",
        choose_time_subtitle: "",
        choose_time_footer: "",
        thankyou_video_url:
          "https://player.vimeo.com/video/819688674?badge=0&autopause=0&quality_selector=0&player_id=0&app_id=58479&autoplay=1",
        payload_values: `{
          "page_type": "standard",
          "page_niche": "standard"
        }`,
        time_options: "",
      };
      break;
  }

  const mergedValues = getMergedValues<Partial<WebclassCvars>>(cvars, defaultCvars);

  return mergedValues;
}
