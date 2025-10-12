import { LayerService } from "@/common_lib/services/LayerService";
import { CategoryModel } from "@/models/models/category/model/CategoryModel";
import { Store } from "@/models/store/Store";
import { FormModal } from "@/ui/common/components/modal/FormModal";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { CategoryForm } from "./CategoryForm";

export const CategoryFormModalId = "CategoryFormModal";

interface CategoryFormModalProps {
  record?: CategoryModel;
  newProperties?: { [key: string]: any };
  onSave?: (record: CategoryModel) => void;
}

export const CategoryFormModal = observer(function CategoryFormModal(props: CategoryFormModalProps) {
  const [record, setRecord] = useState<CategoryModel | undefined>(props.record);
  useEffect(() => {
    if (!props.record) {
      const record = Store.category.create(props.newProperties);
      setRecord(record);
    }
  }, [props.record]);

  const onSuccess = () => {
    LayerService.remove(CategoryFormModalId);
    if (props.onSave) {
      props.onSave(record as CategoryModel);
    }
  };

  const onCancel = () => {
    LayerService.remove(CategoryFormModalId);
  };

  if (!record) return null;

  return (
    <FormModal
      id={ CategoryFormModalId }
      title={`${record.id && record.id != "" ? "Edit" : "New"} Category`}
      showCancel={false}
      showSave={false}
    >
      <CategoryForm record={record} onSuccess={onSuccess} onCancel={onCancel} />
    </FormModal>
  );
});
