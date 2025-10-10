import { AiToolsTable } from "@/ui/customer/ai_tools/AiToolsTable";
import { parseSearchParams, queryToFilters } from "@/utils/query/builder";
import { observer } from "mobx-react-lite";
import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router";

export const AiToolIndex = observer(function AiToolIndex() {
  const [searchParams, setSearchParams] = useSearchParams();

  const appliedFilters = useMemo(
    () =>
      queryToFilters(parseSearchParams(searchParams), {
        status: [],
        limit: "100",
      }),
    [searchParams]
  );

  const applyFilters = useCallback(
    (params: { [key: string]: string | string[] }) => {
      setSearchParams(params);
    },
    [setSearchParams]
  );
  return (
    <>
      <AiToolsTable
        columns={[]}
        modelType="ai_tool"
        noCount={true}
        appliedFilters={appliedFilters}
        applyFilters={applyFilters}
      />
    </>
  );
});
