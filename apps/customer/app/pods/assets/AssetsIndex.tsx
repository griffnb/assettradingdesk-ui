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
    () => ({
      ...queryToFilters(parseSearchParams(params), {
        pictures: "1",
      }),
      status: ["100"],
      limit: "100",
    }),
    [params],
  );

  const applyFilters = (rawParams: { [key: string]: string | string[] }) => {
    const params = { ...rawParams };
    delete params["limit"];
    delete params["status"];

    applyQueryFilters(setParams, params);
  };
  return (
    <AssetTable appliedFilters={appliedFilters} applyFilters={applyFilters} />
  );
});
