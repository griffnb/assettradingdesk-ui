import { ServerService } from "@/common_lib/services/ServerService";
import { StoreModel } from "@/models/store/StoreModel";
import { BreadCrumb } from "@/ui/common/components/nav/BreadCrumb";
import { cn } from "@/utils/cn";
import { cva, VariantProps } from "class-variance-authority";
import { ReactNode, useEffect, useState } from "react";

const styleVariants = cva("flex flex-row items-center relative gap-x-3", {
  variants: {
    variant: {
      default:
        "pr-6 py-2 border-b border-border-neutral-primary bg-bg-neutral-tertiary text-text-neutral-primary",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

interface TitleBarProps extends VariantProps<typeof styleVariants> {
  title: string;
  subText?: ReactNode;
  className?: string;
  children?: ReactNode;
  objectURN?: string;
  record?: StoreModel;
  label?: string;
  hideCrumbs?: boolean;
}

export const AdminTitleBar = (props: TitleBarProps) => {
  const [noteCount, setNoteCount] = useState(0);

  useEffect(() => {
    if (!props.objectURN) return;
    ServerService.callGet("note", "count", {
      object_urn: props.objectURN,
      disabled: "0",
    }).then((resp) => {
      if (resp.success && resp.data) {
        setNoteCount(resp.data);
      }
    });
  }, [props.objectURN]);

  return (
    <>
      <div
        className={cn(
          styleVariants({ variant: props.variant, className: props.className })
        )}
      >
        {!props.hideCrumbs ? (
          <BreadCrumb record={props.record} title={props.title} />
        ) : (
          <span className="ml-3 font-semibold text-text-neutral-primary">
            {props.title}
          </span>
        )}

        <div className="ml-auto">{props.children}</div>
      </div>
    </>
  );
};
