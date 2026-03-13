import { isObjectValid } from "@/common_lib/utils/validations";
import { constants } from "@/models/constants";
import { BillingPlanModel } from "@/models/models/billing_plan/model/BillingPlanModel";
import { FormFieldCheckbox } from "@/ui/common/components/form/fields/FormFieldCheckbox";
import { FormFieldSelect } from "@/ui/common/components/form/fields/FormFieldSelect";
import { FormFieldText } from "@/ui/common/components/form/fields/FormFieldText";
import { FormWrap } from "@/ui/common/components/form/wrap/FormWrap";
import { runInAction } from "mobx";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router";

interface BillingPlanFormProps {
  record: BillingPlanModel;
  onSuccess?: (record: BillingPlanModel) => void;
  onCancel?: () => void;
}

export const BillingPlanForm = observer(function BillingPlanForm(
  props: BillingPlanFormProps,
) {
  const nav = useNavigate();

  const saveAction = async () => {
    runInAction(async () => {
      const messages = isObjectValid<BillingPlanModel>(props.record);
      if (messages.length > 0) {
        console.log(messages);
        return false;
      }
      const resp = await props.record.save();

      if (resp.success) {
        if (props.onSuccess) {
          props.onSuccess(props.record);
        } else {
          if (window.history.length > 1) {
            nav(-1);
          } else {
            nav("/billing_plans"); // default fallback
          }
        }
      }
    });
  };

  const cancelAction = () => {
    props.record.rollback();
    if (props.onCancel) {
      props.onCancel();
    } else {
      if (window.history.length > 1) {
        nav(-1);
      } else {
        nav("/billing_plans"); // default fallback
      }
    }
  };

  return (
    <FormWrap
      saveAction={saveAction}
      saveLabel="Save"
      showCancel={true}
      cancelLabel="Cancel"
      cancelAction={cancelAction}
    >
      <FormFieldText
        record={props.record}
        field="name"
        type="text"
        label="Name"
        placeholder="Name"
      />

      <FormFieldText
        record={props.record}
        field="internal_name"
        type="text"
        label="Internal Name"
        placeholder="Internal Name"
      />

      <FormFieldText
        record={props.record}
        field="price"
        label="Price"
        placeholder="0.00"
        type="number"
      />

      <FormFieldText
        record={props.record}
        field="level"
        label="Level"
        placeholder="0"
        type="number"
      />

      <FormFieldCheckbox
        record={props.record}
        field="is_default"
        label="Is Default"
      />

      <FormFieldSelect
        record={props.record}
        field="billing_cycle"
        label="Billing Cycle"
        options={constants.billing_plan.billing_cycle}
      />

      <div className="mt-4 flex flex-col self-stretch border-t pt-4">
        <h3 className="mb-4 text-lg font-semibold">Properties</h3>

        <FormFieldText
          record={props.record.properties}
          field="stripe_price_id"
          type="text"
          label="Stripe Price ID"
          placeholder="price_xxxxxxxxxxxxx"
        />

        <FormFieldText
          record={props.record.properties}
          field="pricing_text"
          type="text"
          label="Pricing Text"
          placeholder="$99/month"
        />

        <FormFieldText
          record={props.record.properties}
          field="default_discount_code"
          type="text"
          label="Default Discount Code"
          placeholder="SAVE20"
        />
      </div>
    </FormWrap>
  );
});
