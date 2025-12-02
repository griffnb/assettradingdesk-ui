import { RequestModel } from "@/models/models/request/model/RequestModel";
import { Store } from "@/models/store/Store";
import { Spinner } from "@/ui/shadcn/ui/spinner";
import { cn } from "@/utils/cn";
import { cva, VariantProps } from "class-variance-authority";
import { observer } from "mobx-react-lite";
import { HTMLAttributes, useEffect, useState } from "react";
import { SuggestedAssetsCarousel } from "../requests/RequestSuggestedAssets";

const styleVariants = cva("flex flex-col gap-6 max-w-[80%]", {
  variants: {
    variant: {
      default: "",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export interface SuggestedCardViewProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof styleVariants> {}

export const SuggestedCardView = observer(function SuggestedCardView(
  rawProps: SuggestedCardViewProps,
) {
  const { className, variant, ...props } = rawProps;
  const [requests, setRequests] = useState<RequestModel[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    setIsLoading(true);

    const response = await Store.request.query(
      { status: ["100"] },
      {
        skipCache: true,
      },
    );

    if (response.success && response.data) {
      setRequests(response.data);
    } else {
      setRequests([]);
    }

    setIsLoading(false);
  };

  return (
    <div className={cn(styleVariants({ variant, className }))} {...props}>
      {isLoading ? (
        <div className="flex h-[60svh] items-center justify-center">
          <Spinner className="size-8 text-primary" />
        </div>
      ) : requests.length === 0 ? (
        <div className="rounded-lg border border-dashed border-muted-foreground/30 p-12 text-center text-sm text-muted-foreground">
          You dont have any requests
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {requests.map((request) => {
            return (
              <SuggestedAssetsCarousel key={request.id} request={request} />
            );
          })}
        </div>
      )}
    </div>
  );
});
