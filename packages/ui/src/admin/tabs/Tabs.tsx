import { SelectBase } from "@/ui/common/components/fields/base/select/SelectBase";
import { cn } from "@/utils/cn";
import { cva, VariantProps } from "class-variance-authority";
import { ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router";

const styleVariants = cva("px-4", {
  variants: {
    variant: {
      default: "border-b border-gray-200 bg-white",
      light: [
        "font-semibold text-text-neutral-secondary bg-white",
        "border-b border-gray-200",
      ],
    },
  },
  defaultVariants: {
    variant: "default",
  },
});
const tabVariants = cva(
  "group flex whitespace-nowrap border-b-2 px-2 py-4 text-sm font-semibold cursor-pointer",
  {
    variants: {
      variant: {
        default: [
          "border-transparent text-gray-500 hover:border-gray-400 hover:text-gray-700",
          "data-[active=true]:border-text-brand-primary data-[active=true]:text-text-brand-primary",
        ],
        light: [
          "border-b-0 font-semibold text-text-neutral-secondary bg-white",
          "data-[active=true]:text-text-brand-tertiary",
          "data-[disabled=true]:text-text-neutral-quinary-disabled data-[disabled=true]:hover:cursor-default",
          "data-[active=true]:border-b-2 data-[active=true]:border-border-brand-primary",
        ],
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const countVariants = cva(
  "ml-3 hidden rounded-full px-2.5 py-0.5 text-xs font-medium md:inline-block",
  {
    variants: {
      variant: {
        default: [
          "bg-gray-100 text-gray-900",
          "group-[.active]:bg-indigo-100 group-[.active]:text-indigo-600",
        ],
        light: "group-[.active]:bg-indigo-100 group-[.active]:text-indigo-600",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

interface Tab {
  key: string;
  count?: number;
  label: string | ReactNode;
  component: ReactNode;
  hidden?: boolean;
  disabled?: boolean;
}

interface TabsProps extends VariantProps<typeof styleVariants> {
  tabs: Tab[];
  className?: string;
  children?: ReactNode;
  subTab?: boolean;
  clearParams?: boolean; // If true, will clear the url params when switching tabs
  noHash?: boolean; // If true, will not use the hash in the URL for sub-tabs
}
export const Tabs = (fullProps: TabsProps) => {
  const [activeTab, setActiveTab] = useState<string>(
    fullProps.tabs[0]?.key || ""
  );
  const { className, variant, ...props } = fullProps;

  const nav = useNavigate();

  useEffect(() => {
    if (props.subTab) return;

    const hash = window.location.hash.substring(1); // Remove the `#`
    if (hash) {
      setActiveTab(hash);
    }
  }, [props.subTab]);

  const setTab = (key: string) => {
    setActiveTab(key);

    if (props.subTab) {
      return;
    }

    let keyFmt = key;
    if (props.noHash) {
      keyFmt = "";
    }
    if (props.clearParams) {
      nav({
        hash: keyFmt || "",
      });
    } else {
      const router = { ...window.location, hash: keyFmt || "" };
      nav({ ...router });
    }
  };

  const tabs = props.tabs.filter((tab) => !tab.hidden);

  const currentTab = tabs.find((tab) => tab.key == activeTab);
  return (
    <>
      <div className={cn(styleVariants({ variant, className }))}>
        <nav
          aria-label="Tabs"
          className="-mb-px flex flex-row items-center"
          data-slot="tabs-nav"
        >
          <div className="contents lg:hidden" data-slot="mobile-tabs-wrap">
            <SelectBase
              className="my-4 w-full px-2"
              selected={currentTab}
              idField="key"
              optionField="label"
              noSearch={true}
              options={tabs}
              handleChange={(value: Tab | undefined) => {
                if (!value) return;
                if (value.disabled) return;
                setActiveTab(value.key);
              }}
              errorMessages={[]}
            />
          </div>
          <div
            className="hidden w-full flex-row items-center gap-x-2 overflow-x-auto lg:flex"
            data-slot="tabs-wrap"
          >
            {tabs.map((tab) => (
              <a
                key={tab.key}
                className={cn(
                  tabVariants({ variant }),
                  activeTab == tab.key && "active"
                )}
                onClick={() => {
                  if (tab.disabled) return;
                  // react doesnt fire this hash event properly if you use an onclick handler
                  if (!props.noHash) {
                    window.location.hash = `#${tab.key}`;
                  }
                  setTab(tab.key);
                }}
                data-disabled={tab.disabled}
                data-active={activeTab == tab.key}
              >
                {tab.label}
                {tab.count !== undefined ? (
                  <span className={cn(countVariants({ variant }))}>
                    {tab.count}
                  </span>
                ) : null}
              </a>
            ))}
          </div>
          {props.children}
        </nav>
      </div>

      {currentTab?.component}
    </>
  );
};
