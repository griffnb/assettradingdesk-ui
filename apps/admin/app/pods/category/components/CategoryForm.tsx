import { CategoryModel } from "@/models/models/category/model/CategoryModel";
import { IndustryModel } from "@/models/models/industry/model/IndustryModel";
import { DetailFieldContainer } from "@/ui/common/components/form/details/DetailFieldContainer";
import { FormFieldModelSearchSelect } from "@/ui/common/components/form/fields/FormFieldModelSearchSelect";
import { FormFieldText } from "@/ui/common/components/form/fields/FormFieldText";
import { FormFieldTextArea } from "@/ui/common/components/form/fields/FormFieldTextArea";
import { FormWrap } from "@/ui/common/components/form/wrap/FormWrap";
import { isObjectValid } from "@/utils/validations";
import { runInAction } from "mobx";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router";

interface CategoryFormProps {
  record: CategoryModel;
  onSuccess?: (record: CategoryModel) => void;
  onCancel?: () => void;
}

export const CategoryForm = observer(function CategoryForm(
  props: CategoryFormProps,
) {
  const nav = useNavigate();

  const saveAction = async () => {
    runInAction(async () => {
      const messages = isObjectValid<CategoryModel>(props.record);
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
            nav("/categories"); // default fallback
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
        nav("/categories"); // default fallback
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
          placeholder="Category Name"
        />

        <FormFieldText
          record={props.record}
          field="slug"
          type="text"
          label="Slug"
          placeholder="category-slug"
        />
      </DetailFieldContainer>

      <DetailFieldContainer>
        <FormFieldTextArea
          record={props.record}
          field="description"
          label="Description"
          placeholder="Category description"
        />
      </DetailFieldContainer>

      <DetailFieldContainer>
        <FormFieldModelSearchSelect<CategoryModel, IndustryModel>
          record={props.record}
          field="industry_id"
          label="Industry"
          placeholder="Select Industry"
          modelName="industry"
          modelSearchParam="q"
          modelDisplayField="label"
        />

        <FormFieldModelSearchSelect<CategoryModel, CategoryModel>
          record={props.record}
          field="parent_category_id"
          label="Parent Category"
          placeholder="Select Parent Category"
          modelName="category"
          modelSearchParam="q"
          modelDisplayField="label"
        />
      </DetailFieldContainer>
    </FormWrap>
  );
});
