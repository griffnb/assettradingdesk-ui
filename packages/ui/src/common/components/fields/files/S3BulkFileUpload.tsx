import { ServerService } from "@/common_lib/services/ServerService";
import { debugLog } from "@/utils/debug";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import ImageUploading, {
  ImageListType,
  ImageType,
} from "react-images-uploading";
import BulkFileCard from "./BulkFileCard";
import { ImageHolder } from "./types";

interface S3BulkFileUploadProps {
  route: string;
  path: string;
  extraParams?: { [key: string]: string | string[] };
  uploadCallback(images: ImageHolder[]): void;
  multiple: boolean;
  maxNumber: number;
  nonImages?: boolean;
  label: string;
}

export const S3BulkFileUpload = observer(function S3BulkFileUpload(
  props: S3BulkFileUploadProps,
) {
  const [wrappedImages, setWrappedImages] = useState<ImageHolder[]>([]);
  const [images, setImages] = useState<ImageType[]>([]);

  const onChange = (imageList: ImageListType) => {
    const images = imageList.map((image) => {
      return {
        file: image.file,
        uploading: false,
        errored: false,
        finished: false,
        dataURL: image.dataURL,
      };
    });

    setWrappedImages(images as ImageHolder[]);
    setImages(imageList as never[]);
  };

  const handleSubmission = async () => {
    for (let i = 0; i < images.length; i++) {
      const img = images[i];
      if (!img || !img.file) return;
      const fileLocation = await getUploadData(img.file);
      await uploadToAWS(img.file, fileLocation, i);
    }
    props.uploadCallback(wrappedImages);
  };

  const getUploadData = async (file: File) => {
    const results = await ServerService.callGet(props.route, props.path, {
      name: file.name,
      type: file.type,
      ...(props.extraParams || {}),
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

    //Make put request with raw file as body
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": file.type },
      body: file,
    };
    try {
      //Perform the upload
      await fetch(fileLocation, requestOptions);
    } catch (error) {
      debugLog(error);
    }
    wrappedImage.uploading = false;
    wrappedImage.finished = true;
    wrappedImage.assetURL = formatImageURL(
      fileLocation.split("?")[0] as string,
    );
    setWrappedImages([...wrappedImages]);
  };

  return (
    <ImageUploading
      multiple={props.multiple}
      value={images}
      onChange={onChange}
      maxNumber={props.maxNumber}
      allowNonImageType={props.nonImages}
    >
      {({ onImageUpload, onImageRemoveAll, onImageRemove, dragProps }) => (
        // write your building UI
        <>
          <div className="flex w-full flex-col items-center justify-center">
            <div className="flex w-full flex-row items-center justify-between p-3">
              <div className="font-semibold text-gray-700">{props.label}</div>
              <div className="flex flex-row gap-x-3">
                <button
                  className="rounded-lg bg-green-light-700 px-2 py-1 font-semibold text-white shadow-md"
                  onClick={handleSubmission}
                >
                  Upload <i className="fa fa-arrow-up fa-xs"></i>
                </button>
                <button
                  className="rounded-lg bg-error-500 px-2 py-1 font-semibold text-white shadow-md"
                  onClick={onImageRemoveAll}
                >
                  Remove All <i className="fa fa-trash fa-xs"></i>
                </button>
              </div>
            </div>
            <div
              className="relative flex min-h-64 w-full cursor-pointer flex-col items-center justify-start rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 px-2 hover:bg-gray-100"
              onClick={onImageUpload}
              {...dragProps}
            >
              <div className="absolute flex h-full flex-col items-center justify-center pb-6 pt-5">
                <svg
                  className="mb-4 size-8 text-gray-500"
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
                <p className="mb-2 text-sm text-gray-500">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
              </div>
              <div className="grid grid-cols-4 gap-x-2 empty:gap-0">
                {wrappedImages.map((image, index) => (
                  <BulkFileCard
                    key={index}
                    file={image}
                    onRemove={() => onImageRemove(index)}
                  />
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </ImageUploading>
  );
});

const formatImageURL = (url: string) => {
  return url.replace("https://s3.us-east-1.amazonaws.com/", "https://");
};
