import { Store } from "@/models/store/Store";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { BreadcrumbService } from "@/ui/admin/nav/BreadcrumbService";

import { CategoryForm  } from "@/admin/pods/category/components/CategoryForm";
import { CategoryModel } from "@/models/models/category/model/CategoryModel";

//interface CategoryNewProps {}

export const CategoryNew = observer(function CategoryNew() {
  const [record, setRecord] = useState<CategoryModel | null>(null);

  useEffect(() => {
    const rec = Store.category.create();
    setRecord(rec);
  }, []);

  useEffect(() => {
    BreadcrumbService.setSegments([
      { label: "Home", href: "/" },
      { label: "Categories", href: "/categories" },
      { label: "New" },
    ]);
  }, []);

  if (!record) return null;
    return (
    <>
      <CategoryForm record={record} />;
    </>
  );
});
