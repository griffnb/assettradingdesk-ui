import { LayerService } from "@/common_lib/services/LayerService";
import { ServerService } from "@/common_lib/services/ServerService";
import { StoreKeys } from "@/models/types/store_keys";
import { debugLog } from "@/utils/debug";
import { observer } from "mobx-react-lite";
import { ReactNode, useState } from "react";
import ImageUploading, {
  ImageListType,
  ImageType,
} from "react-images-uploading";
import PreviewFile, { PreviewModalID } from "./PreviewFile";
import { getMimeType } from "./types";

interface S3FileUploadInputProps {
  previewURL?: string;
  model: StoreKeys;
  path: string;
  extraParams?: { [key: string]: string | string[] };
  uploadCallback(assetURL: string): void;
  nonImages?: boolean;
  autoUpload?: boolean;
  errorMessages?: string[];
  helpText?: ReactNode;
  onChange?: (uploadNow: () => void) => void;
  appendChild?: ReactNode;
}

export const S3FileUploadInput = observer(function S3FileUploadInput(
  props: S3FileUploadInputProps,
) {
  const [images, setImages] = useState<ImageType[]>([]);
  const [previewURL] = useState<string | undefined>(props.previewURL);

  const [uploading, setUploading] = useState<boolean>(false);

  const hasErrors = props.errorMessages && props.errorMessages?.length > 0;

  const onChange = (imageList: ImageListType) => {
    setImages(imageList);

    const image = imageList[0];
    if (!image) return;

    if (props.autoUpload) {
      handleSubmission(image);
    }

    if (props.onChange) {
      props.onChange(() => {
        handleSubmission(image);
      });
    }
  };

  const handleSubmission = async (image: ImageType) => {
    if (!image || !image.file) return;
    const fileLocation = await getUploadData(image.file);
    const success = await uploadToAWS(image.file, fileLocation);

    if (!success) return;
    const assetURL = formatImageURL(fileLocation.split("?")[0] as string);
    props.uploadCallback(assetURL);
  };

  const getUploadData = async (file: File) => {
    const results = await ServerService.callGet(props.model, props.path, {
      name: file.name,
      type: file.type,
      ...(props.extraParams || {}),
    });

    return results.data.url;
  };

  const uploadToAWS = async (
    file: File,
    fileLocation: string,
  ): Promise<boolean> => {
    setUploading(true);
    //Make put request with raw file as body
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": file.type },
      body: file,
    };
    try {
      //Perform the upload
      await fetch(fileLocation, requestOptions);
      setUploading(false);
      return true;
    } catch (error) {
      debugLog(error);
    }
    setUploading(false);
    return false;
  };

  let fileName = previewURL?.split("/").pop() || "";
  let type = getMimeType(fileName?.split(".").pop() || "");
  let fileURL = previewURL;

  if (images.length > 0) {
    const img = images[0];
    if (img && img.file) {
      type = img.file.type;
      fileName = img.file.name;
      fileURL = img.dataURL;
    }
  }

  const preview = () => {
    if (!fileURL) return;

    LayerService.add({
      id: PreviewModalID,
      component: PreviewFile,
      props: { fileURL, type, fileName },
    });
  };

  return (
    <ImageUploading
      multiple={false}
      value={images}
      onChange={onChange}
      maxNumber={1}
      allowNonImageType={props.nonImages}
    >
      {({ onImageUpload }) => (
        <>
          <div className="flex flex-1">
            <div
              className={`relative flex w-full cursor-pointer items-center rounded-lg border bg-white text-xs text-gray-400 ${hasErrors ? "!border-error-600" : ""}`}
            >
              <span
                className="relative -ml-px inline-flex items-center rounded-l-md border-r px-3 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-50"
                onClick={onImageUpload}
              >
                {uploading ? (
                  <i className="fa fa-spinner fa-spin"></i>
                ) : (
                  <svg
                    className="size-5 text-gray-500"
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
                )}
              </span>

              <input
                type={"text"}
                value={fileName} // Type casting to string
                placeholder={"Upload File"}
                className={`w-full flex-1 rounded-lg border-none px-4 py-1.5 text-gray-700 !ring-0 placeholder:text-gray-500 disabled:text-gray-300`}
                readOnly={true}
                onClick={onImageUpload}
              />

              {hasErrors ? (
                <div className="pointer-events-none relative inset-y-0 right-0 flex items-center pr-3">
                  <svg
                    className="size-5 text-error-600"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              ) : null}

              <span
                className="border-l-1 flex h-full items-center px-3 text-sm font-semibold text-gray-900 hover:bg-gray-50"
                onClick={() => preview()}
              >
                <i className="fa fa-eye"></i>
              </span>

              {props.appendChild ? props.appendChild : null}
            </div>
            {props.helpText ? (
              <p className="mt-2 text-sm text-gray-600">{props.helpText}</p>
            ) : null}

            {props.errorMessages && props.errorMessages?.length > 0 ? (
              <p className="mt-2 text-xs text-error-700">
                {props.errorMessages.map((msg, index) => (
                  <span key={index}>
                    {msg}
                    <br />
                  </span>
                ))}
              </p>
            ) : null}
          </div>
        </>
      )}
    </ImageUploading>
  );
});

export default S3FileUploadInput;

const formatImageURL = (url: string) => {
  return url.replace("https://s3.us-east-1.amazonaws.com/", "https://");
};
