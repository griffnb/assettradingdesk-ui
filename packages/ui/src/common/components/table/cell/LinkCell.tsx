import { replaceURLValues } from "@/utils/strings";
import { observer } from "mobx-react-lite";
import { ReactNode } from "react";
import { IColumn, TableCellProps } from "../../types/columns";

interface LinkCellProps<T extends object> extends TableCellProps<T> {
  column: LinkCellColumn<T>;
}

export interface LinkCellColumn<T extends object> extends IColumn<T> {
  params?: { [key: string]: string };
  //Key is param, value is record field
  paramMapping?: { [key: string]: string };
  //Key is param, value is record field
  parentParamMapping?: { [key: string]: string };
  //uses [key] as a placeholder in the template string
  linkTo: string;
  title: string;
  linkText?: ReactNode;
  hash?: string;
  target?: HTMLAnchorElement["target"];
}

export const LinkCell = observer(
  <T extends object>(props: LinkCellProps<T>) => {
    const urlParams: { [key: string]: string } = {};

    if (props.column.params) {
      for (const key in props.column.params) {
        urlParams[key] = props.column.params[key] as string;
      }
    }

    if (props.column.paramMapping) {
      for (const key in props.column.paramMapping) {
        urlParams[key] = props.record[
          props.column.paramMapping[key] as keyof T
        ] as string;
      }
    }

    if (props.column.parentParamMapping && props.tableState.parent) {
      for (const key in props.column.parentParamMapping) {
        urlParams[key] = props.tableState.parent[
          props.column.parentParamMapping[
            key
          ] as keyof typeof props.tableState.parent
        ] as string;
      }
    }

    const linkURL = replaceURLValues(props.column.linkTo, urlParams, true);
    let finalURL = linkURL;
    const urlSearchParams = new URLSearchParams(urlParams).toString();
    if (urlSearchParams) {
      //Append any params that were not in the URL template
      if (linkURL.includes("?")) {
        //Already has a param in the template
        finalURL = linkURL.concat("&" + urlSearchParams);
      } else {
        finalURL = linkURL.concat("?" + urlSearchParams);
      }
    }

    if (props.column.hash) {
      finalURL = finalURL.concat("#" + props.column.hash);
    }

    const lookupField = props.column.displayField || props.column.field;

    return (
      <a
        href={finalURL}
        className="text-xs font-semibold text-blue-500 hover:underline"
        target={props.column.target}
        onClick={(e) => e.stopPropagation()}
      >
        {props.column.linkText
          ? props.column.linkText
          : (props.record[lookupField as keyof T] as string)}
      </a>
    );
  }
);
