import { AssetModel } from "@/models/models/asset/model/AssetModel";
import { AssetFileTypes } from "@/models/models/asset_file/_constants/file_type";
import { cn } from "@/utils/cn";
import { observer } from "mobx-react-lite";

export interface ProductSpecsProps {
  asset: AssetModel;
  className?: string;
}

export const ProductSpecs = observer(function ProductSpecs({
  asset,
  className,
}: ProductSpecsProps) {
  const extraFiles = asset.asset_files
    ? asset.asset_files.filter((file) => file.file_type != AssetFileTypes.Image)
    : [];

  return (
    <>
      <div className={cn("flex w-full flex-col gap-1", className)}>
        <h3 className="text-lg font-semibold text-gray-700">Description</h3>
        <div>{asset.description}</div>
        <h3 className="text-lg font-semibold text-gray-700">Configuration</h3>
        <div>{asset.configuration_notes}</div>
      </div>
      {extraFiles.length > 0 && (
        <div className={cn("flex w-full flex-col gap-1", className)}>
          <h3 className="text-lg font-semibold text-gray-700">Files</h3>
          <ul className="list-disc pl-5">
            {extraFiles.map((file) => (
              <li key={file.id}>
                <a
                  href={file.file_location}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {file.file_name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
});
