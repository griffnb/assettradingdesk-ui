import { AssetModel } from "@/models/models/asset/model/AssetModel";
import { AssetFileTypes } from "@/models/models/asset_file/_constants/file_type";
import { Button } from "@/ui/shadcn/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/shadcn/ui/card";
import { runInAction } from "mobx";
import { observer } from "mobx-react-lite";

interface AssetExistingFilesProps {
  asset: AssetModel;
}

export const AssetExistingFiles = observer(function AssetExistingFiles({
  asset,
}: AssetExistingFilesProps) {
  const activeFiles = asset.asset_files.filter((f) => f.status !== 300);

  if (activeFiles.length === 0) {
    return null;
  }

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle>Existing Files</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {activeFiles.map((file) => (
          <div
            key={file.id}
            className="relative flex flex-col overflow-hidden rounded-xl border bg-background"
          >
            <div className="flex h-32 items-center justify-center overflow-hidden bg-muted/30">
              {file.file_type === AssetFileTypes.Image && (
                <img
                  src={file.mediumImage || file.file_location}
                  alt={file.file_name}
                  className="size-full object-cover"
                />
              )}
              {file.file_type !== AssetFileTypes.Image && (
                <div className="flex size-full items-center justify-center">
                  <i
                    className={`fa ${
                      file.file_type === AssetFileTypes.Video
                        ? "fa-file-video"
                        : "fa-file"
                    } fa-3x text-muted-foreground`}
                  ></i>
                </div>
              )}
            </div>
            <div className="flex items-center justify-between gap-2 p-3">
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{file.file_name}</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted-foreground hover:text-destructive"
                onClick={() => {
                  if (
                    window.confirm(
                      "Are you sure you want to delete this file? This action cannot be undone.",
                    )
                  ) {
                    runInAction(() => {
                      file.status = 300; // Deleted
                      file.save();
                    });
                  }
                }}
              >
                <i className="fa fa-trash"></i>
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
});
