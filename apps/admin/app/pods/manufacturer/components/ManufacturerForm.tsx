import { ManufacturerModel } from "@/models/models/manufacturer/model/ManufacturerModel";
import { DetailFieldContainer } from "@/ui/common/components/form/details/DetailFieldContainer";
import { FormFieldText } from "@/ui/common/components/form/fields/FormFieldText";
import { FormFieldTextArea } from "@/ui/common/components/form/fields/FormFieldTextArea";
import { FormWrap } from "@/ui/common/components/form/wrap/FormWrap";
import { isObjectValid } from "@/utils/validations";
import { runInAction } from "mobx";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router";

interface ManufacturerFormProps {
  record: ManufacturerModel;
  onSuccess?: (record: ManufacturerModel) => void;
  onCancel?: () => void;
}

export const ManufacturerForm = observer(function ManufacturerForm(
  props: ManufacturerFormProps,
) {
  const nav = useNavigate();

  const saveAction = async () => {
    runInAction(async () => {
      const messages = isObjectValid<ManufacturerModel>(props.record);
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
            nav("/manufacturers"); // default fallback
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
        nav("/manufacturers"); // default fallback
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
      <DetailFieldContainer>
        <FormFieldText
          record={props.record}
          field="name"
          type="text"
          label="Name"
          placeholder="Manufacturer Name"
        />

        <FormFieldText
          record={props.record}
          field="slug"
          type="text"
          label="Slug"
          placeholder="manufacturer-slug"
        />
      </DetailFieldContainer>

      <DetailFieldContainer>
        <FormFieldTextArea
          record={props.record}
          field="description"
          label="Description"
          placeholder="Manufacturer description"
        />
      </DetailFieldContainer>

      <DetailFieldContainer>
        <FormFieldText
          record={props.record.meta_data}
          field="legacy_id"
          type="number"
          label="Legacy ID"
          placeholder="Legacy ID"
        />

        <FormFieldText
          record={props.record.meta_data}
          field="legacy_key"
          type="text"
          label="Legacy Key"
          placeholder="Legacy Key"
        />
      </DetailFieldContainer>
    </FormWrap>
  );
});
