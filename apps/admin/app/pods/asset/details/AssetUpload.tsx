import S3FileUpload, {
  ImageHolder,
} from "@/common_lib/components/fields/S3FileUpload";
import SectionHead from "@/common_lib/components/form/SectionHead";
import AssetFileModel from "@/pods/asset-file/model/AssetFileModel";
import { runInAction } from "mobx";
import { observer } from "mobx-react";
import AssetModel from "../../model/AssetModel";

interface AssetUploadProps {
  asset: AssetModel;
}
const AssetUpload = observer((props: AssetUploadProps) => {
  const fileUpload = (images: ImageHolder[]) => {
    runInAction(() => {
      if (!props.asset.id) return;
      images.forEach((image, index) => {
        const asset = new AssetFileModel();
        asset.asset_id = props.asset.id as number;
        asset.file_name = image.file.name;
        if (image.file.type.includes("image")) {
          asset.file_type = 1;
        } else if (image.file.type.includes("video")) {
          asset.file_type = 2;
        } else {
          asset.file_type = 3;
        }
        asset.file_location = image.assetURL;
        asset.save();
      });
    });
  };
  return (
    <div className="p-10">
      <SectionHead label="Upload Assets" />

      <S3FileUpload
        model="asset-file"
        path="presignedURL"
        multiple={true}
        maxNumber={50}
        uploadCallback={fileUpload}
        nonImages={true}
      />
    </div>
  );
});

export default AssetUpload;
