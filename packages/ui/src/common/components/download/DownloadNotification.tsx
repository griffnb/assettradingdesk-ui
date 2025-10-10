import { DownloadService } from "@/common_lib/services/DownloadService";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { Button } from "../buttons/Button";

const DownloadNotification = observer(() => {
  const [show, setShow] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [downloadURL, setDownloadURL] = useState<string | null>(null);

  useEffect(() => {
    setShow(DownloadService.showNotification);
    setIsProcessing(!DownloadService.downloadReady);
    setDownloadURL(DownloadService.downloadURL);
  }, [DownloadService.showNotification, DownloadService.downloadReady]);

  const downloadFile = () => {
    if (downloadURL) {
      window.open(downloadURL, "_blank");
    }
    DownloadService.clearDownload();
  };

  return (
    <>
      {show && (
        <div className="absolute right-0 top-0 z-popover m-3 w-1/4 min-w-fit whitespace-nowrap rounded-xl border-2 border-gray-300 bg-white p-4 shadow-md">
          {isProcessing ? (
            <div className="flex items-center gap-x-4">
              <i className="fa fa-spinner fa-spin" />
              <div>
                <div className="text-gray-700">Processing File...</div>
                <div className="text-xs font-light text-gray-700">
                  Your File Will Be Available Shortly
                </div>
              </div>

              <div className="pole-loader flex-1 rounded-lg px-6 py-3 text-center font-semibold text-white">
                Processing
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-x-4">
              <i className="fa fa-check-circle text-green-500" />
              <div>
                <div className="text-gray-700">File Processing Complete</div>
                <div className="text-xs font-light text-gray-700">
                  Your File is now available to download
                </div>
              </div>

              <Button variant={"primary"} onClick={downloadFile}>
                <i className="fa-solid fa-download mr-2"></i>
                Download
              </Button>
            </div>
          )}
        </div>
      )}
    </>
  );
});

export default DownloadNotification;
