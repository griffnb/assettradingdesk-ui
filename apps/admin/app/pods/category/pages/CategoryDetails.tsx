import { CategoryModel } from "@/models/models/category/model/CategoryModel";
import { Store } from "@/models/store/Store";
import { BreadcrumbService } from "@/ui/admin/nav/BreadcrumbService";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { CategoryInfo } from "../components/details/CategoryInfo";

//interface CategoryDetailProps {}

export const CategoryDetails = observer(function CategoryDetails() {
  const [record, setRecord] = useState<CategoryModel | null>(null);
  const { id } = useParams();

  useEffect(() => {
    if (!id) return;
    Store.category.get(id as string).then((rec) => {
      if (!rec.data) return;
      setRecord(rec.data);
    });
  }, [id]);

  useEffect(() => {
    if (!record) return;
    BreadcrumbService.setSegments([
      { label: "Home", href: "/" },
      { label: "Categories", href: "/categories" },
      { label: record.label },
    ]);
  }, [record]);

  if (!record) return null;


  return (
    <>
      <CategoryInfo category={record} />
    </>
  );
});
