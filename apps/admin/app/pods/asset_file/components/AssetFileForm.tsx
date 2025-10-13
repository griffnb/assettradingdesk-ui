import { constants } from "@/models/models/asset_file/constants";
import { AssetFileModel } from "@/models/models/asset_file/model/AssetFileModel";
import FormFieldSelect from "@/ui/common/components/form/fields/FormFieldSelect";
import { FormFieldText } from "@/ui/common/components/form/fields/FormFieldText";
import FormWrap from "@/ui/common/components/form/wrap/FormWrap";
import { isObjectValid } from "@/utils/validations";
import { runInAction } from "mobx";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router";

interface AssetFileFormProps {
  record: AssetFileModel;
  onSuccess?: (record: AssetFileModel) => void;
  onCancel?: () => void;
}

export const AssetFileForm = observer(function AssetFileForm(
  props: AssetFileFormProps,
) {
  const nav = useNavigate();

  const saveAction = async () => {
    runInAction(async () => {
      const messages = isObjectValid<AssetFileModel>(props.record);
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
            nav("/asset_files"); // default fallback
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
        nav("/asset_files"); // default fallback
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
        field="file_name"
        type="text"
        label="File Name"
        placeholder="Enter file name"
      />

      <FormFieldText
        record={props.record}
        field="file_location"
        type="text"
        label="File Location"
        placeholder="Enter file location/URL"
      />

      <FormFieldSelect
        record={props.record}
        field="file_type"
        label="File Type"
        placeholder="Select file type"
        options={constants.file_type}
      />

      <FormFieldText
        record={props.record}
        field="file_order"
        type="number"
        label="File Order"
        placeholder="Enter sort order"
      />

      <FormFieldText
        record={props.record}
        field="asset_id"
        type="text"
        label="Asset ID"
        placeholder="Enter asset ID"
      />
    </FormWrap>
  );
});
