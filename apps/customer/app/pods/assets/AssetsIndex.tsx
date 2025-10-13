import { AssetTable } from "@/ui/customer/assets/AssetTable";
import {
  applyQueryFilters,
  parseSearchParams,
  queryToFilters,
} from "@/utils/query/builder";
import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import { useMemo } from "react";
import { useSearchParams } from "react-router";

export const AssetsIndex = observer(function AssetIndex() {
  const [params, setParams] = useSearchParams();

  const appliedFilters = useMemo(
    () =>
      queryToFilters(parseSearchParams(params), {
        status: [],
        limit: "100",
      }),
    [params],
  );

  console.log(appliedFilters, params);

  const applyFilters = (params: { [key: string]: string | string[] }) => {
    console.log("APPLY FILTERS", toJS(params));
    //setParams(params);
    applyQueryFilters(setParams, params);
  };
  return (
    <>
      <AssetTable appliedFilters={appliedFilters} applyFilters={applyFilters} />
    </>
  );
});
