import { IFilter } from "@/ui/common/components/types/filters";
import { constants as subscriptionConstants } from "@/models/models/subscription/constants";
import { constants as billingPlanConstants } from "@/models/models/billing_plan/constants";

export const filters: IFilter[] = [
  {
    placeholder: "Subscription ID",
    type: "text",
    field: "q:subscription_id",
  },
  {
    placeholder: "Price or Plan ID",
    type: "text",
    field: "q:price_or_plan_id",
  },
  {
    placeholder: "Coupon Code",
    type: "text",
    field: "q:coupon_code",
  },
  {
    type: "gap",
    placeholder: "",
    label: "Relationships",
    field: "",
  },
  {
    placeholder: "Organization",
    type: "model-search-multi-select",
    field: "organization_id",
    modelName: "organization",
    modelDisplayField: "label",
    modelSearchFilters: { disabled: "0" },
    modelSearchParam: "q",
  },
  {
    placeholder: "Billing Plan",
    type: "model-search-multi-select",
    field: "billing_plan_id",
    modelName: "billing_plan",
    modelDisplayField: "label",
    modelSearchParam: "q",
  },
  {
    type: "gap",
    placeholder: "",
    label: "Billing Details",
    field: "",
  },
  {
    placeholder: "Billing Provider",
    type: "multi-select",
    field: "billing_provider",
    options: subscriptionConstants.billing_provider,
  },
  {
    placeholder: "Billing Cycle",
    type: "multi-select",
    field: "billing_cycle",
    options: billingPlanConstants.billing_cycle,
  },
  {
    placeholder: "Level",
    type: "number",
    field: "level",
  },
  {
    type: "gap",
    placeholder: "",
    label: "Amount Range",
    field: "",
  },
  {
    placeholder: "Min Amount",
    type: "number",
    field: "gt:amount",
  },
  {
    placeholder: "Max Amount",
    type: "number",
    field: "lt:amount",
  },
  {
    type: "gap",
    placeholder: "",
    label: "Date Ranges",
    field: "",
  },
  {
    placeholder: "Start Date",
    type: "date-range",
    field: "between:start_ts",
    format: "YYYY-MM-DD",
  },
  {
    placeholder: "End Date",
    type: "date-range",
    field: "between:end_ts",
    format: "YYYY-MM-DD",
  },
  {
    placeholder: "Next Billing Date",
    type: "date-range",
    field: "between:next_billing_ts",
    format: "YYYY-MM-DD",
  },
  {
    placeholder: "Created Date",
    type: "date-range",
    field: "between:created_at",
    format: "YYYY-MM-DD",
  },
  {
    placeholder: "Updated Date",
    type: "date-range",
    field: "between:updated_at",
    format: "YYYY-MM-DD",
  },
];
