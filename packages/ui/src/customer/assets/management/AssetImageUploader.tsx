"use client";

import { AssetModel } from "@/models/models/asset/model/AssetModel";
import { Store } from "@/models/store/Store";
import { AssetFileTypes } from "@/models/models/asset_file/_constants/file_type";
import { Button } from "@/ui/shadcn/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/ui/shadcn/ui/card";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import ImageUploading, {
  ImageListType,
  ImageType,
} from "react-images-uploading";
import { ImageHolder } from "@/ui/common/components/fields/files/types";
import { ServerService } from "@/common_lib/services/ServerService";
import { debugLog } from "@/utils/debug";
import { cn } from "@/utils/cn";

interface AssetImageUploaderProps {
  asset: AssetModel;
  onComplete?: (asset: AssetModel) => void;
  onCancel?: () => void;
}

export const AssetImageUploader = observer(function AssetImageUploader(
  props: AssetImageUploaderProps
) {
  const [wrappedImages, setWrappedImages] = useState<ImageHolder[]>([]);
  const [images, setImages] = useState<ImageType[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const onChange = (imageList: ImageListType) => {
    const newImages = imageList.map((image) => {
      return {
        file: image.file,
        uploading: false,
        errored: false,
        finished: false,
        dataURL: image.dataURL,
      } as ImageHolder;
    });

    setWrappedImages(newImages);
    setImages(imageList as never[]);
  };

  const getUploadData = async (file: File) => {
    const results = await ServerService.callGet("asset-file", "presignedURL", {
      name: file.name,
      type: file.type,
    });

    return results.data.url;
  };

  const uploadToAWS = async (
    file: File,
    fileLocation: string,
    index: number
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
      fileLocation.split("?")[0] as string
    );
    setWrappedImages([...wrappedImages]);
  };

  const handleUpload = async () => {
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
        assetFile.asset_id = props.asset.id;
        assetFile.file_name = image.file.name;
        if (image.file.type.includes("image")) {
          assetFile.file_type = AssetFileTypes.Image;
        } else if (image.file.type.includes("video")) {
          assetFile.file_type = AssetFileTypes.Video;
        } else {
          assetFile.file_type = AssetFileTypes.Document;
        }
        assetFile.file_location = image.assetURL;
        props.asset.save();
      }
    });

    setIsUploading(false);
  };

  const handleComplete = () => {
    if (props.onComplete) {
      props.onComplete(props.asset);
    }
  };

  const handleCancel = () => {
    if (props.onCancel) {
      props.onCancel();
    }
  };

  const uploadedCount = wrappedImages.filter((img) => img.finished).length;
  const totalCount = wrappedImages.length;
  const hasFiles = wrappedImages.length > 0;
  const allUploaded = uploadedCount === totalCount && totalCount > 0;

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle>Upload asset media</CardTitle>
        <CardDescription>
          Add photos, BOMs, service logs, and documentation for{" "}
          {props.asset.label || "your asset"}.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(320px,1fr)]">
        <div className="space-y-6">
          <ImageUploading
            multiple={true}
            value={images}
            onChange={onChange}
            maxNumber={50}
            allowNonImageType={true}
          >
            {({ onImageUpload, onImageRemoveAll, onImageRemove, dragProps }) => (
              <div className="space-y-4">
                <div
                  className={cn([
                    "flex min-h-64 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed bg-background/80 p-6 text-center text-sm text-muted-foreground transition-colors",
                    "border-muted-foreground/30 hover:border-muted-foreground/50 hover:bg-muted/50",
                  ])}
                  onClick={onImageUpload}
                  {...dragProps}
                >
                  <svg
                    className="mb-4 size-12 text-muted-foreground/50"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  <p className="mb-2">
                    Drop files or <span className="text-primary">browse</span>
                  </p>
                  <p className="text-xs">Max 5GB · auto-blur serials</p>
                </div>

                {hasFiles && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      {totalCount} file{totalCount !== 1 ? "s" : ""} selected
                      {uploadedCount > 0 && ` · ${uploadedCount} uploaded`}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={onImageRemoveAll}
                    >
                      Remove All
                    </Button>
                  </div>
                )}

                <div className="grid gap-2 md:grid-cols-2">
                  {wrappedImages.map((image, index) => (
                    <FilePreviewCard
                      key={index}
                      image={image}
                      onRemove={() => onImageRemove(index)}
                    />
                  ))}
                </div>
              </div>
            )}
          </ImageUploading>
        </div>

        <div className="space-y-6">
          <Card className="border-dashed bg-muted/30">
            <CardHeader>
              <CardTitle>Upload progress</CardTitle>
              <CardDescription>Track your file uploads here.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {!hasFiles && (
                <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-muted-foreground/30 bg-background/80 p-6 text-center text-sm text-muted-foreground">
                  <p>No files selected</p>
                  <p className="mt-2 text-xs">Add files to begin uploading</p>
                </div>
              )}
              {hasFiles && (
                <div className="space-y-2 text-sm">
                  {wrappedImages.map((image, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between rounded-xl bg-background p-3"
                    >
                      <span className="truncate">
                        {image.file.name.length > 20
                          ? `${image.file.name.substring(0, 20)}...`
                          : image.file.name}
                      </span>
                      <span
                        className={cn([
                          image.uploading && "text-muted-foreground",
                          image.finished && "text-emerald-600",
                          image.errored && "text-red-600",
                        ])}
                      >
                        {image.uploading && "Uploading..."}
                        {image.finished && !image.errored && "Verified"}
                        {image.errored && "Failed"}
                        {!image.uploading &&
                          !image.finished &&
                          !image.errored &&
                          "Pending"}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Checklist</CardTitle>
              <CardDescription>
                Everything needed for automatic matching.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span>Asset details completed</span>
                <div
                  className={cn([
                    "flex size-5 items-center justify-center rounded-full",
                    "bg-emerald-600 text-white",
                  ])}
                >
                  <i className="fa fa-check fa-xs"></i>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span>Files uploaded</span>
                <div
                  className={cn([
                    "flex size-5 items-center justify-center rounded-full",
                    allUploaded
                      ? "bg-emerald-600 text-white"
                      : "border border-muted-foreground bg-background text-muted-foreground",
                  ])}
                >
                  {allUploaded && <i className="fa fa-check fa-xs"></i>}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span>Ready for matching</span>
                <div
                  className={cn([
                    "flex size-5 items-center justify-center rounded-full",
                    allUploaded
                      ? "bg-emerald-600 text-white"
                      : "border border-muted-foreground bg-background text-muted-foreground",
                  ])}
                >
                  {allUploaded && <i className="fa fa-check fa-xs"></i>}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex gap-2">
              {!allUploaded && (
                <>
                  <Button
                    variant="outline"
                    onClick={handleCancel}
                    className="flex-1"
                  >
                    Skip for now
                  </Button>
                  <Button
                    onClick={handleUpload}
                    disabled={!hasFiles || isUploading}
                    className="flex-1"
                  >
                    {isUploading ? "Uploading..." : "Upload Files"}
                  </Button>
                </>
              )}
              {allUploaded && (
                <Button onClick={handleComplete} className="w-full">
                  Complete & Continue
                </Button>
              )}
            </CardFooter>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
});

const FilePreviewCard = observer(function FilePreviewCard(props: {
  image: ImageHolder;
  onRemove: () => void;
}) {
  const { image } = props;
  const fileType = image.file?.type || "";
  const isImage = fileType.includes("image");
  const isPDF = fileType.includes("pdf");

  return (
    <div className="relative flex flex-col overflow-hidden rounded-xl border bg-background">
      <div className="flex h-32 items-center justify-center overflow-hidden bg-muted/30">
        {isImage && image.dataURL && (
          <img
            src={image.dataURL}
            alt={image.file.name}
            className="size-full object-cover"
          />
        )}
        {isPDF && (
          <div className="flex size-full items-center justify-center">
            <i className="fa fa-file-pdf fa-3x text-muted-foreground"></i>
          </div>
        )}
        {!isImage && !isPDF && (
          <div className="flex size-full items-center justify-center">
            <i className="fa fa-file fa-3x text-muted-foreground"></i>
          </div>
        )}
      </div>
      <div className="flex items-center justify-between gap-2 p-3">
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium">{image.file.name}</p>
          <p className="text-xs text-muted-foreground">
            {(image.file.size / 1024).toFixed(1)} KB
          </p>
        </div>
        <div className="flex items-center gap-2">
          {image.uploading && (
            <i className="fa fa-spinner fa-spin text-muted-foreground"></i>
          )}
          {image.finished && !image.errored && (
            <div className="flex size-6 items-center justify-center rounded-full bg-emerald-600 text-white">
              <i className="fa fa-check fa-xs"></i>
            </div>
          )}
          {image.errored && (
            <div className="flex size-6 items-center justify-center rounded-full bg-red-600 text-white">
              <i className="fa fa-times fa-xs"></i>
            </div>
          )}
          <button
            type="button"
            onClick={props.onRemove}
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            <svg
              className="size-4"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 6h18"></path>
              <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
              <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
              <line x1="10" x2="10" y1="11" y2="17"></line>
              <line x1="14" x2="14" y1="11" y2="17"></line>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
});

const formatImageURL = (url: string) => {
  return url.replace("https://s3.us-east-1.amazonaws.com/", "https://");
};
