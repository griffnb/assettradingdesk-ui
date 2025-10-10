import { IConstant } from "@/models/types/constants";
import { equals, inArray } from "@/utils/numbers";
import { observer } from "mobx-react-lite";
import { MultiComboBoxBase } from "./base/select/MultiComboBoxBase";
import {
  MultiSelectBase,
  MultiSelectBaseProps,
} from "./base/select/MultiSelectBase";

interface MultiSelectProps
  extends Omit<
    MultiSelectBaseProps<IConstant>,
    "selected" | "idField" | "optionField" | "searchFunction"
  > {
  values: (string | number)[] | string | number | undefined;
  as?: "select" | "combobox";
}
export const MultiSelectInput = observer((props: MultiSelectProps) => {
  const selected = !props.values
    ? []
    : props.options.filter((option) => {
        if (Array.isArray(props.values)) {
          return inArray(props.values, option.id as string | number);
        } else {
          return equals(option.id, props.values as string | number);
        }
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
    setDisplayedOptions(
      props.options.filter((option) => {
        return option.label.toLowerCase().includes(searchStr);
      })
    );
  };

  const options = props.options.filter((option) => {
    return !option.hidden;
  });

  return props.as && props.as === "combobox" ? (
    <MultiComboBoxBase<IConstant>
      {...props}
      options={options}
      selected={selected}
      idField="id"
      optionField="label"
      searchFunction={search}
    />
  ) : (
    <MultiSelectBase<IConstant>
      {...props}
      options={options}
      selected={selected}
      idField="id"
      optionField="label"
      searchFunction={search}
    />
  );
});
