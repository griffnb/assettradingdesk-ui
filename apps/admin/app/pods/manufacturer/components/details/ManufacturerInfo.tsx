import { SafeBaseModel } from "@/models/BaseModel";
import { ManufacturerMetaData } from "@/models/models/manufacturer/model/ManufacturerBaseModel";
import { ManufacturerModel } from "@/models/models/manufacturer/model/ManufacturerModel";
import { DetailFieldContainer } from "@/ui/common/components/form/details/DetailFieldContainer";
import { DetailFieldReadOnly } from "@/ui/common/components/form/details/DetailFieldReadOnly";
import { DetailFieldText } from "@/ui/common/components/form/details/DetailFieldText";
import { DetailFieldTextArea } from "@/ui/common/components/form/details/DetailFieldTextArea";
import { observer } from "mobx-react-lite";

interface ManufacturerInfoProps {
  manufacturer: ManufacturerModel;
}

export const ManufacturerInfo = observer(function ManufacturerInfo(
  props: ManufacturerInfoProps,
) {
  return (
    <div className="p-10">
      <h2 className="mb-6 text-lg font-semibold">Manufacturer Information</h2>

      <DetailFieldContainer>
        <DetailFieldText
          record={props.manufacturer}
          field="name"
          type="text"
          label="Name"
          placeholder="Manufacturer Name"
        />

        <DetailFieldText
          record={props.manufacturer}
          field="slug"
          type="text"
          label="Slug"
          placeholder="manufacturer-slug"
        />
      </DetailFieldContainer>

      <DetailFieldContainer>
        <DetailFieldTextArea
          record={props.manufacturer}
          field="description"
          label="Description"
          placeholder="Manufacturer description"
        />
      </DetailFieldContainer>

      <h2 className="mb-6 mt-8 text-lg font-semibold">Statistics</h2>

      <DetailFieldContainer>
        <DetailFieldReadOnly
          record={props.manufacturer}
          field="asset_count"
          label="Asset Count"
        />
      </DetailFieldContainer>

      <h2 className="mb-6 mt-8 text-lg font-semibold">Legacy Data</h2>

      <DetailFieldContainer>
        <DetailFieldText
          record={props.manufacturer.meta_data as SafeBaseModel<ManufacturerMetaData>}
          parentRecord={props.manufacturer}
          field="legacy_id"
          type="number"
          label="Legacy ID"
          placeholder="Legacy ID"
        />

        <DetailFieldText
          record={props.manufacturer.meta_data as SafeBaseModel<ManufacturerMetaData>}
          parentRecord={props.manufacturer}
          field="legacy_key"
          type="text"
          label="Legacy Key"
          placeholder="Legacy Key"
        />
      </DetailFieldContainer>
    </div>
  );
});
