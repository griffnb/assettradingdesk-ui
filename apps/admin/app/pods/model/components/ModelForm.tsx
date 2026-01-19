import { SafeBaseModel } from "@/models/BaseModel";
import { CategoryModel } from "@/models/models/category/model/CategoryModel";
import { ManufacturerModel } from "@/models/models/manufacturer/model/ManufacturerModel";
import { ModelMetaData } from "@/models/models/model/model/ModelMetaData";
import { ModelModel } from "@/models/models/model/model/ModelModel";
import { DetailFieldContainer } from "@/ui/common/components/form/details/DetailFieldContainer";
import { FormFieldModelSearchSelect } from "@/ui/common/components/form/fields/FormFieldModelSearchSelect";
import { FormFieldText } from "@/ui/common/components/form/fields/FormFieldText";
import { FormFieldTextArea } from "@/ui/common/components/form/fields/FormFieldTextArea";
import { FormWrap } from "@/ui/common/components/form/wrap/FormWrap";
import { isObjectValid } from "@/utils/validations";
import { runInAction } from "mobx";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router";

interface ModelFormProps {
  record: ModelModel;
  onSuccess?: (record: ModelModel) => void;
  onCancel?: () => void;
}

export const ModelForm = observer(function ModelForm(props: ModelFormProps) {
  const nav = useNavigate();

  const saveAction = async () => {
    runInAction(async () => {
      const messages = isObjectValid<ModelModel>(props.record);
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
            nav("/models"); // default fallback
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
        nav("/models"); // default fallback
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
          placeholder="Model Name"
        />

        <FormFieldText
          record={props.record}
          field="slug"
          type="text"
          label="Slug"
          placeholder="model-slug"
        />
      </DetailFieldContainer>

      <DetailFieldContainer>
        <FormFieldTextArea
          record={props.record}
          field="description"
          label="Description"
          placeholder="Model description"
        />
      </DetailFieldContainer>

      <DetailFieldContainer>
        <FormFieldModelSearchSelect<ModelModel, ManufacturerModel>
          record={props.record}
          field="manufacturer_id"
          label="Manufacturer"
          placeholder="Select Manufacturer"
          modelName="manufacturer"
          modelSearchParam="q"
          modelDisplayField="label"
        />

        <FormFieldModelSearchSelect<ModelModel, CategoryModel>
          record={props.record}
          field="category_id"
          label="Category"
          placeholder="Select Category"
          modelName="category"
          modelSearchParam="q"
          modelDisplayField="label"
        />
      </DetailFieldContainer>

      <DetailFieldContainer>
        <FormFieldText
          record={props.record}
          field="hot"
          type="number"
          label="Hot"
          placeholder="0"
          helpText="Popularity/priority indicator"
        />

        <FormFieldText
          record={props.record.meta_data as SafeBaseModel<ModelMetaData>}
          field="legacy_id"
          type="number"
          label="Legacy ID"
          placeholder="Legacy ID"
        />
      </DetailFieldContainer>
    </FormWrap>
  );
});
