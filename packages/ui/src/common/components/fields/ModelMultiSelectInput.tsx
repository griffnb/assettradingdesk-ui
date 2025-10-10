import { Store } from "@/models/store/Store";
import { equals, inArray } from "@/utils/numbers";
import { observer } from "mobx-react-lite";
import { useEffect, useMemo, useState } from "react";
import { MultiComboBoxBase } from "./base/select/MultiComboBoxBase";
import { MultiSelectBase } from "./base/select/MultiSelectBase";
import { BaseModelMultiSelectProps } from "./types";
interface ModelMultiSelectProps<T> extends BaseModelMultiSelectProps<T> {
  modelSearchField: keyof T;
  modelSearchFilters?: { [key: string]: string | string[] };
  handleChange: (value: T[]) => void;
  values: string[] | string | undefined;
  as?: "select" | "combobox";
}

export const ModelMultiSelectInput = observer(
  <T extends object>(props: ModelMultiSelectProps<T>) => {
    const [options, setOptions] = useState<T[]>([]);
    const [optionsLoaded, setOptionsLoaded] = useState(false);
    const idField = props.idField || "id";

    const memoizedFilters = useMemo(
      () => props.modelSearchFilters,
      [JSON.stringify(props.modelSearchFilters)]
    );

    useEffect(() => {
      Store[props.modelName]
        .queryRecords(props.customPath || "", memoizedFilters || {})
        .then((response) => {
          if (response.data) {
            setOptions((response.data as unknown as T[]) || []);
          }
          setOptionsLoaded(true);
        });
    }, [props.customPath, props.modelName, memoizedFilters]);

    let selected: T[] = [];
    if (Array.isArray(props.values) && props.values.length > 0) {
      const selectedOptions = options.filter((option) => {
        if (Array.isArray(props.values)) {
          if (
            inArray(props.values, option[idField as keyof T] as string | number)
          ) {
            return true;
          }
        }
      });
      selected = selectedOptions;
    }

    if (!Array.isArray(props.values)) {
      const selectedOptions = options.filter((option) => {
        return equals(
          option[idField as keyof T] as string,
          props.values as string
        );
      });
      selected = selectedOptions;
    }

    const search = async (
      q: string,
      setDisplayedOptions: (options: T[]) => void
    ) => {
      if (q == "") {
        setDisplayedOptions(options);
        return;
      }
      const searchStr = q.toLowerCase();
      setDisplayedOptions(
        options.filter((option) => {
          return (option[props.modelSearchField] as string)
            .toLowerCase()
            .includes(searchStr);
        })
      );
    };

    if (!optionsLoaded) {
      return null;
    }

    return props.as && props.as === "combobox" ? (
      <MultiComboBoxBase<T>
        {...props}
        options={options}
        selected={selected}
        idField={idField as keyof T}
        optionField={props.modelDisplayField}
        searchFunction={search}
      />
    ) : (
      <MultiSelectBase<T>
        {...props}
        {...props}
        options={options}
        selected={selected}
        idField={idField as keyof T}
        optionField={props.modelDisplayField}
        searchFunction={search}
      />
    );
  }
);
