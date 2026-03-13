"use client";

import { ServerService } from "@/common_lib/services/ServerService";
import { debugLog } from "@/common_lib/utils/debug";
import { isObjectValid } from "@/common_lib/utils/validations";
import { constants } from "@/models/constants";
import { AssetModel } from "@/models/models/asset/model/AssetModel";
import { AssetFileTypes } from "@/models/models/asset_file/_constants/file_type";
import { FacilityModel } from "@/models/models/facility/model/FacilityModel";
import { ModelModel } from "@/models/models/model/model/ModelModel";
import { Store } from "@/models/store/Store";
import { ImageHolder } from "@/ui/common/components/fields/files/types";
import { FormFieldModelSearchSelect } from "@/ui/common/components/form/fields/FormFieldModelSearchSelect";
import FormFieldModelSelect from "@/ui/common/components/form/fields/FormFieldModelSelect";
import { FormFieldSelect } from "@/ui/common/components/form/fields/FormFieldSelect";
import { FormFieldText } from "@/ui/common/components/form/fields/FormFieldText";
import { FormFieldTextArea } from "@/ui/common/components/form/fields/FormFieldTextArea";
import { Button } from "@/ui/shadcn/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/ui/shadcn/ui/card";
import { runInAction } from "mobx";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { ImageType } from "react-images-uploading";
import { AssetExistingFiles } from "./AssetExistingFiles";
import { AssetImageUploader } from "./AssetImageUploader";

interface AssetCreationFormProps {
  record: AssetModel;
  onSuccess?: (record: AssetModel) => void;
  onCancel?: () => void;
}

export const AssetCreationForm = observer(function AssetCreationForm(
  props: AssetCreationFormProps,
) {
  const [wrappedImages, setWrappedImages] = useState<ImageHolder[]>([]);
  const [images, setImages] = useState<ImageType[]>([]);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const saveAction = async () => {
    runInAction(async () => {
      const messages = isObjectValid<AssetModel>(props.record);
      if (messages.length > 0) {
        console.log(messages);
        return false;
      }
      const resp = await props.record.save();

      if (resp.success) {
        await handleUpload(props.record.id as string);
        if (props.onSuccess) {
          props.onSuccess(props.record);
        }
      }
    });
  };

  const handleCancel = () => {
    props.record.rollback();
    if (props.onCancel) {
      props.onCancel();
    }
  };

  const getUploadData = async (file: File) => {
    const results = await ServerService.callGet("asset_file", "presignedURL", {
      name: file.name,
      type: file.type,
    });

    return results.data.url;
  };

  const uploadToAWS = async (
    file: File,
    fileLocation: string,
    index: number,
  ) => {
    const wrappedImage = wrappedImages[index];
    if (!wrappedImage) {
      return;
    }
    wrappedImage.uploading = true;
    setWrappedImages([...wrappedImages]);

    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": file.type },
      body: file,
    };
    try {
      await fetch(fileLocation, requestOptions);
    } catch (error) {
      debugLog(error);
      wrappedImage.errored = true;
    }
    wrappedImage.uploading = false;
    wrappedImage.finished = !wrappedImage.errored;
    wrappedImage.assetURL = formatImageURL(
      fileLocation.split("?")[0] as string,
    );
    setWrappedImages([...wrappedImages]);
  };

  const handleUpload = async (assetId: string) => {
    setIsUploading(true);
    for (let i = 0; i < images.length; i++) {
      const img = images[i];
      if (!img || !img.file) continue;
      const fileLocation = await getUploadData(img.file);
      await uploadToAWS(img.file, fileLocation, i);
    }

    wrappedImages.forEach((image) => {
      if (image.finished && !image.errored) {
        const assetFile = Store.asset_file.create();
        assetFile.asset_id = assetId;
        assetFile.file_name = image.file.name;
        if (image.file.type.includes("image")) {
          assetFile.file_type = AssetFileTypes.Image;
        } else if (image.file.type.includes("video")) {
          assetFile.file_type = AssetFileTypes.Video;
        } else {
          assetFile.file_type = AssetFileTypes.Document;
        }
        assetFile.file_location = image.assetURL;
        assetFile.save();
      }
    });

    setIsUploading(false);
  };

  return (
    <Card className="flex flex-1 overflow-auto rounded-none bg-gradient-to-br from-gray-50 to-white shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl">List an asset</CardTitle>
        <CardDescription>
          Provide technical details to help brokers match your equipment with
          qualified buyers.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(320px,1fr)]">
          <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <FormFieldModelSearchSelect<AssetModel, ModelModel>
                record={props.record}
                field="model_id"
                modelName="model"
                modelDisplayField="label"
                modelSearchParam={"q"}
                modelSearchFilters={{ disabled: "0" }}
                label="Model"
                placeholder="Search model…"
              />

              <FormFieldText
                record={props.record}
                field="year"
                type="number"
                label="Model Year"
                placeholder="2020"
              />
              <FormFieldText
                record={props.record}
                field="location"
                type="text"
                label="Site location"
                placeholder="City, Country"
              />
              <FormFieldText
                record={props.record}
                field="serial_number"
                type="text"
                label="Serial Number"
                placeholder="Serial Number"
              />
            </div>
            <FormFieldModelSelect<AssetModel, FacilityModel>
              record={props.record}
              field="facility_id"
              modelName="facility"
              modelDisplayField="name"
              modelSearchField="name"
              modelSearchFilters={{ disabled: "0" }}
              label="Facility"
              placeholder="Select Facility"
              defaultIfSingleOption={true}
            />

            <FormFieldTextArea
              record={props.record}
              field="description"
              label="Description"
              placeholder="Condition / usage notes / maintenance history / etc."
              rows={5}
              className="space-y-2"
            />
            <FormFieldTextArea
              record={props.record}
              field="configuration_notes"
              label="Configuration notes"
              placeholder="Chambers / voltage / accessories / gases /  etc..."
              rows={5}
              className="space-y-2"
            />
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Asset details</CardTitle>
                <CardDescription>
                  Additional specifications and status.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormFieldText
                  record={props.record}
                  prepend="$"
                  field="price"
                  type="number"
                  label="Asking price (USD)"
                  placeholder="0"
                />
                <FormFieldText
                  record={props.record}
                  field="quantity"
                  type="number"
                  label="Quantity"
                  placeholder="1"
                />
                <FormFieldSelect
                  record={props.record}
                  field="install_status"
                  label="Install Status"
                  options={constants.asset.install_status}
                />
                <FormFieldSelect
                  record={props.record}
                  field="operational_status"
                  label="Operational Status"
                  options={constants.asset.operational_status}
                />
                <CardFooter className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={handleCancel}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button onClick={saveAction} className="flex-1">
                    Create Asset
                  </Button>
                </CardFooter>
              </CardContent>
            </Card>
          </div>
        </div>
        {props.record.id && <AssetExistingFiles asset={props.record} />}
        <AssetImageUploader
          asset={props.record}
          images={images}
          wrappedImages={wrappedImages}
          setImages={(images, wrappedImages) => {
            setImages(images);
            setWrappedImages(wrappedImages);
          }}
          isUploading={isUploading}
        />
      </CardContent>
    </Card>
  );
});

const formatImageURL = (url: string) => {
  return url.replace("https://s3.us-east-1.amazonaws.com/", "https://");
};
