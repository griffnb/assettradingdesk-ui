import { Store } from "@/models/store/Store";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router";
import { useEffect, useState } from "react";

import { CategoryForm } from "@/admin/pods/category/components/CategoryForm";
import { CategoryModel } from "@/models/models/category/model/CategoryModel";
import { BreadcrumbService } from "@/ui/admin/nav/BreadcrumbService";

//interface CategoryEditProps {}

export const CategoryEdit = observer(function CategoryEdit() {
  const [record, setRecord] = useState<CategoryModel | null>(null);
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    if (!id) return;
    Store.category.get(id as string).then(
      (rec) => {
        if(!rec.data) return;
        setRecord(rec.data);
      },
    );
  }, [id]);

  useEffect(() => {
    if (!record) return;
    BreadcrumbService.setSegments([
      { label: "Home", href: "/" },
      { label: "Categories", href: "/categories" },
      { label: record.label, href: record.link("details") },
      { label: "Edit" },
    ]);
  }, [record]);

  if (!record) return null;


  return (
    <>
      <CategoryForm record={record} />;
    </>
  );
});
