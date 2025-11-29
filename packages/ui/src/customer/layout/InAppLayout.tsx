import { LayerDisplay } from "@/ui/common/components/layer/LayerDisplay";
import { VariableService } from "@/ui/hooks/VariableService";
import { cn } from "@/utils/cn";
import { cva, VariantProps } from "class-variance-authority";
import { observer } from "mobx-react-lite";
import { ReactNode } from "react";
import { Footer } from "./Footer";
import { NavBar } from "./NavBar";

const styleVariants = cva("", {
  variants: {
    variant: {
      default: "flex h-full flex-col overflow-hidden",
      framed: "max-h-[calc(100dvh-var(--customer-nav-bar))]",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

interface InAppLayoutProps extends VariantProps<typeof styleVariants> {
  children: ReactNode;
  title?: string;
  noFooter?: boolean;
  className?: string;
}

export const InAppLayout = observer(function InAppLayout(
  props: InAppLayoutProps,
) {
  const { className, variant } = props;

  return (
    <>
      <LayerDisplay />
      <div
        className="relative flex size-full flex-1 flex-col bg-background"
        style={VariableService.getStyles()}
      >
        <NavBar />
        <main
          className={cn(styleVariants({ variant, className }), {
            "min-h-dvh": !props.noFooter,
          })}
        >
          {props.children}
        </main>
        {!props.noFooter && <Footer />}
      </div>
    </>
  );
});
