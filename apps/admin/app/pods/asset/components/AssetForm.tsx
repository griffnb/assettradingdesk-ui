import { AssetModel } from "@/models/models/asset/model/AssetModel";
import { FormFieldText } from "@/ui/common/components/form/fields/FormFieldText";
import { FormWrap } from "@/ui/common/components/form/wrap/FormWrap";
import { isObjectValid } from "@/utils/validations";
import { runInAction } from "mobx";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router";

interface AssetFormProps {
  record: AssetModel;
  onSuccess?: (record: AssetModel) => void;
  onCancel?: () => void;
}

export const AssetForm = observer(function AssetForm(props: AssetFormProps) {
  const nav = useNavigate();

  const saveAction = async () => {
    runInAction(async () => {
      const messages = isObjectValid<AssetModel>(props.record);
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
            nav("/assets"); // default fallback
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
        nav("/assets"); // default fallback
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
        field="price"
        type="text"
        label="Price"
        placeholder="0.00"
      />
    </FormWrap>
  );
});
