import {StandardTableWrap} from "@/ui/common/components/table/StandardTableWrap";
import { AdminTitleBar } from "@/ui/admin/nav/AdminTitleBar";
import { LayerService } from "@/common_lib/services/LayerService";
import {
  MessageFormModal,
  MessageFormModalId,
} from "../components/MessageFormModal";
import { useSearchParams } from "react-router";
import {DefaultMassActions} from "@/ui/common/components/table/nav/DefaultMassActions";
import { MassActionProps } from "@/ui/common/components/types/mass-actions";
import { MessageModel } from "@/models/models/message/model/MessageModel";
import { parseSearchParams, queryToFilters } from "@/utils/query/builder";
import { observer } from "mobx-react-lite";
import { status } from "@/models/models/message/_constants/status";
import { columns } from "../columns";
import { filters } from "../filters";
import { useMemo } from "react";



export const MessageIndex = observer(function MessageIndex() {
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
      <AdminTitleBar title="Messages" />
      <StandardTableWrap<MessageModel>
        className="[&_*[data-slot='table-wrap']]:h-[calc(100dvh-var(--warning-bar,0px)-var(--table-footer,0px)-var(--table-nav,0px)-var(--admin-title-bar,0px)-var(--admin-header,0px))] [&_*[data-slot='table-wrap']]:overflow-x-auto"
        newComponent={(tableState) => {
          LayerService.add(
            MessageFormModalId,
            MessageFormModal,
            {onSave: () => tableState.reloadData()},
          );
        }}
        columns={columns}
        statuses={status}
        modelType="message"
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

