import { Store } from "@/models/store/Store";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { BreadcrumbService } from "@/ui/admin/nav/BreadcrumbService";
import { BillingPlanModel } from "@/models/models/billing_plan/model/BillingPlanModel";
import { DetailFieldContainer } from "@/ui/common/components/form/details/DetailFieldContainer";
import { DetailFieldText } from "@/ui/common/components/form/details/DetailFieldText";
import { DetailFieldSelect } from "@/ui/common/components/form/details/DetailFieldSelect";
import { DetailFieldCheckbox } from "@/ui/common/components/form/details/DetailFieldCheckbox";
import { DetailFieldReadOnly } from "@/ui/common/components/form/details/DetailFieldReadOnly";
import { constants } from "@/models/models/billing_plan/constants";
import { Properties } from "@/models/models/billing_plan/model/Properties";
import { SafeBaseModel } from "@/models/BaseModel";

export const BillingPlanDetails = observer(function BillingPlanDetails() {
  const [record, setRecord] = useState<BillingPlanModel | null>(null);
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    if (!id) return;
    Store.billing_plan.get(id as string).then(
      (rec) => {
        if(!rec.data) return;
        setRecord(rec.data);
      },
    );
  }, [id]);

  useEffect(() => {
    if (!record) return;
    BreadcrumbService.setSegments([
      { label: "Home", href: "/" },
      { label: "Billing Plans", href: "/billing_plans" },
      { label: record.label },
    ]);
  }, [record]);

  if (!record) return null;


  return (
    <>
      <DetailFieldContainer>
        <DetailFieldText
          record={record}
          field="name"
          label="Name"
          placeholder="Enter plan name"
        />

        <DetailFieldText
          record={record}
          field="internal_name"
          label="Internal Name"
          placeholder="Enter internal name"
        />
      </DetailFieldContainer>

      <DetailFieldContainer>
        <DetailFieldText
          record={record}
          field="price"
          label="Price"
          placeholder="0.00"
        />

        <DetailFieldSelect
          record={record}
          field="billing_cycle"
          label="Billing Cycle"
          options={constants.billing_cycle}
          displayField="billingCycleLabel"
        />
      </DetailFieldContainer>

      <DetailFieldContainer>
        <DetailFieldText
          record={record}
          field="level"
          label="Level"
          placeholder="Enter level"
        />

        <DetailFieldCheckbox
          record={record}
          field="is_default"
          label="Is Default"
        />
      </DetailFieldContainer>

      <DetailFieldContainer>
        <DetailFieldText
          record={record.properties as SafeBaseModel<Properties>}
          parentRecord={record}
          field="stripe_price_id"
          label="Stripe Price ID"
          placeholder="price_xxxxxxxxxxxxx"
        />

        <DetailFieldText
          record={record.properties as SafeBaseModel<Properties>}
          parentRecord={record}
          field="pricing_text"
          label="Pricing Text"
          placeholder="$99/month"
        />
      </DetailFieldContainer>

      <DetailFieldContainer>
        <DetailFieldText
          record={record.properties as SafeBaseModel<Properties>}
          parentRecord={record}
          field="default_discount_code"
          label="Default Discount Code"
          placeholder="SAVE20"
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
