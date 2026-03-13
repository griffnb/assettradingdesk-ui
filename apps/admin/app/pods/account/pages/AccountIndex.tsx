import { LayerService } from "@/common_lib/services/LayerService";

import { StandardTableWrap } from "@/ui/common/components/table/StandardTableWrap";
import {
  AccountFormModal,
  AccountFormModalId,
} from "../components/AccountFormModal";

import {
  parseSearchParams,
  queryToFilters,
} from "@/common_lib/utils/query/builder";
import { status } from "@/models/models/account/_constants/status";
import { AccountModel } from "@/models/models/account/model/AccountModel";
import { BreadcrumbService } from "@/ui/admin/nav/BreadcrumbService";
import { DefaultMassActions } from "@/ui/common/components/table/nav/DefaultMassActions";
import { observer } from "mobx-react-lite";
import { useEffect, useMemo } from "react";
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

  useEffect(() => {
    BreadcrumbService.setSegments([
      { label: "Home", href: "/" },
      { label: "Accounts" },
    ]);
  }, []);


  return (
    <>
      <StandardTableWrap<AccountModel>
        className="[&_*[data-slot='table-wrap']]:overflow-x-auto"
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
