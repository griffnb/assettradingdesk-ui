import { AssetModel } from "@/models/models/asset/model/AssetModel";
import { SidePanelWrap } from "@/ui/common/components/side-panel/SidePanelWrap";
import { Button } from "@/ui/shadcn/ui/button";
import { observer } from "mobx-react-lite";

interface AssetPreviewProps {
  record: AssetModel;
}

export const AssetPreviewId = "AssetPreview";

export const AssetPreview = observer(function AssetPreview(
  props: AssetPreviewProps,
) {
  const { record } = props;

  return (
    <SidePanelWrap
      id={AssetPreviewId}
      size="md"
      title="Asset Details"
      resizeable={true}
    >
      <div className="flex flex-col gap-6 p-6">
        {/* Image Section */}
        <div className="aspect-video w-full overflow-hidden rounded-lg bg-gray-100">
          <img
            src={record.mediumImage}
            alt={record.label}
            className="h-full w-full object-cover"
          />
        </div>

        {/* Header Info */}
        <div>
          <h2 className="text-xl font-bold text-gray-900">{record.label}</h2>
          <p className="text-sm text-gray-500">{record.serial_number}</p>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-500">
              Location
            </label>
            <p className="text-sm font-medium text-gray-900">
              {record.location || "-"}
            </p>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-500">Year</label>
            <p className="text-sm font-medium text-gray-900">
              {record.year || "-"}
            </p>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-500">Price</label>
            <p className="text-sm font-medium text-gray-900">
              {record.price
                ? new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(record.price)
                : "-"}
            </p>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-500">
              Quantity
            </label>
            <p className="text-sm font-medium text-gray-900">
              {record.quantity || "-"}
            </p>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-500">
              Install Status
            </label>
            <p className="text-sm font-medium text-gray-900">
              {record.install_statusFmt}
            </p>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-500">
              Operational Status
            </label>
            <p className="text-sm font-medium text-gray-900">
              {record.operational_statusFmt}
            </p>
          </div>
        </div>

        {/* Description */}
        {record.description && (
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-900">
              Description
            </label>
            <p className="text-sm text-gray-600">{record.description}</p>
          </div>
        )}

        {/* Configuration Notes */}
        {record.configuration_notes && (
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-900">
              Configuration Notes
            </label>
            <p className="text-sm text-gray-600">
              {record.configuration_notes}
            </p>
          </div>
        )}

        {/* Actions */}
        <div className="mt-auto flex gap-3 pt-6">
          <Button
            className="flex-1"
            variant="outline"
            onClick={() => window.open(record.publicLink, "_blank")}
          >
            View Public Page
          </Button>
          <Button
            className="flex-1"
            onClick={() =>
              (window.location.href = `/manage/assets/edit/${record.id}`)
            }
          >
            Edit Asset
          </Button>
        </div>
      </div>
    </SidePanelWrap>
  );
});
