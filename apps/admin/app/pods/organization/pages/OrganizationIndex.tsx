import { LayerService } from "@/common_lib/services/LayerService";
import {
  parseSearchParams,
  queryToFilters,
} from "@/common_lib/utils/query/builder";
import { status } from "@/models/models/organization/_constants/status";
import { OrganizationModel } from "@/models/models/organization/model/OrganizationModel";
import { BreadcrumbService } from "@/ui/admin/nav/BreadcrumbService";
import { DefaultMassActions } from "@/ui/common/components/table/nav/DefaultMassActions";
import { StandardTableWrap } from "@/ui/common/components/table/StandardTableWrap";
import { observer } from "mobx-react-lite";
import { useEffect, useMemo } from "react";
import { useSearchParams } from "react-router";
import { columns } from "../columns";
import {
  OrganizationFormModal,
  OrganizationFormModalId,
} from "../components/OrganizationFormModal";
import { filters } from "../filters";

export const OrganizationIndex = observer(function OrganizationIndex() {
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
  useEffect(() => {
    BreadcrumbService.setSegments([
      { label: "Home", href: "/" },
      { label: "Organizations" },
    ]);
  }, []);

  return (
    <>
      <StandardTableWrap<OrganizationModel>
        className="[&_*[data-slot='table-wrap']]:h-[calc(100svh-var(--warning-bar,0px)-var(--title-bar,175px))] [&_*[data-slot='table-wrap']]:overflow-x-auto"
        newComponent={() => {
          LayerService.add(OrganizationFormModalId, OrganizationFormModal, {
            onSave: () => applyFilters({ ...appliedFilters }),
          });
        }}
        columns={columns}
        statuses={status}
        modelType="organization"
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
