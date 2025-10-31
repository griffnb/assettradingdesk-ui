import { cn } from "@/utils/cn";

interface DetailFieldContainerProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const DetailFieldContainer = (props: DetailFieldContainerProps) => {
  return (
    <div
      className={cn(
        `my-4 grid w-full grid-cols-[repeat(auto-fit,_minmax(200px,_1fr))] gap-x-2 gap-y-4`,
        props.className,
      )}
    >
      {props.children}
    </div>
  );
};
