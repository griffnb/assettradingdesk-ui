import { AppStore } from "@/common_lib/store/AppStore";
import AssetFileModel from "@/pods/asset-file/model/AssetFileModel";
import { observer } from "mobx-react";
import { useEffect, useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import AssetModel from "../../model/AssetModel";

interface AssetGalleryProps {
  asset: AssetModel;
  public?: boolean;
}
const AssetGallery = observer((props: AssetGalleryProps) => {
  const [assetFiles, setAssetFiles] = useState<AssetFileModel[]>([]);
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (props.public) {
      AppStore.queryRecords<AssetFileModel>(
        "asset-file",
        `share/${props.asset.key}`,
        {},
      ).then((assetFiles) => {
        setAssetFiles(assetFiles);
      });
    } else {
      AppStore.query<AssetFileModel>("asset-file", {
        asset_id: props.asset.id?.toString() as string,
        file_type: 1,
      }).then((assetFiles) => {
        setAssetFiles(assetFiles);
      });
    }
  }, [props.asset.id]);

  if (assetFiles.length === 0) {
    return null;
  }

  return (
    <>
      <div className="grid grid-cols-4 gap-x-3 gap-y-3 border-1 p-3">
        {assetFiles.map((asset, i) => (
          <img
            key={asset.id}
            src={asset.file_location}
            alt={asset.file_name}
            className="cursor-pointer rounded-lg"
            onClick={() => {
              setIndex(i);
              setOpen(true);
            }}
          />
        ))}
      </div>
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={index}
        slides={assetFiles.map((asset) => {
          return { src: asset.file_location };
        })}
      />
    </>
  );
});

export default AssetGallery;
