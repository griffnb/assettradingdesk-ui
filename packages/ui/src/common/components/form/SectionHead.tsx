import { observer } from "mobx-react-lite";

interface SectionHeadProps {
  label: string;
}
export const SectionHead = observer(function SectionHead(
  props: SectionHeadProps,
) {
  return (
    <div className="mb-5 flex w-full border-b border-solid border-gray-400 pb-3 text-lg font-bold">
      {props.label}
    </div>
  );
});
