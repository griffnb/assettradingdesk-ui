import { PipelineModel } from "@/models/models/pipeline/model/PipelineModel";
import { FormWrap } from "@/ui/common/components/form/wrap/FormWrap";
import { isObjectValid } from "@/utils/validations";
import { runInAction } from "mobx";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router";

interface PipelineFormProps {
  record: PipelineModel;
  onSuccess?: (record: PipelineModel) => void;
  onCancel?: () => void;
}

export const PipelineForm = observer(function PipelineForm(
  props: PipelineFormProps,
) {
  const nav = useNavigate();

  const saveAction = async () => {
    runInAction(async () => {
      const messages = isObjectValid<PipelineModel>(props.record);
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
            nav("/pipelines"); // default fallback
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
        nav("/pipelines"); // default fallback
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
      <></>
    </FormWrap>
  );
});
