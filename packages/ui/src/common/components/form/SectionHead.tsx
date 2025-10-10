interface SectionHeadProps {
  label: string;
}
const SectionHead = (props: SectionHeadProps) => {
  return (
    <div className="mb-5 flex w-full border-b border-solid border-gray-400 pb-3 text-lg font-bold">
      {props.label}
    </div>
  );
};

export default SectionHead;
