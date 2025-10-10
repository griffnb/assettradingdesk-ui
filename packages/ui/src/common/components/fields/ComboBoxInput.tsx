import { IConstant } from "@/models/types/constants";
import { equals } from "@/utils/numbers";
import { observer } from "mobx-react-lite";
import { useMemo } from "react";
import { ComboBoxBase, ComboBoxBaseProps } from "./base/select/ComboBoxBase";

export interface ComboBoxInputProps
  extends Omit<
    ComboBoxBaseProps<IConstant>,
    "idField" | "optionField" | "searchFunction" | "selected"
  > {
  value: string | number | undefined;
}
export const ComboBoxInput = observer((props: ComboBoxInputProps) => {
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
    setDisplayedOptions(
      props.options.filter((option) => {
        return option.label.toLowerCase().includes(searchStr);
      })
    );
  };

  const options = useMemo(
    () =>
      props.options.filter((option) => {
        return !option.hidden;
      }),
    [props.options]
  );

  return (
    <ComboBoxBase<IConstant>
      {...props}
      options={options}
      selected={selected}
      idField="id"
      optionField="label"
      searchFunction={search}
    />
  );
});
