import { Store } from "@/models/store/Store";
import { debounce } from "@/utils/debounce";
import { observer } from "mobx-react-lite";
import { useCallback, useEffect, useMemo, useState } from "react";
import { MultiComboBoxBase } from "./base/select/MultiComboBoxBase";
import { MultiSelectBase } from "./base/select/MultiSelectBase";
import { BaseModelMultiSelectProps } from "./types";
interface ModelSearchMultiSelectProps<T> extends BaseModelMultiSelectProps<T> {
  modelSearchParam: string;
  modelSearchFilters?: { [key: string]: string | string[] };
  handleChange: (value: T[]) => void;
  values: string[] | string | undefined;
  selected?: T[];
  as?: "select" | "combobox";
}

export const ModelSearchMultiSelectInput = observer(
  <T extends object>(props: ModelSearchMultiSelectProps<T>) => {
    const [selected, setSelected] = useState<T[]>([]);
    const idField = props.idField || "id";

    useEffect(() => {
      if (props.values === undefined) {
        if (selected.length != 0) {
          setSelected([]);
        }
        return;
      }

      if (props.selected) {
        setSelected(props.selected);
        return;
      }

      let values: string[] | string | undefined = [];

      if (Array.isArray(props.values)) {
        if (props.values.length == 0) {
          setSelected([]);
          return;
        }

        values = props.values;
      } else if (props.values && props.values != "") {
        values = [props.values];
      }

      Store[props.modelName]
        .queryRecords(props.customPath || "", {
          [idField]: values,
        })
        .then((response) => {
          if (response.data) {
            setSelected(response.data as unknown as T[]);
          }
        });
    }, [
      props.values,
      props.modelName,
      props.selected,
      props.customPath,
      idField,
    ]);

    // Debounce the callback. The search will be triggered after 500ms of inactivity.
    const debouncedSearch = useCallback(
      debounce((query: string, setDisplayedOptions: (options: T[]) => void) => {
        const params = props.modelSearchFilters ? props.modelSearchFilters : {};
        params[props.modelSearchParam] = query;

        Store[props.modelName].query(params).then((resp) => {
          if (resp.data) {
            setDisplayedOptions(resp.data as unknown as T[]);
          }
        });
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
      <MultiComboBoxBase<T>
        {...props}
        options={emptyOptions}
        selected={selected}
        idField={idField as keyof T}
        optionField={props.modelDisplayField}
        searchFunction={search}
      />
    ) : (
      <MultiSelectBase<T>
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
