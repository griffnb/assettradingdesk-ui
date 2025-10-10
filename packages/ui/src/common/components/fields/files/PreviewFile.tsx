import { LayerService } from "@/common_lib/services/LayerService";
import { observer } from "mobx-react-lite";

export const PreviewModalID = "preview-file-modal";

interface PreviewFileProps {
  fileURL: string;
  type: string;
  fileName: string;
}

const PreviewFile = observer((props: PreviewFileProps) => {
  const closeHandler = () => {
    LayerService.remove(PreviewModalID);
  };

  const className =
    "mt-[5%] flex min-h-[300px] min-w-[800px] transform flex-col rounded-lg border bg-white text-left shadow-xl transition-all max-h-[90vh] overflow-auto";

  let type = "unknown";

  if (props.type.includes("image")) {
    type = "image";
  }

  if (props.type.includes("video")) {
    type = "video";
  }

  if (props.type.includes("pdf")) {
    type = "pdf";
  }

  return (
    <div
      className="relative z-modal"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed z-modal w-full overflow-y-auto">
        {/* Background overlay */}
        <div
          className="fixed inset-0 bg-gray-500/80 backdrop-blur-md transition-opacity"
          onClick={closeHandler}
        ></div>

        {/* Modal */}
        <div className="mx-auto flex w-fit">
          <div className={className}>
            <div className="flex flex-row-reverse items-center justify-between rounded-t-lg border-b-2 border-gray-200 bg-gray-50 p-2">
              <div className="">
                <button
                  type="button"
                  className="ml-auto flex size-[40px] items-center justify-center rounded-full border-2 border-gray-300 bg-white p-2.5"
                  onClick={closeHandler}
                >
                  <span className="sr-only">Close</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    className="size-3.5"
                  >
                    <path
                      d="M8.27032 7.0002L13.0257 2.24484C13.1115 2.16197 13.1799 2.06283 13.227 1.95322C13.2741 1.84361 13.2989 1.72572 13.2999 1.60643C13.301 1.48713 13.2782 1.36883 13.233 1.25842C13.1879 1.148 13.1212 1.04769 13.0368 0.963337C12.9525 0.878982 12.8521 0.812271 12.7417 0.767098C12.6313 0.721924 12.513 0.699193 12.3937 0.700229C12.2744 0.701266 12.1565 0.72605 12.0469 0.773135C11.9373 0.820221 11.8382 0.888665 11.7553 0.974473L6.99995 5.72983L2.2446 0.974473C2.07515 0.810818 1.84821 0.720262 1.61265 0.722309C1.37708 0.724356 1.15175 0.818842 0.985173 0.985417C0.818598 1.15199 0.724112 1.37733 0.722065 1.61289C0.720018 1.84845 0.810574 2.0754 0.974229 2.24484L5.72958 7.0002L0.974229 11.7555C0.888421 11.8384 0.819977 11.9376 0.772891 12.0472C0.725806 12.1568 0.701022 12.2747 0.699985 12.394C0.698948 12.5133 0.72168 12.6316 0.766853 12.742C0.812027 12.8524 0.878738 12.9527 0.963093 13.0371C1.04745 13.1214 1.14776 13.1881 1.25817 13.2333C1.36858 13.2785 1.48689 13.3012 1.60618 13.3002C1.72547 13.2991 1.84336 13.2743 1.95297 13.2273C2.06259 13.1802 2.16172 13.1117 2.2446 13.0259L6.99995 8.27056L11.7553 13.0259C11.9247 13.1896 12.1517 13.2801 12.3873 13.2781C12.6228 13.276 12.8482 13.1815 13.0147 13.015C13.1813 12.8484 13.2758 12.6231 13.2778 12.3875C13.2799 12.1519 13.1893 11.925 13.0257 11.7555L8.27032 7.0002Z"
                      fill="#374151"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {(() => {
              switch (type) {
                case "image":
                  return (
                    <img
                      className="h-auto max-w-full rounded-lg"
                      src={props.fileURL}
                      alt=""
                    />
                  );
                case "video":
                  return (
                    <video
                      className="h-auto max-w-full rounded-lg"
                      src={props.fileURL}
                      controls={true}
                    />
                  );
                case "pdf":
                  return (
                    <iframe
                      src={props.fileURL}
                      width="100%"
                      height="600"
                    ></iframe>
                  );
                default:
                  return (
                    <div className="h-full w-full overflow-auto rounded-lg border border-gray-200 bg-white">
                      <p className="flex flex-col items-center pt-10 text-center text-sm text-gray-500">
                        <div>{props.fileName}</div>
                        <div>{props.type}</div>
                      </p>
                    </div>
                  );
              }
            })()}
          </div>
        </div>
      </div>
    </div>
  );
});

export default PreviewFile;
