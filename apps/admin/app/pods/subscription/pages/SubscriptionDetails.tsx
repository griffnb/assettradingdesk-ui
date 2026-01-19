import { Store } from "@/models/store/Store";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { AdminTitleBar } from "@/ui/admin/nav/AdminTitleBar";
import { SubscriptionModel } from "@/models/models/subscription/model/SubscriptionModel";
import { DetailFieldContainer } from "@/ui/common/components/form/details/DetailFieldContainer";
import { DetailFieldText } from "@/ui/common/components/form/details/DetailFieldText";
import { DetailFieldSelect } from "@/ui/common/components/form/details/DetailFieldSelect";
import { DetailFieldReadOnly } from "@/ui/common/components/form/details/DetailFieldReadOnly";
import { DetailFieldModelSearchSelect } from "@/ui/common/components/form/details/DetailFieldModelSearchSelect";
import { constants as subscriptionConstants } from "@/models/models/subscription/constants";
import { constants as billingPlanConstants } from "@/models/models/billing_plan/constants";
import { OrganizationModel } from "@/models/models/organization/model/OrganizationModel";
import { BillingPlanModel } from "@/models/models/billing_plan/model/BillingPlanModel";
import { BillingInfo } from "@/models/models/subscription/model/BillingInfo";
import { MetaData } from "@/models/models/subscription/model/MetaData";
import { SafeBaseModel } from "@/models/BaseModel";

export const SubscriptionDetails = observer(function SubscriptionDetails() {
  const [record, setRecord] = useState<SubscriptionModel | null>(null);
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    if (!id) return;
    Store.subscription.get(id as string).then(
      (rec) => {
        if(!rec.data) return;
        setRecord(rec.data);
      },
    );
  }, [id]);

  if (!record) return null;

  return (
    <>
      <AdminTitleBar
        objectURN={record.urn}
        title="Subscription" />

      <DetailFieldContainer>
        <DetailFieldReadOnly
          record={record}
          field="subscription_id"
          label="Subscription ID"
        />

        <DetailFieldText
          record={record}
          field="price_or_plan_id"
          label="Price or Plan ID"
          placeholder="Enter price or plan ID"
        />
      </DetailFieldContainer>

      <DetailFieldContainer>
        <DetailFieldModelSearchSelect<SubscriptionModel, OrganizationModel>
          record={record}
          displayField="organization_name"
          field="organization_id"
          label="Organization"
          placeholder="Select Organization"
          modelName="organization"
          modelSearchParam="q"
          modelDisplayField="label"
          modelSearchFilters={{ disabled: "0" }}
          reloadOnSave={true}
        />

        <DetailFieldModelSearchSelect<SubscriptionModel, BillingPlanModel>
          record={record}
          displayField="billing_plan_name"
          field="billing_plan_id"
          label="Billing Plan"
          placeholder="Select Billing Plan"
          modelName="billing_plan"
          modelSearchParam="q"
          modelDisplayField="label"
          reloadOnSave={true}
        />
      </DetailFieldContainer>

      <DetailFieldContainer>
        <DetailFieldSelect
          record={record}
          field="billing_provider"
          label="Billing Provider"
          options={subscriptionConstants.billing_provider}
          displayField="billingProviderLabel"
        />

        <DetailFieldSelect
          record={record}
          field="billing_cycle"
          label="Billing Cycle"
          options={billingPlanConstants.billing_cycle}
          displayField="billingCycleLabel"
        />
      </DetailFieldContainer>

      <DetailFieldContainer>
        <DetailFieldText
          record={record}
          field="amount"
          label="Amount"
          placeholder="0.00"
        />

        <DetailFieldText
          record={record}
          field="level"
          label="Level"
          placeholder="Enter level"
        />
      </DetailFieldContainer>

      <DetailFieldContainer>
        <DetailFieldText
          record={record}
          field="coupon_code"
          label="Coupon Code"
          placeholder="Enter coupon code"
        />
      </DetailFieldContainer>

      <DetailFieldContainer>
        <DetailFieldReadOnly
          record={record}
          field="start_ts"
          label="Start Date"
        />

        <DetailFieldReadOnly
          record={record}
          field="end_ts"
          label="End Date"
        />
      </DetailFieldContainer>

      <DetailFieldContainer>
        <DetailFieldReadOnly
          record={record}
          field="next_billing_ts"
          label="Next Billing Date"
        />
      </DetailFieldContainer>

      <DetailFieldContainer>
        <DetailFieldText
          record={record.billing_info as SafeBaseModel<BillingInfo>}
          parentRecord={record}
          field="card_type"
          label="Card Type"
          placeholder="Visa, Mastercard, etc."
        />

        <DetailFieldText
          record={record.billing_info as SafeBaseModel<BillingInfo>}
          parentRecord={record}
          field="card_last4"
          label="Card Last 4"
          placeholder="Last 4 digits"
        />
      </DetailFieldContainer>

      <DetailFieldContainer>
        <DetailFieldText
          record={record.billing_info as SafeBaseModel<BillingInfo>}
          parentRecord={record}
          field="card_exp_month"
          label="Card Exp Month"
          placeholder="MM"
        />

        <DetailFieldText
          record={record.billing_info as SafeBaseModel<BillingInfo>}
          parentRecord={record}
          field="card_exp_year"
          label="Card Exp Year"
          placeholder="YYYY"
        />
      </DetailFieldContainer>

      <DetailFieldContainer>
        <DetailFieldText
          record={record.billing_info as SafeBaseModel<BillingInfo>}
          parentRecord={record}
          field="card_address1"
          label="Billing Address 1"
          placeholder="Street address"
        />

        <DetailFieldText
          record={record.billing_info as SafeBaseModel<BillingInfo>}
          parentRecord={record}
          field="card_address2"
          label="Billing Address 2"
          placeholder="Apt, suite, etc."
        />
      </DetailFieldContainer>

      <DetailFieldContainer>
        <DetailFieldText
          record={record.billing_info as SafeBaseModel<BillingInfo>}
          parentRecord={record}
          field="card_city"
          label="City"
          placeholder="City"
        />

        <DetailFieldText
          record={record.billing_info as SafeBaseModel<BillingInfo>}
          parentRecord={record}
          field="card_state"
          label="State"
          placeholder="State"
        />
      </DetailFieldContainer>

      <DetailFieldContainer>
        <DetailFieldText
          record={record.billing_info as SafeBaseModel<BillingInfo>}
          parentRecord={record}
          field="card_zip"
          label="ZIP Code"
          placeholder="ZIP Code"
        />

        <DetailFieldText
          record={record.billing_info as SafeBaseModel<BillingInfo>}
          parentRecord={record}
          field="card_country"
          label="Country"
          placeholder="Country"
        />
      </DetailFieldContainer>

      <DetailFieldContainer>
        <DetailFieldText
          record={record.meta_data as SafeBaseModel<MetaData>}
          parentRecord={record}
          field="stripe_discount_id"
          label="Stripe Discount ID"
          placeholder="Stripe Discount ID"
        />
      </DetailFieldContainer>

      <DetailFieldContainer>
        <DetailFieldReadOnly
          record={record}
          field="created_by_name"
          label="Created By"
        />

        <DetailFieldReadOnly
          record={record}
          field="updated_by_name"
          label="Updated By"
        />
      </DetailFieldContainer>

      <DetailFieldContainer>
        <DetailFieldReadOnly
          record={record}
          field="created_at"
          label="Created At"
        />

        <DetailFieldReadOnly
          record={record}
          field="updated_at"
          label="Updated At"
        />
      </DetailFieldContainer>
    </>
  );
});
