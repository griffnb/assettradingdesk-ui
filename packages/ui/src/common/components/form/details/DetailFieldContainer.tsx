interface DetailFieldContainerProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const DetailFieldContainer = (props: DetailFieldContainerProps) => {
  return (
    <div
      className={`my-4 grid grid-cols-[repeat(auto-fit,_minmax(200px,_1fr))] gap-x-2 gap-y-4 ${props.className}`}
    >
      {props.children}
    </div>
  );
};
