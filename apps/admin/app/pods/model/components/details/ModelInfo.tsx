import { SafeBaseModel } from "@/models/BaseModel";
import { CategoryModel } from "@/models/models/category/model/CategoryModel";
import { ManufacturerModel } from "@/models/models/manufacturer/model/ManufacturerModel";
import { ModelMetaData } from "@/models/models/model/model/ModelMetaData";
import { ModelModel } from "@/models/models/model/model/ModelModel";
import { DetailFieldContainer } from "@/ui/common/components/form/details/DetailFieldContainer";
import { DetailFieldModelSearchSelect } from "@/ui/common/components/form/details/DetailFieldModelSearchSelect";
import { DetailFieldReadOnly } from "@/ui/common/components/form/details/DetailFieldReadOnly";
import { DetailFieldText } from "@/ui/common/components/form/details/DetailFieldText";
import { DetailFieldTextArea } from "@/ui/common/components/form/details/DetailFieldTextArea";
import { observer } from "mobx-react-lite";

interface ModelInfoProps {
  model: ModelModel;
}

export const ModelInfo = observer(function ModelInfo(props: ModelInfoProps) {
  return (
    <div className="p-10">
      <h2 className="mb-6 text-lg font-semibold">Model Information</h2>

      <DetailFieldContainer>
        <DetailFieldText
          record={props.model}
          field="name"
          type="text"
          label="Name"
          placeholder="Model Name"
        />

        <DetailFieldText
          record={props.model}
          field="slug"
          type="text"
          label="Slug"
          placeholder="model-slug"
        />
      </DetailFieldContainer>

      <DetailFieldContainer>
        <DetailFieldTextArea
          record={props.model}
          field="description"
          label="Description"
          placeholder="Model description"
        />
      </DetailFieldContainer>

      <h2 className="mb-6 mt-8 text-lg font-semibold">Relationships</h2>

      <DetailFieldContainer>
        <DetailFieldModelSearchSelect<ModelModel, ManufacturerModel>
          record={props.model}
          field="manufacturer_id"
          displayField="manufacturer_name"
          label="Manufacturer"
          placeholder="Select Manufacturer"
          modelName="manufacturer"
          modelSearchParam="q"
          modelDisplayField="label"
          link={
            props.model.manufacturer_id
              ? `/manufacturers/details/${props.model.manufacturer_id}`
              : undefined
          }
        />

        <DetailFieldModelSearchSelect<ModelModel, CategoryModel>
          record={props.model}
          field="category_id"
          displayField="category_name"
          label="Category"
          placeholder="Select Category"
          modelName="category"
          modelSearchParam="q"
          modelDisplayField="label"
          link={
            props.model.category_id
              ? `/categories/details/${props.model.category_id}`
              : undefined
          }
        />
      </DetailFieldContainer>

      <h2 className="mb-6 mt-8 text-lg font-semibold">Stats & Metadata</h2>

      <DetailFieldContainer>
        <DetailFieldText
          record={props.model}
          field="hot"
          type="number"
          label="Hot"
          placeholder="0"
          helpText="Popularity/priority indicator"
        />

        <DetailFieldReadOnly
          record={props.model}
          field="asset_count"
          label="Asset Count"
        />
      </DetailFieldContainer>

      <h2 className="mb-6 mt-8 text-lg font-semibold">Legacy Data</h2>

      <DetailFieldContainer>
        <DetailFieldText
          record={props.model.meta_data as SafeBaseModel<ModelMetaData>}
          parentRecord={props.model}
          field="legacy_id"
          type="number"
          label="Legacy ID"
          placeholder="Legacy ID"
        />
      </DetailFieldContainer>
    </div>
  );
});
