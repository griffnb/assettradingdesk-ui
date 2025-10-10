import {
  NotificationItem,
  NotificationService,
} from "@/common_lib/services/NotificationService";
import { cn } from "@/utils/cn";
import { cva } from "class-variance-authority";
import { observer } from "mobx-react-lite";

export const notificationVariant = cva(
  "flex flex-row items-start mt-2 rounded-xl border p-4",
  {
    variants: {
      variant: {
        error: "bg-error-500 text-white",
        success: "bg-bg-success-solid text-white",
        standard: "text-neutral-secondary bg-bg-neutral-secondary",
      },
    },
    defaultVariants: {
      variant: "standard",
    },
  }
);

export const ringVariant = cva("", {
  variants: {
    variant: {
      error: "ring-white ring-offset-bg-error-solid text-white",
      success: "ring-white ring-offset-bg-success-solid text-white",
      standard:
        "ring-fg-success-primary/20 ring-offset-bg-neutral-secondary text-fg-success-primary",
    },
  },
  defaultVariants: {
    variant: "standard",
  },
});

export const closeVariant = cva("", {
  variants: {
    variant: {
      error: "text-white/70",
      success: "text-white/70",
      standard: "text-icon-neutral-quaternary",
    },
  },
  defaultVariants: {
    variant: "standard",
  },
});

type NotificationProps = {
  notification: NotificationItem;
};

export const Notification = observer((props: NotificationProps) => {
  // Handler to change the user's name
  const handleClick = () => {
    NotificationService.clearNotification(props.notification.id);
  };

  return (
    <div
      className={cn(notificationVariant({ variant: props.notification.type }))}
    >
      <div
        className={cn(
          ringVariant({ variant: props.notification.type }),
          "flex size-5 flex-col items-center justify-center rounded-full px-1 ring-2 ring-opacity-30 ring-offset-1"
        )}
      >
        {props.notification.type === "error" ? (
          <i className="u u-x-circle size-5 rounded-full" />
        ) : (
          <i className="u u-check-circle size-5 rounded-full" />
        )}
      </div>

      <div className="flex w-full flex-col px-8">
        <div className="text-sm font-semibold">
          {props.notification.message}
        </div>
        {props.notification.body}
      </div>
      <div className="ml-auto pl-3">
        <div className="-m-1.5">
          <button
            type="button"
            onClick={handleClick}
            className={cn(
              closeVariant({ variant: props.notification.type }),
              "inline-flex rounded-md p-1.5"
            )}
          >
            <span className="sr-only">Dismiss</span>
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="x-circle-solid" clipPath="url(#clip0_4447_2543)">
                <path
                  id="Vector"
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M0.833252 10C0.833252 4.93337 4.93325 0.833374 9.99992 0.833374C15.0666 0.833374 19.1666 4.93337 19.1666 10C19.1666 15.0667 15.0666 19.1667 9.99992 19.1667C4.93325 19.1667 0.833252 15.0667 0.833252 10ZM6.90825 6.90837C7.23325 6.58337 7.75825 6.58337 8.08325 6.90837L9.99158 8.81671L11.8999 6.90837C12.2249 6.58337 12.7499 6.58337 13.0749 6.90837C13.3999 7.23337 13.3999 7.75837 13.0749 8.08337L11.1666 9.99171L13.0749 11.9C13.3999 12.225 13.3999 12.75 13.0749 13.075C12.7499 13.4 12.2249 13.4 11.8999 13.075L9.99158 11.1667L8.08325 13.075C7.75825 13.4 7.23325 13.4 6.90825 13.075C6.58325 12.75 6.58325 12.225 6.90825 11.9L8.81658 9.99171L6.90825 8.08337C6.58325 7.75837 6.58325 7.23337 6.90825 6.90837Z"
                  fill="currentColor"
                />
              </g>
              <defs>
                <clipPath id="clip0_4447_2543">
                  <rect width="20" height="20" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
});
