import { FormFieldText } from "@/ui/common/components/form/fields/FormFieldText";
import FormWrap from "@/ui/common/components/form/wrap/FormWrap";
import { isObjectValid } from "@/utils/validations";
import { runInAction } from "mobx";
import { useNavigate } from "react-router";
import { observer } from "mobx-react-lite";
import { RequestModel } from "@/models/models/request/model/RequestModel";

interface RequestFormProps {
  record: RequestModel;
  onSuccess?: (record: RequestModel) => void;
  onCancel?: () => void;
}

export const RequestForm = observer(function RequestForm(props: RequestFormProps) {
  const nav = useNavigate();

  const saveAction = async () => {
    runInAction(async () => {
      const messages = isObjectValid<RequestModel>(props.record);
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
            nav("/requests"); // default fallback
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
        nav("/requests"); // default fallback
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

    </FormWrap>
  );
});

