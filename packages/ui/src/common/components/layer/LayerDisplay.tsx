import { LayerService } from "@/common_lib/services/LayerService";
import { observer } from "mobx-react-lite";

import { useEffect } from "react";
export const LayerDisplay = observer(() => {
  //TODO this is complex, can have bugs
  useEffect(() => {
    const onPopState = (ev: PopStateEvent) => {
      if (LayerService.layers.length > 0) {
        if (ev.state && ev.state.layerId) {
          LayerService.removeAbove(ev.state.layerId);
        } else {
          LayerService.removeTop();
        }
      }
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, [LayerService.layers]);

  return (
    <div className={`fixed isolate z-notification`}>
      {LayerService.layers.map((layer) => {
        const Comp = layer.component;

        return (
          <div key={layer.id} className="contents">
            <Comp {...(layer.props || {})} />
          </div>
        );
      })}
    </div>
  );
});
