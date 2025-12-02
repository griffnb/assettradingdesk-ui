import { constants } from "@/models/constants";
import { SubscriptionModel } from "@/models/models/subscription/model/SubscriptionModel";
import { FormFieldSelect } from "@/ui/common/components/form/fields/FormFieldSelect";
import { FormFieldText } from "@/ui/common/components/form/fields/FormFieldText";
import { FormWrap } from "@/ui/common/components/form/wrap/FormWrap";
import { isObjectValid } from "@/utils/validations";
import { runInAction } from "mobx";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router";

interface SubscriptionFormProps {
  record: SubscriptionModel;
  onSuccess?: (record: SubscriptionModel) => void;
  onCancel?: () => void;
}

export const SubscriptionForm = observer(function SubscriptionForm(props: SubscriptionFormProps) {
  const nav = useNavigate();

  const saveAction = async () => {
    runInAction(async () => {
      const messages = isObjectValid<SubscriptionModel>(props.record);
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
            nav("/subscriptions"); // default fallback
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
        nav("/subscriptions"); // default fallback
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
        field="subscription_id"
        type="text"
        label="Subscription ID"
        placeholder="Subscription ID"
      />

      <FormFieldText
        record={props.record}
        field="price_or_plan_id"
        type="text"
        label="Price/Plan ID"
        placeholder="Price or Plan ID"
      />

      <FormFieldSelect
        record={props.record}
        field="billing_provider"
        label="Billing Provider"
        options={constants.subscription.billing_provider}
      />

      <FormFieldText
        record={props.record}
        field="amount"
        type="number"
        label="Amount"
        placeholder="0.00"
      />

      <FormFieldText
        record={props.record}
        field="level"
        type="number"
        label="Level"
        placeholder="0"
      />

      <FormFieldText
        record={props.record}
        field="coupon_code"
        type="text"
        label="Coupon Code"
        placeholder="Coupon Code"
      />

    </FormWrap>
  );
});

