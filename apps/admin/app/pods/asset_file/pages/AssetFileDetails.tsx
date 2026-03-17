import { Store } from "@/models/store/Store";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { BreadcrumbService } from "@/ui/admin/nav/BreadcrumbService";
import { AssetFileModel } from "@/models/models/asset_file/model/AssetFileModel";
import { AssetModel } from "@/models/models/asset/model/AssetModel";
import { DetailFieldContainer } from "@/ui/common/components/form/details/DetailFieldContainer";
import { DetailFieldText } from "@/ui/common/components/form/details/DetailFieldText";
import { DetailFieldSelect } from "@/ui/common/components/form/details/DetailFieldSelect";
import { DetailFieldModelSearchSelect } from "@/ui/common/components/form/details/DetailFieldModelSearchSelect";
import { DetailFieldReadOnly } from "@/ui/common/components/form/details/DetailFieldReadOnly";
import { constants } from "@/models/models/asset_file/constants";

export const AssetFileDetails = observer(function AssetFileDetails() {
  const [record, setRecord] = useState<AssetFileModel | null>(null);
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    if (!id) return;
    Store.asset_file.get(id as string).then(
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
      { label: "Asset Files", href: "/asset_files" },
      { label: record.label },
    ]);
  }, [record]);

  if (!record) return null;


  return (
    <>
      <DetailFieldContainer>
        <DetailFieldText
          record={record}
          field="file_name"
          label="File Name"
          placeholder="Enter file name"
        />

        <DetailFieldText
          record={record}
          field="file_location"
          label="File Location"
          placeholder="Enter file location/URL"
        />
      </DetailFieldContainer>

      <DetailFieldContainer>
        <DetailFieldSelect
          record={record}
          field="file_type"
          label="File Type"
          options={constants.file_type}
          displayField="file_type_label"
        />

        <DetailFieldText
          record={record}
          field="file_order"
          label="File Order"
          placeholder="Enter sort order"
        />
      </DetailFieldContainer>

      <DetailFieldContainer>
        <DetailFieldModelSearchSelect<AssetFileModel, AssetModel>
          record={record}
          displayField="asset_name"
          field="asset_id"
          label="Asset"
          placeholder="Select Asset"
          modelName="asset"
          modelSearchParam="q"
          modelDisplayField="label"
          modelSearchFilters={{ disabled: "0" }}
          reloadOnSave={true}
        />
      </DetailFieldContainer>

      <DetailFieldContainer>
        <DetailFieldReadOnly
          record={record}
          field="created_by_name"
          label="Created By"
        />

        <DetailFieldReadOnly
          record={record}
          field="updated_by_name"
          label="Updated By"
        />
      </DetailFieldContainer>

      <DetailFieldContainer>
        <DetailFieldReadOnly
          record={record}
          field="created_at"
          label="Created At"
        />

        <DetailFieldReadOnly
          record={record}
          field="updated_at"
          label="Updated At"
        />
      </DetailFieldContainer>
    </>
  );
});
