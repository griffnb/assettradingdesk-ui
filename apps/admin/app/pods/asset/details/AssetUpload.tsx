import { AssetModel } from "@/models/models/asset/model/AssetModel";

import { ImageHolder } from "@/ui/common/components/fields/files/types";
import SectionHead from "@/ui/common/components/form/SectionHead";

import { AssetFileTypes } from "@/models/models/asset_file/_constants/file_type";
import { Store } from "@/models/store/Store";
import { S3BulkFileUpload } from "@/ui/common/components/fields/files/S3BulkFileUpload";
import { observer } from "mobx-react-lite";

interface AssetUploadProps {
  asset: AssetModel;
}

export const AssetUpload = observer(function AssetUpload(
  props: AssetUploadProps,
) {
  const { asset } = props;
  const fileUpload = (images: ImageHolder[]) => {
    images.forEach((image) => {
      const assetFile = Store.asset_file.create();
      assetFile.asset_id = asset.id;
      assetFile.file_name = image.file.name;
      if (image.file.type.includes("image")) {
        assetFile.file_type = AssetFileTypes.Image;
      } else if (image.file.type.includes("video")) {
        assetFile.file_type = AssetFileTypes.Video;
      } else {
        assetFile.file_type = AssetFileTypes.Document;
      }
      assetFile.file_location = image.assetURL;
      asset.save();
    });
  };

  return (
    <div className="p-10">
      <SectionHead label="Upload Assets" />

      <S3BulkFileUpload
        label="Upload Files"
        route="asset-file"
        path="presignedURL"
        multiple={true}
        maxNumber={50}
        uploadCallback={fileUpload}
        nonImages={true}
      />
    </div>
  );
});
