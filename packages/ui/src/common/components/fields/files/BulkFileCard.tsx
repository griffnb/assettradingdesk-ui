import { observer } from "mobx-react-lite";
import { getMimeType, ImageHolder } from "./types";

type BulkFileCardProps = {
  file: ImageHolder;
  onRemove: () => void;
};

const BulkFileCard = observer((props: BulkFileCardProps) => {
  let fileType = "";
  let fileURL = "";
  let fileName = "";
  if (props.file.dataURL) {
    fileType = props.file.file?.type || "";
    fileURL = props.file.dataURL || "";
    fileName = props.file.file?.name || "";
  } else {
    const cleanURL = props.file.assetURL.split("?")[0];
    fileURL = props.file.assetURL;
    fileName = cleanURL?.split("/").pop() || "";
    fileType = getMimeType(cleanURL?.split(".").pop() || "");
  }

  let type = "unknown";

  if (fileType.includes("image")) {
    type = "image";
  }

  if (fileType.includes("video")) {
    type = "video";
  }

  if (fileType.includes("pdf")) {
    type = "pdf";
  }

  return (
    <div className="relative mt-2 flex flex-col gap-y-2 rounded-xl border border-gray-200 bg-white p-2">
      <div className="flex h-32 overflow-hidden">
        {(() => {
          switch (type) {
            case "image":
              return (
                <img
                  className="mb-2 w-full rounded-lg object-cover"
                  src={fileURL}
                  alt=""
                />
              );
            case "video":
              return (
                <video
                  className="h-auto max-w-full rounded-lg"
                  src={fileURL}
                  controls={true}
                />
              );
            case "pdf":
              return <iframe className="size-full" src={fileURL}></iframe>;
            default:
              return (
                <div className="size-full overflow-auto rounded-lg border border-gray-200 bg-white">
                  <div className="flex flex-col items-center pt-10 text-center text-sm text-gray-500">
                    <div>{fileName}</div>
                    <div>{fileType}</div>
                  </div>
                </div>
              );
          }
        })()}
      </div>

      <div className="mb-1 flex items-center justify-between gap-x-3 whitespace-nowrap">
        <div className="w-10">
          {props.file.uploading && (
            <div className="flex size-8 items-center justify-center text-green-500">
              <i className="fa fa-spinner fa-spin"></i>
            </div>
          )}
          {props.file.finished && (
            <div className="flex size-8 items-center justify-center rounded-full border border-green-500 bg-white px-2 py-1 text-green-500">
              <i className="fa fa-check"></i>
            </div>
          )}
        </div>
        {props.onRemove && (
          <div className="flex items-center gap-x-2">
            <button
              type="button"
              className="text-gray-500 hover:text-gray-800 focus:text-gray-800 focus:outline-none dark:text-neutral-500 dark:hover:text-neutral-200 dark:focus:text-neutral-200"
              onClick={(event) => {
                event.stopPropagation();
                if (props.onRemove) {
                  props.onRemove();
                }
              }}
            >
              <svg
                className="size-3.5 shrink-0"
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
        )}
      </div>
    </div>
  );
});

export default BulkFileCard;
