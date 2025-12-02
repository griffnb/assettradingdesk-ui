import { LayerService } from "@/common_lib/services/LayerService";
import { status } from "@/models/models/industry/_constants/status";
import { IndustryModel } from "@/models/models/industry/model/IndustryModel";
import { AdminTitleBar } from "@/ui/admin/nav/AdminTitleBar";
import { DefaultMassActions } from "@/ui/common/components/table/nav/DefaultMassActions";
import { StandardTableWrap } from "@/ui/common/components/table/StandardTableWrap";
import { parseSearchParams, queryToFilters } from "@/utils/query/builder";
import { observer } from "mobx-react-lite";
import { useMemo } from "react";
import { useSearchParams } from "react-router";
import { columns } from "../columns";
import {
  IndustryFormModal,
  IndustryFormModalId,
} from "../components/IndustryFormModal";
import { filters } from "../filters";

export const IndustryIndex = observer(function IndustryIndex() {
  const [searchParams, setSearchParams] = useSearchParams();

  const appliedFilters = useMemo(
    () =>
      queryToFilters(parseSearchParams(searchParams), {
        status: [],
        limit: "100",
      }),
    [searchParams],
  );

  const applyFilters = (params: { [key: string]: string | string[] }) => {
    setSearchParams(params);
  };
  return (
    <>
      <AdminTitleBar title="Industries" />
      <StandardTableWrap<IndustryModel>
        className="[&_*[data-slot='table-wrap']]:h-[calc(100svh-var(--warning-bar,0px)-var(--title-bar,175px))] [&_*[data-slot='table-wrap']]:overflow-x-auto"
        newComponent={() => {
          LayerService.add(IndustryFormModalId, IndustryFormModal, {
            onSave: () => applyFilters({ ...appliedFilters }),
          });
        }}
        columns={columns}
        statuses={status}
        modelType="industry"
        filters={filters}
        applyFilters={applyFilters}
        appliedFilters={appliedFilters}
        selectRows={true}
        tableSearch={true}
        tableExport={true}
        hideTotalRow={true}
        infiniteScroll={true}
        massActions={[(props) => <DefaultMassActions {...props} />]}
      />
    </>
  );
});
