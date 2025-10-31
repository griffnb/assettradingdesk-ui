import { URLParams } from "@/common_lib/types/url";
import { AssetModel } from "@/models/models/asset/model/AssetModel";
import { AssetFileTypes } from "@/models/models/asset_file/_constants/file_type";
import { AssetFileModel } from "@/models/models/asset_file/model/AssetFileModel";
import { Store } from "@/models/store/Store";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { Lightbox } from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

interface AssetGalleryProps {
  asset: AssetModel;
  public?: boolean;
}

export const AssetGallery = observer(function AssetGallery(
  props: AssetGalleryProps,
) {
  const { asset, public: isPublic = false } = props;
  const [assetFiles, setAssetFiles] = useState<AssetFileModel[]>([]);
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const filterImages = (files: AssetFileModel[]) =>
      files.filter((file) => file.file_type === AssetFileTypes.Image);

    const fromAsset = filterImages(asset.asset_files || []);
    if (fromAsset.length > 0) {
      setAssetFiles(fromAsset);
      return () => {
        isMounted = false;
      };
    }

    const loadFiles = async () => {
      if (!isMounted) {
        return;
      }

      const path = isPublic && asset.urn ? `share/${asset.urn}` : "";
      const params: URLParams = {};

      if (!isPublic) {
        const assetId = asset.id;
        if (!assetId) {
          setAssetFiles([]);
          return;
        }

        params.asset_id = assetId;
        params.file_type = "1";
      } else if (!asset.urn) {
        setAssetFiles([]);
        return;
      }

      try {
        const response = await Store.asset_file.queryRecords(path, params);
        if (!isMounted) {
          return;
        }

        if (response.success && response.data) {
          setAssetFiles(filterImages(response.data));
        } else {
          setAssetFiles([]);
        }
      } catch (error) {
        console.error("Failed to load asset files", error);
        if (isMounted) {
          setAssetFiles([]);
        }
      }
    };

    void loadFiles();

    return () => {
      isMounted = false;
    };
  }, [asset.id, asset.asset_files?.length, asset.urn, isPublic]);

  if (assetFiles.length === 0) {
    return null;
  }

  return (
    <div className="px-10">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {assetFiles.map((assetFile, assetIndex) => (
          <img
            key={assetFile.id ?? `${assetFile.file_location}-${assetIndex}`}
            src={assetFile.file_location}
            alt={assetFile.file_name}
            className="h-48 w-full cursor-pointer rounded-lg object-cover"
            onClick={() => {
              setIndex(assetIndex);
              setOpen(true);
            }}
          />
        ))}
      </div>
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={index}
        slides={assetFiles.map((assetFile) => ({
          src: assetFile.file_location,
        }))}
      />
    </div>
  );
});
