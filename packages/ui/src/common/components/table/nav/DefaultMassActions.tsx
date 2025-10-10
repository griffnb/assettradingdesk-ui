import { ServerService } from "@/common_lib/services/ServerService";
import { constants } from "@/models/constants";
import { Status } from "@/models/types/constants";
import { StoreKeys } from "@/models/types/store_keys";
import { observer } from "mobx-react-lite";
import { useMemo } from "react";
import { MenuOption } from "../../menu/MenuOption";
import { MassActionProps } from "../../types/mass-actions";

interface DefaultMassActionsProps<T extends object> extends MassActionProps<T> {
  statuses?: Status[];
}

const DefaultMassActions = observer(
  <T extends object>(rawProps: DefaultMassActionsProps<T>) => {
    const { tableState, ...props } = rawProps;
    if (!tableState.modelType) {
      return null;
    }

    const count = useMemo(() => {
      if (
        Object.keys(tableState.checked_row_ids).length == 0 ||
        props.allRows
      ) {
        return tableState.totalCount;
      }
      return Object.keys(tableState.checked_row_ids).length;
    }, [tableState, props.allRows]);

    //@ts-expect-error - TS doesn't know that constants[props.modelType] is a valid key
    const modelConstants = constants[tableState.modelType];

    if (!modelConstants) {
      return null;
    }

    const statuses = props.statuses || (modelConstants.status as Status[]);

    const update = async (status: number, name: string) => {
      if (
        window.confirm(
          `Are you sure you want to make ${count} records ${name} ?`,
        )
      ) {
        const postData: {
          [key: string]:
            | string
            | string[]
            | { [key: string]: string | string[] };
        } = {};

        if (props.allRows) {
          postData["query"] = tableState.appliedFilters;
        } else {
          postData["ids"] = Object.keys(tableState.checked_row_ids);
        }

        postData["status"] = status.toString();

        const response = await ServerService.callPut(
          tableState.modelType as StoreKeys,
          `0`,
          postData,
        );

        if (response.error) {
          window.alert(response.error);
          return;
        }

        tableState.uncheckAll();
        tableState.reloadData();
      }
    };
    return (
      <>
        {statuses.map((status: Status) => (
          <MenuOption
            key={status.id}
            onClick={() => update(status.id, status.label)}
            prependIcon={<i className={`${status.class}`}></i>}
          >
            Set Status To: {status.label}
          </MenuOption>
        ))}
      </>
    );
  },
);

export default DefaultMassActions;
