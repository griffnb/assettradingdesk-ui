"use client";

import { AssetModel } from "@/models/models/asset/model/AssetModel";
import { ImageHolder } from "@/ui/common/components/fields/files/types";
import { Button } from "@/ui/shadcn/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/ui/shadcn/ui/card";
import { cn } from "@/utils/cn";
import { observer } from "mobx-react-lite";
import ImageUploading, {
  ImageListType,
  ImageType,
} from "react-images-uploading";

interface AssetImageUploaderProps {
  asset: AssetModel;
  
  setImages: (images: ImageType[],wrappedImages: ImageHolder[]) => void;
  isUploading: boolean;
  uploadCount: number;
  wrappedImages: ImageHolder[];
  images: ImageType[];
}

export const AssetImageUploader = observer(function AssetImageUploader(
  props: AssetImageUploaderProps
) {
  const { wrappedImages, images } = props;
  
  

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

    
    props.setImages(imageList as never[], newImages);
  };




  const uploadedCount = wrappedImages.filter((img) => img.finished).length;
  const totalCount = wrappedImages.length;
  const hasFiles = wrappedImages.length > 0;
  

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


