import { AiToolModel } from "@/models/models/ai_tool/model/AiToolModel";
import { FormFieldText } from "@/ui/common/components/form/fields/FormFieldText";
import FormWrap from "@/ui/common/components/form/wrap/FormWrap";
import { isObjectValid } from "@/utils/validations";
import { runInAction } from "mobx";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router";

interface AiToolFormProps {
  record: AiToolModel;
  onSuccess?: (record: AiToolModel) => void;
  onCancel?: () => void;
}

export const AiToolForm = observer(function AiToolForm(props: AiToolFormProps) {
  const nav = useNavigate();

  const saveAction = async () => {
    runInAction(async () => {
      const messages = isObjectValid<AiToolModel>(props.record);
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
            nav("/ai_tools"); // default fallback
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
        nav("/ai_tools"); // default fallback
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
        field="description"
        type="textarea"
        label="Description"
        placeholder="Description"
      />

      <FormFieldText
        record={props.record}
        field="website_url"
        type="url"
        label="Website URL"
        placeholder="https://example.com"
      />

      <FormFieldText
        record={props.record}
        field="affiliate_url"
        type="url"
        label="Affiliate URL"
        placeholder="https://affiliate.example.com"
      />
    </FormWrap>
  );
});
