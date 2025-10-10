import { Store } from "@/models/store/Store";
import { IConstant } from "@/models/types/constants";
import { equals } from "@/utils/numbers";
import { observer } from "mobx-react-lite";
import { useEffect, useMemo, useState } from "react";
import { ComboBoxBase } from "./base/select/ComboBoxBase";
import { SelectBase } from "./base/select/SelectBase";
import { BaseModelSelectProps } from "./types";

interface ModelSelectProps<T>
  extends Omit<
    BaseModelSelectProps<T>,
    "options" | "selected" | "optionField" | "searchFunction"
  > {
  modelSearchField: keyof T;
  modelSearchFilters?: { [key: string]: string | string[] };
  handleChange: (value: T | undefined) => void;
  value: string | undefined;
  as?: "select" | "combobox";
  additionalOptions?: IConstant[];
}
export const ModelSelectInput = observer(
  <T extends object>(props: ModelSelectProps<T>) => {
    const memoizedFilters = useMemo(
      () => props.modelSearchFilters,
      [JSON.stringify(props.modelSearchFilters)]
    );
    const [options, setOptions] = useState<T[]>([]);
    const [optionsLoaded, setOptionsLoaded] = useState(false);
    const idField = props.idField || "id";

    useEffect(() => {
      Store[props.modelName]
        .queryRecords(props.customPath || "", memoizedFilters || {})
        .then((resp) => {
          if (resp.data) {
            if (props.additionalOptions && props.additionalOptions.length > 0) {
              const formattedAdditionalOptions = props.additionalOptions.map(
                (option) => {
                  return {
                    id: option.id as string,
                    [props.modelDisplayField]: option.label,
                  } as unknown as T;
                }
              );
              setOptions([
                ...(resp.data as unknown as T[]),
                ...formattedAdditionalOptions,
              ]);
            } else {
              setOptions(resp.data as unknown as T[]);
            }
          }
          setOptionsLoaded(true);
        });
    }, [props.customPath, props.modelName, memoizedFilters]);

    const selected =
      options.find((option) => {
        return equals(
          option[idField as keyof T] as string,
          props.value as string
        );
      }) ?? undefined;

    const search = async (
      q: string,
      setDisplayedOptions: (options: T[]) => void
    ) => {
      if (q == "") {
        setDisplayedOptions(options);
        return;
      }
      const searchStr = q.toLowerCase();

      const filteredOptions = options
        .filter((option) => {
          return (option[props.modelSearchField] as string)
            .toLowerCase()
            .includes(searchStr);
        })
        .sort((a, b) => {
          const aText = (a[props.modelSearchField] as string).toLowerCase();
          const bText = (b[props.modelSearchField] as string).toLowerCase();
          const aStartsWith = aText.startsWith(searchStr);
          const bStartsWith = bText.startsWith(searchStr);
          const aExactMatch = aText === searchStr;
          const bExactMatch = bText === searchStr;

          // Check for complete word matches
          const aCompleteWord = aText.split(/\s+/)[0] === searchStr;
          const bCompleteWord = bText.split(/\s+/)[0] === searchStr;

          // Exact matches come first
          if (aExactMatch && !bExactMatch) return -1;
          if (!aExactMatch && bExactMatch) return 1;

          // Then complete word matches
          if (aCompleteWord && !bCompleteWord) return -1;
          if (!aCompleteWord && bCompleteWord) return 1;

          // Then starts with matches
          if (aStartsWith && !bStartsWith) return -1;
          if (!aStartsWith && bStartsWith) return 1;

          return 0;
        });

      setDisplayedOptions(filteredOptions);
    };

    if (!optionsLoaded) {
      return null;
    }

    return props.as && props.as === "combobox" ? (
      <ComboBoxBase<T>
        {...props}
        options={options}
        selected={selected}
        idField={idField as keyof T & string}
        optionField={props.modelDisplayField}
        searchFunction={search}
      />
    ) : (
      <SelectBase<T>
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
