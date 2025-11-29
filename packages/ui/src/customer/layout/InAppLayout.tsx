import { LayerDisplay } from "@/ui/common/components/layer/LayerDisplay";
import clsx from "clsx";
import { observer } from "mobx-react-lite";
import { ReactNode } from "react";
import { Footer } from "./Footer";
import { NavBar } from "./NavBar";

interface InAppLayoutProps {
  children: ReactNode;
  title?: string;
  noFooter?: boolean;
}

export const InAppLayout = observer(function InAppLayout(
  props: InAppLayoutProps,
) {
  return (
    <>
      <LayerDisplay />
      <div className="relative flex flex-1 flex-col overflow-hidden bg-background">
        <NavBar />
        <main className={clsx("flex h-full flex-col overflow-hidden",{"min-h-dvh":!props.noFooter})}>
          {props.children}
          
        </main>
        {!props.noFooter && <Footer />}
      </div>
    </>
  );
});
