import { IConstant } from "@/models/types/constants";
import { equals } from "@/utils/numbers";
import { observer } from "mobx-react-lite";
import { ComboBoxBase } from "./base/select/ComboBoxBase";
import { SelectBase, SelectBaseProps } from "./base/select/SelectBase";

export interface SelectInputProps
  extends Omit<
    SelectBaseProps<IConstant>,
    "idField" | "optionField" | "searchFunction" | "selected"
  > {
  value: string | number | undefined;
  as?: "select" | "combobox";
}
export const SelectInput = observer((props: SelectInputProps) => {
  const selected = props.options.find((option) => {
    return equals(option.id, props.value as string | number);
  });
  const search = async (
    q: string,
    setDisplayedOptions: (options: IConstant[]) => void
  ) => {
    if (q == "") {
      setDisplayedOptions(props.options);
      return;
    }
    const searchStr = q.toLowerCase();

    const filteredOptions = options
      .filter((option) => {
        if (option.label.toLowerCase().includes(searchStr)) {
          return true;
        }
        return option.aliases?.find((val) => {
          return val.includes(searchStr);
        });
      })
      .sort((a, b) => {
        const aText = a.label.toLowerCase();
        const bText = b.label.toLowerCase();
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

  const options = props.options.filter((option) => {
    return !option.hidden;
  });

  return props.as && props.as === "combobox" ? (
    <ComboBoxBase<IConstant>
      {...props}
      options={options}
      selected={selected}
      idField="id"
      optionField="label"
      searchFunction={search}
    />
  ) : (
    <SelectBase<IConstant>
      {...props}
      options={options}
      selected={selected}
      idField="id"
      optionField="label"
      searchFunction={search}
    />
  );
});
