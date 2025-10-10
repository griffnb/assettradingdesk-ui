import { Store } from "@/models/store/Store";

import { IConstant } from "@/models/types/constants";
import { debounce } from "@/utils/debounce";
import { observer } from "mobx-react-lite";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ComboBoxBase } from "./base/select/ComboBoxBase";
import { SelectBase } from "./base/select/SelectBase";
import { BaseModelSelectProps } from "./types";

interface ModelSearchSelectProps<T> extends BaseModelSelectProps<T> {
  modelSearchParam: string;
  modelSearchFilters?: { [key: string]: string | string[] };
  handleChange: (value: T | undefined) => void;
  value: string | undefined;
  selected?: T;
  as?: "select" | "combobox";
  additionalOptions?: IConstant[];
  showClear?: boolean | undefined;
}
export const ModelSearchSelectInput = observer(
  <T extends object>(props: ModelSearchSelectProps<T>) => {
    const [selected, setSelected] = useState<T | undefined>(undefined);
    const idField = props.idField || "id";

    const formattedOptions = useMemo(() => {
      if (props.additionalOptions) {
        return props.additionalOptions.map((option) => {
          return {
            id: option.id as string,
            [props.modelDisplayField]: option.label,
          } as unknown as T;
        });
      }
      return [];
    }, [props.additionalOptions, props.modelDisplayField]);

    useEffect(() => {
      if (props.value && !props.selected) {
        if (formattedOptions.length > 0) {
          const found = formattedOptions.find(
            (option) => option[props.idField as keyof T] === props.value
          );
          if (found) {
            setSelected(found);
            return;
          }
        }

        Store[props.modelName]
          .query({ [idField]: props.value })
          .then((resp) => {
            if (resp.success && resp.data && resp.data.length > 0) {
              setSelected(resp.data[0] as unknown as T);
            }
          });
      } else {
        setSelected(props.selected);
      }
    }, [
      idField,
      props.value,
      props.modelName,
      props.selected,
      formattedOptions,
    ]);

    // Debounce the callback. The search will be triggered after 500ms of inactivity.
    const debouncedSearch = useCallback(
      debounce((query: string, setDisplayedOptions: (options: T[]) => void) => {
        const params = props.modelSearchFilters || {};
        params[props.modelSearchParam] = query;

        Store[props.modelName]
          .queryRecords(props.customPath || "", params)
          .then((resp) => {
            if (resp.data) {
              setDisplayedOptions([
                ...(resp.data as unknown as T[]),
                ...formattedOptions,
              ]);
            }
          });
        return;
      }, 500),
      [props.modelName, props.modelSearchParam, props.modelSearchFilters]
    );

    const search = async (
      q: string,
      setDisplayedOptions: (options: T[]) => void
    ) => {
      if (q == "") {
        setDisplayedOptions([]);
        return;
      }
      await debouncedSearch(q, setDisplayedOptions);
    };

    const emptyOptions = useMemo(() => [], []);

    return props.as && props.as === "combobox" ? (
      <ComboBoxBase<T>
        {...props}
        options={emptyOptions}
        selected={selected}
        idField={idField as keyof T & string}
        optionField={props.modelDisplayField}
        searchFunction={search}
      />
    ) : (
      <SelectBase<T>
        {...props}
        options={emptyOptions}
        selected={selected}
        idField={idField as keyof T}
        optionField={props.modelDisplayField}
        searchFunction={search}
      />
    );
  }
);
