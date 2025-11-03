import { LayerService } from "@/common_lib/services/LayerService";

import { StandardTableWrap } from "@/ui/common/components/table/StandardTableWrap";
import {
  AccountFormModal,
  AccountFormModalId,
} from "../components/AccountFormModal";

import { status } from "@/models/models/account/_constants/status";
import { AccountModel } from "@/models/models/account/model/AccountModel";
import { DefaultMassActions } from "@/ui/common/components/table/nav/DefaultMassActions";
import { parseSearchParams, queryToFilters } from "@/utils/query/builder";
import { observer } from "mobx-react-lite";
import { useMemo } from "react";
import { useSearchParams } from "react-router";
import { columns } from "../columns";
import { filters } from "../filters";

export const AccountIndex = observer(() => {
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
      <StandardTableWrap<AccountModel>
        className="[&_*[data-slot='table-wrap']]:h-[calc(100svh-var(--warning-bar,0px)-var(--title-bar,175px))] [&_*[data-slot='table-wrap']]:overflow-x-auto"
        newComponent={() => {
          LayerService.add(AccountFormModalId, AccountFormModal, {
            onSave: () => applyFilters({ ...appliedFilters }),
          });
        }}
        columns={columns}
        statuses={status}
        modelType="account"
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
