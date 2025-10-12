import { Store } from "@/models/store/Store";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { AdminTitleBar } from "@/ui/admin/nav/AdminTitleBar";

import { CategoryForm  } from "@/admin/pods/category/components/CategoryForm";
import { CategoryModel } from "@/models/models/category/model/CategoryModel";

//interface CategoryNewProps {}

export const CategoryNew = observer(function CategoryNew() {
  const [record, setRecord] = useState<CategoryModel | null>(null);

  useEffect(() => {
    const rec = Store.category.create();
    setRecord(rec);
  }, []);

  if (!record) return null;

    return (
    <>
      <AdminTitleBar title="New Category" />
      <CategoryForm record={record} />;
    </>
  );
});
