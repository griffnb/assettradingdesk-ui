import {StandardTableWrap} from "@/ui/common/components/table/StandardTableWrap";
import { AdminTitleBar } from "@/ui/admin/nav/AdminTitleBar";
import { LayerService } from "@/common_lib/services/LayerService";
import {
  SubscriptionFormModal,
  SubscriptionFormModalId,
} from "../components/SubscriptionFormModal";
import { useSearchParams } from "react-router";
import {DefaultMassActions} from "@/ui/common/components/table/nav/DefaultMassActions";
import { MassActionProps } from "@/ui/common/components/types/mass-actions";
import { SubscriptionModel } from "@/models/models/subscription/model/SubscriptionModel";
import { parseSearchParams, queryToFilters } from "@/utils/query/builder";
import { observer } from "mobx-react-lite";
import { status } from "@/models/models/subscription/_constants/status";
import { columns } from "../columns";
import { filters } from "../filters";
import { useMemo } from "react";



export const SubscriptionIndex = observer(function SubscriptionIndex() {
  const [searchParams,setSearchParams] = useSearchParams();

  const appliedFilters = useMemo(
    () =>
      queryToFilters(parseSearchParams(searchParams), {
        status: [],
        limit: "100",
      }),
    [searchParams],
  );
 

  const applyFilters = (params: { [key: string]: string | string[] }) => {
    delete params.reload;
    setSearchParams(params);
  };
  return (
    <>
      <AdminTitleBar title="Subscriptions" />
      <StandardTableWrap<SubscriptionModel>
        className="[&_*[data-slot='table-wrap']]:h-[calc(100dvh-var(--warning-bar,0px)-var(--table-footer,0px)-var(--table-nav,0px)-var(--admin-title-bar,0px)-var(--admin-header,0px))] [&_*[data-slot='table-wrap']]:overflow-x-auto"
        newComponent={(tableState) => {
          LayerService.add(
            SubscriptionFormModalId,
            SubscriptionFormModal,
            {onSave: () => tableState.reloadData()},
          );
        }}
        columns={columns}
        statuses={status}
        modelType="subscription"
        filters={filters}
        applyFilters={applyFilters}
        appliedFilters={appliedFilters}
        selectRows={true}
        tableSearch={true}
        tableExport={true}
        hideTotalRow={true}
        infiniteScroll={true}
        massActions={[
          (props) => <DefaultMassActions {...props} />,
        ]}
      />
    </>
  );
});

