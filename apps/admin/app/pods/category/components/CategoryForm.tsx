import { FormFieldText } from "@/ui/common/components/form/fields/FormFieldText";
import FormWrap from "@/ui/common/components/form/wrap/FormWrap";
import { isObjectValid } from "@/utils/validations";
import { runInAction } from "mobx";
import { useNavigate } from "react-router";
import { observer } from "mobx-react-lite";
import { CategoryModel } from "@/models/models/category/model/CategoryModel";

interface CategoryFormProps {
  record: CategoryModel;
  onSuccess?: (record: CategoryModel) => void;
  onCancel?: () => void;
}

export const CategoryForm = observer(function CategoryForm(props: CategoryFormProps) {
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

