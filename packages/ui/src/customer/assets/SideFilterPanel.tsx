import { AssetModel } from "@/models/models/asset/model/AssetModel";
import { TableState } from "@/models/store/state/TableState";
import { TakeoverPanelWrap } from "@/ui/common/components/takeover-panel/TakeoverPanelWrap";
import { observer } from "mobx-react-lite";
import { SideFilters } from "./SideFilters";

export const SideFilterPanelId = "SideFilterPanel";

interface SideFilterPanelProps {
  tableState: TableState<AssetModel>;
}

/**
 * ## SideFilterPanel slots
 *
 *
 *
 * ## SimpleModal slots
 * @slot {"simple-modal-content"} data-slot="simple-modal-content"
 * @slot {"simple-modal-close-button"} data-slot="simple-modal-close-button"
 *
 * ## ModalWrap slots
 * @slot {"modal-wrapper"} data-slot="modal-wrapper"
 * @slot {"modal-overlay"} data-slot="modal-overlay"
 * @slot {"modal-content"} data-slot="modal-content"
 **/

export const SideFilterPanel = observer(function SideFilterPanel(
  props: SideFilterPanelProps,
) {
  return (
    <TakeoverPanelWrap id={SideFilterPanelId} title="Asset Filters" size="full">
      <SideFilters tableState={props.tableState} />
    </TakeoverPanelWrap>
  );
});
