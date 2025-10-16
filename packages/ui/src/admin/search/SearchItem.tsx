import { CacheService } from "@/common_lib/services/CacheService";
import { LayerService } from "@/common_lib/services/LayerService";
import {
  ViewRecordModal,
  ViewRecordModalId,
} from "@/ui/admin/modal/ViewRecordModal";
import { titleCase } from "@/utils/strings";
import { observer } from "mobx-react-lite";
import { getRecordLabel } from "./helpers";
import { LinkableRecord } from "./types";

export interface SearchItemProps {
  record: LinkableRecord;
  close: () => void;
}

export const SearchItem = observer((props: SearchItemProps) => {
  const saveRecent = () => {
    let existingItems = CacheService.get<LinkableRecord[]>("_search_recents");
    if (!existingItems) {
      existingItems = [];
    }

    existingItems = existingItems.filter(
      (item) => item && item.link !== props.record.link,
    );

    if (existingItems.length > 5) {
      existingItems.pop();
    }

    existingItems.unshift(props.record);
    CacheService.set("_search_recents", existingItems);

    props.close();
  };

  const viewRecord = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    LayerService.add(ViewRecordModalId, ViewRecordModal, {
      record: props.record,
    });
  };

  return (
    <div className="group flex cursor-pointer flex-row items-center gap-x-3 self-stretch rounded-lg py-2 pl-3 hover:bg-bg-neutral-secondary-hover">
      <i
        className={`w-3.5 text-icon-neutral-quaternary ${props.record.icon || "fa fa-file"} group-hover:text-icon-brand-secondary`}
      />
      <a
        className="flex w-11/12 flex-row items-center self-stretch"
        href={props.record.link || ""}
        onClick={saveRecent}
      >
        <span className="text-sm text-text-neutral-tertiary group-hover:text-text-brand-tertiary">
          {getRecordLabel(props.record)}
        </span>
        <span className="mr-2 ms-auto border-r border-border-neutral-primary pr-2 text-xs capitalize text-text-neutral-quaternary">
          {titleCase(props.record._model_name)}
        </span>
        <div className="size-7 rounded-lg border border-border-neutral-secondary text-icon-neutral-quaternary shadow-sm hover:border-icon-brand-secondary hover:text-icon-brand-secondary">
          <i className="fa fa-eye text-xs" onClick={viewRecord} />
        </div>
      </a>
    </div>
  );
});
