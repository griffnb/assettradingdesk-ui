import { RegistrationModel } from "@/models/models/registration/RegistrationModel";
import { Store } from "@/models/store/Store";
import type { BaseProps } from "@/models/types/base";
import { useEffect, useState } from "react";

const targetParams = ["gclid", "fbclid", "hopid"];

export const useRegistration = <T>(props: BaseProps<T>) => {
  const [registration, setRegistration] = useState<RegistrationModel | null>(
    null
  );

  useEffect(() => {
    if (!registration) {
      const cvars = props.cvars as object;
      const reg = Store.registration.create({
        geo: props.geo,
        tracking_values: props.trackingValues,
        ad_id: props.ad_id,
        lp_id: props.lp_id,
      });

      const sourceURL = new URL(window.location.href);
      sourceURL.searchParams.append("ad_id", reg.ad_id.toString());
      sourceURL.searchParams.append("lp_id", reg.lp_id.toString());
      sourceURL.searchParams.append("c_sk", props.trackingValues.c_sk || "");
      sourceURL.searchParams.append(
        "c_guid",
        props.trackingValues.c_guid || ""
      );
      reg.source_url = sourceURL.toString();

      const params = new URLSearchParams(window.location.search);

      params.forEach((value, key) => {
        if (
          key.toLowerCase().startsWith("utm_") ||
          targetParams.includes(key.toLowerCase())
        ) {
          reg.utms[key.toLowerCase()] = value;
        }
      });

      if (params.get("email")) {
        reg.email = params.get("email") || "";
      }

      if (params.get("first_name")) {
        reg.first_name = params.get("first_name") || "";
      }

      if (params.get("phone")) {
        reg.phone = params.get("phone") || "";
      }

      if (params.get("last_name")) {
        reg.last_name = params.get("last_name") || "";
      }

      if (
        "payload_values" in cvars &&
        cvars["payload_values"] &&
        cvars["payload_values"] !== ""
      ) {
        if (typeof cvars.payload_values === "string") {
          reg.payload_values = JSON.parse(cvars.payload_values);
        } else {
          reg.payload_values = JSON.parse(JSON.stringify(cvars.payload_values));
        }
      }

      if ("time_options" in cvars && typeof cvars.time_options === "string") {
        reg.time_options = cvars.time_options;
      }

      setRegistration(reg);
    }
  }, []);

  return { registration };
};
