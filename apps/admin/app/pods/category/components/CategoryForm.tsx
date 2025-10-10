import { CategoryModel } from "@/models/models/category/model/CategoryModel";
import { Store } from "@/models/store/Store";
import { FormFieldModelSelect } from "@/ui/common/components/form/fields/FormFieldModelSelect";
import { FormFieldText } from "@/ui/common/components/form/fields/FormFieldText";
import FormFieldTextarea from "@/ui/common/components/form/fields/FormFieldTextarea";
import FormWrap from "@/ui/common/components/form/wrap/FormWrap";
import { isObjectValid } from "@/utils/validations";
import { runInAction } from "mobx";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

interface CategoryFormProps {
  record: CategoryModel;
  onSuccess?: (record: CategoryModel) => void;
  onCancel?: () => void;
}

export const CategoryForm = observer(function CategoryForm(
  props: CategoryFormProps
) {
  const nav = useNavigate();
  const [parentCategories, setParentCategories] = useState<CategoryModel[]>([]);

  useEffect(() => {
    // Load parent categories for selection
    const loadParentCategories = async () => {
      const resp = await Store.category.query({});
      if (resp.success && resp.data) {
        // Filter out the current category to prevent circular reference
        const filtered = resp.data.filter((cat) => cat.id !== props.record.id);
        setParentCategories(filtered);
      }
    };
    loadParentCategories();
  }, [props.record.id]);

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
      <FormFieldText
        record={props.record}
        field="name"
        type="text"
        label="Name"
        placeholder="Enter category name"
      />

      <FormFieldText
        record={props.record}
        field="slug"
        type="text"
        label="Slug"
        placeholder="Enter URL-friendly slug"
        helpText="Used in URLs. Only lowercase letters, numbers, hyphens, and underscores allowed."
      />

      <FormFieldTextarea
        record={props.record}
        field="description"
        label="Description"
        placeholder="Enter category description"
        rows={4}
      />

      <FormFieldModelSelect<CategoryModel, CategoryModel>
        record={props.record}
        field="parent_category_id"
        label="Parent Category"
        placeholder="Select a parent category (optional)"
        modelName="category"
        modelDisplayField="displayName"
        modelSearchField="name"
        modelSearchFilters={{}}
        additionalOptions={[
          { id: "", label: "No Parent (Root Category)" },
          ...parentCategories.map((cat) => ({
            id: cat.id || "",
            label: cat.displayName,
          })),
        ]}
      />
    </FormWrap>
  );
});
