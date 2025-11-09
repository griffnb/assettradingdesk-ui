import { StandardTableWrap } from "@/ui/common/components/table/StandardTableWrap";

import {
  AccountStatus,
  status,
} from "@/models/models/account/_constants/status";
import { AccountModel } from "@/models/models/account/model/AccountModel";
import { AccountService } from "@/models/models/account/services/AccountService";
import { AdminTitleBar } from "@/ui/admin/nav/AdminTitleBar";
import { MenuOption } from "@/ui/common/components/menu/MenuOption";
import { parseSearchParams, queryToFilters } from "@/utils/query/builder";
import { observer } from "mobx-react-lite";
import { useMemo } from "react";
import { useSearchParams } from "react-router";
import { columns } from "../columns";
import { filters } from "../filters";

export const TestingAccounts = observer(function TestingAccounts() {
  const [searchParams, setSearchParams] = useSearchParams();

  const appliedFilters = useMemo(
    () =>
      queryToFilters(parseSearchParams(searchParams), {
        status: [AccountStatus.Active.toString()],
        limit: "100",
        test_user_type: "1",
      }),
    [searchParams],
  );

  const applyFilters = (params: { [key: string]: string | string[] }) => {
    setSearchParams({ ...params, test_user_type: "1" });
  };

  const testUser = async () => {
    const resp = await AccountService.createTestUser({ login_as: true });

    if (resp.success) {
      //const customerURL = getPublicEnvVar("PUBLIC_CUSTOMER_URL");
      //window.open(`${customerURL}/`, "_blank");
      alert("Cookie should be set");
      return;
    } else {
      console.error(resp);
    }
  };

  return (
    <>
      <AdminTitleBar title="Testing Accounts" />
      <StandardTableWrap<AccountModel>
        className="[&_*[data-slot='table-wrap']]:overflow-x-auto"
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
        actionComponents={[
          () => (
            <MenuOption
              variant={"action"}
              onClick={() => testUser()}
              prependIcon={<i className="fa fa-user-tag"></i>}
              className="rounded-b-lg"
            >
              Standard Test User
            </MenuOption>
          ),
        ]}
      />
    </>
  );
});
