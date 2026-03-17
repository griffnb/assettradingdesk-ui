import { SafeBaseModel } from "@/models/BaseModel";
import { CategoryMetaData } from "@/models/models/category/model/CategoryBaseModel";
import { CategoryModel } from "@/models/models/category/model/CategoryModel";
import { IndustryModel } from "@/models/models/industry/model/IndustryModel";
import { DetailFieldContainer } from "@/ui/common/components/form/details/DetailFieldContainer";
import { DetailFieldModelSearchSelect } from "@/ui/common/components/form/details/DetailFieldModelSearchSelect";
import { DetailFieldReadOnly } from "@/ui/common/components/form/details/DetailFieldReadOnly";
import { DetailFieldText } from "@/ui/common/components/form/details/DetailFieldText";
import { DetailFieldTextArea } from "@/ui/common/components/form/details/DetailFieldTextArea";
import { observer } from "mobx-react-lite";

interface CategoryInfoProps {
  category: CategoryModel;
}

export const CategoryInfo = observer(function CategoryInfo(
  props: CategoryInfoProps,
) {
  return (
    <div className="p-10">
      <h2 className="mb-6 text-lg font-semibold">Category Information</h2>

      <DetailFieldContainer>
        <DetailFieldText
          record={props.category}
          field="name"
          type="text"
          label="Name"
          placeholder="Category Name"
        />

        <DetailFieldText
          record={props.category}
          field="slug"
          type="text"
          label="Slug"
          placeholder="category-slug"
        />
      </DetailFieldContainer>

      <DetailFieldContainer>
        <DetailFieldTextArea
          record={props.category}
          field="description"
          label="Description"
          placeholder="Category description"
        />
      </DetailFieldContainer>

      <h2 className="mb-6 mt-8 text-lg font-semibold">Relationships</h2>

      <DetailFieldContainer>
        <DetailFieldModelSearchSelect<CategoryModel, IndustryModel>
          record={props.category}
          field="industry_id"
          displayField="industry_name"
          label="Industry"
          placeholder="Select Industry"
          modelName="industry"
          modelSearchParam="q"
          modelDisplayField="label"
          link={
            props.category.industry_id
              ? `/industries/details/${props.category.industry_id}`
              : undefined
          }
        />

        <DetailFieldModelSearchSelect<CategoryModel, CategoryModel>
          record={props.category}
          field="parent_category_id"
          displayField="parent_name"
          label="Parent Category"
          placeholder="Select Parent Category"
          modelName="category"
          modelSearchParam="q"
          modelDisplayField="label"
          link={
            props.category.parent_category_id
              ? `/categories/details/${props.category.parent_category_id}`
              : undefined
          }
        />
      </DetailFieldContainer>

      <h2 className="mb-6 mt-8 text-lg font-semibold">Hierarchy & Stats</h2>

      <DetailFieldContainer>
        <DetailFieldReadOnly
          record={props.category}
          field="category_hierarchy"
          label="Category Hierarchy"
        />

        <DetailFieldReadOnly
          record={props.category}
          field="asset_count"
          label="Asset Count"
        />
      </DetailFieldContainer>

      <h2 className="mb-6 mt-8 text-lg font-semibold">Legacy Data</h2>

      <DetailFieldContainer>
        <DetailFieldText
          record={props.category.meta_data as SafeBaseModel<CategoryMetaData>}
          parentRecord={props.category}
          field="legacy_id"
          type="number"
          label="Legacy ID"
          placeholder="Legacy ID"
        />

        <DetailFieldText
          record={props.category.meta_data as SafeBaseModel<CategoryMetaData>}
          parentRecord={props.category}
          field="legacy_key"
          type="text"
          label="Legacy Key"
          placeholder="Legacy Key"
        />
      </DetailFieldContainer>
    </div>
  );
});
