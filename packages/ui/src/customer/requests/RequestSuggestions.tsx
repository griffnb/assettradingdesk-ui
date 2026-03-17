import { AssetModel } from "@/models/models/asset/model/AssetModel";
import { RequestModel } from "@/models/models/request/model/RequestModel";
import { Store } from "@/models/store/Store";
import { SidePanelWrap } from "@/ui/common/components/side-panel/SidePanelWrap";
import { Button } from "@/ui/shadcn/ui/button";
import { Spinner } from "@/ui/shadcn/ui/spinner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/ui/shadcn/ui/table";
import { ArrowUpDownIcon, ExternalLinkIcon } from "lucide-react";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";

interface RequestSuggestionsProps {
  record: RequestModel;
}

export const RequestSuggestionsId = "RequestSuggestions";

type SortField = "label" | "price" | "year" | "location" | "verified_at_ts";
type SortDirection = "asc" | "desc";

export const RequestSuggestions = observer(function RequestSuggestions(
  props: RequestSuggestionsProps,
) {
  const { record } = props;
  const [assets, setAssets] = useState<AssetModel[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [sortField, setSortField] = useState<SortField>("verified_at_ts");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");

  useEffect(() => {
    const loadSuggested = async () => {
      setIsLoading(true);

      const response = await Store.asset.queryRecords(
        `matches/${record.id}`,
        {
          limit: "100",
        },
        { skipCache: true },
      );

      if (response.success && response.data) {
        setAssets(response.data);
      }

      setIsLoading(false);
    };

    loadSuggested();
  }, [record.id]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      // Toggle direction
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      // New field, default to ascending
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const sortedAssets = [...assets].sort((a, b) => {
    let aVal: string | number;
    let bVal: string | number;

    switch (sortField) {
      case "label":
        aVal = a.label?.toLowerCase() || "";
        bVal = b.label?.toLowerCase() || "";
        break;
      case "price":
        aVal = a.price || 0;
        bVal = b.price || 0;
        break;
      case "year":
        aVal = a.year || 0;
        bVal = b.year || 0;
        break;
      case "location":
        aVal = a.location?.toLowerCase() || "";
        bVal = b.location?.toLowerCase() || "";
        break;
      case "verified_at_ts":
        aVal = a.verified_at_ts?.unix() || 0;
        bVal = b.verified_at_ts?.unix() || 0;
        break;
      default:
        return 0;
    }

    if (aVal < bVal) return sortDirection === "asc" ? -1 : 1;
    if (aVal > bVal) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  const SortButton = ({
    field,
    label,
  }: {
    field: SortField;
    label: string;
  }) => (
    <Button
      variant="ghost"
      onClick={() => handleSort(field)}
      className="flex h-8 items-center gap-1 px-2 hover:bg-muted"
    >
      {label}
      <ArrowUpDownIcon
        className={`size-3 ${sortField === field ? "text-primary" : "text-muted-foreground"}`}
      />
    </Button>
  );

  return (
    <SidePanelWrap
      id={RequestSuggestionsId}
      size="lg"
      title="Suggested Assets"
      resizeable={true}
    >
      <div className="flex h-full flex-col">
        {/* Request Info Header */}
        <div className="border-b bg-muted/30 p-6">
          <div className="space-y-1">
            <p className="text-xs uppercase tracking-wide text-muted-foreground">
              Request
            </p>
            <h2 className="text-xl font-bold text-gray-900">{record.label}</h2>
            {record.description && (
              <p className="text-sm text-gray-600">{record.description}</p>
            )}
          </div>

          <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
            {record.price_range && (
              <div className="space-y-1">
                <label className="text-xs font-medium text-gray-500">
                  Price Range
                </label>
                <p className="text-sm font-medium text-gray-900">
                  {record.price_range}
                </p>
              </div>
            )}
            {record.year_range && (
              <div className="space-y-1">
                <label className="text-xs font-medium text-gray-500">
                  Year Range
                </label>
                <p className="text-sm font-medium text-gray-900">
                  {record.year_range}
                </p>
              </div>
            )}
            {record.meta_data.install_statusesFmt &&
              record.meta_data.install_statusesFmt.length > 0 && (
                <div className="space-y-1">
                  <label className="text-xs font-medium text-gray-500">
                    Install Status
                  </label>
                  <p className="text-sm font-medium text-gray-900">
                    {record.meta_data.install_statusesFmt.join(", ")}
                  </p>
                </div>
              )}
            {record.meta_data.operational_statusesFmt &&
              record.meta_data.operational_statusesFmt.length > 0 && (
                <div className="space-y-1">
                  <label className="text-xs font-medium text-gray-500">
                    Operational Status
                  </label>
                  <p className="text-sm font-medium text-gray-900">
                    {record.meta_data.operational_statusesFmt.join(", ")}
                  </p>
                </div>
              )}
          </div>
        </div>

        {/* Table Content */}
        <div className="flex-1 overflow-auto p-6">
          {isLoading ? (
            <div className="flex h-48 items-center justify-center">
              <Spinner className="size-8 text-primary" />
            </div>
          ) : assets.length === 0 ? (
            <div className="flex h-48 flex-col items-center justify-center rounded-lg border border-muted/40 bg-muted/10">
              <p className="text-sm text-muted-foreground">
                No matching assets found yet. Check back soon.
              </p>
            </div>
          ) : (
            <div className="rounded-lg border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[40px]"></TableHead>
                    <TableHead>
                      <SortButton field="label" label="Asset" />
                    </TableHead>
                    <TableHead>
                      <SortButton field="price" label="Price" />
                    </TableHead>
                    <TableHead>
                      <SortButton field="year" label="Year" />
                    </TableHead>
                    <TableHead>
                      <SortButton field="location" label="Location" />
                    </TableHead>
                    <TableHead>Install Status</TableHead>
                    <TableHead>Operational Status</TableHead>
                    <TableHead>
                      <SortButton
                        field="verified_at_ts"
                        label="Last Verified"
                      />
                    </TableHead>
                    <TableHead className="w-[100px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedAssets.map((asset) => (
                    <TableRow key={asset.id} className="hover:bg-muted/50">
                      <TableCell>
                        {asset.mediumImage && (
                          <img
                            src={asset.mediumImage}
                            alt={asset.label}
                            className="size-10 rounded object-cover"
                          />
                        )}
                      </TableCell>
                      <TableCell className="font-medium">
                        <div className="flex flex-col">
                          <span>{asset.label}</span>
                          {asset.serial_number && (
                            <span className="text-xs text-muted-foreground">
                              {asset.serial_number}
                            </span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        {asset.price
                          ? new Intl.NumberFormat("en-US", {
                              style: "currency",
                              currency: "USD",
                            }).format(asset.price)
                          : "-"}
                      </TableCell>
                      <TableCell>{asset.year || "-"}</TableCell>
                      <TableCell>{asset.location || "-"}</TableCell>
                      <TableCell>{asset.install_statusFmt || "-"}</TableCell>
                      <TableCell>
                        {asset.operational_statusFmt || "-"}
                      </TableCell>
                      <TableCell>
                        {asset.verified_at_ts
                          ? new Date(
                              Number(asset.verified_at_ts),
                            ).toLocaleDateString()
                          : "-"}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            window.open(asset.publicLink, "_blank")
                          }
                          className="gap-1"
                        >
                          View
                          <ExternalLinkIcon className="size-3" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}

          {/* Summary */}
          {!isLoading && assets.length > 0 && (
            <div className="mt-4 text-sm text-muted-foreground">
              Showing {sortedAssets.length} matching asset
              {sortedAssets.length !== 1 ? "s" : ""}
            </div>
          )}
        </div>
      </div>
    </SidePanelWrap>
  );
});
