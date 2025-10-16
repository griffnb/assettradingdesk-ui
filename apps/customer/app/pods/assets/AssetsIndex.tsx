import { AssetTable } from "@/ui/customer/assets/AssetTable";
import {
  applyQueryFilters,
  parseSearchParams,
  queryToFilters,
} from "@/utils/query/builder";
import { observer } from "mobx-react-lite";
import { useMemo } from "react";
import { useSearchParams } from "react-router";

export const AssetsIndex = observer(function AssetIndex() {
  const [params, setParams] = useSearchParams();

  const appliedFilters = useMemo(
    () =>
      queryToFilters(parseSearchParams(params), {
        status: [100],
        limit: "100",
        pictures: "1",
      }),
    [params],
  );

  const applyFilters = (params: { [key: string]: string | string[] }) => {
    applyQueryFilters(setParams, params);
  };
  return (
    <AssetTable appliedFilters={appliedFilters} applyFilters={applyFilters} />
  );
});
