import { constants } from "@/models/constants";
import { AssetModel } from "@/models/models/asset/model/AssetModel";
import { ClientModel } from "@/models/models/client/model/ClientModel";
import { ModelModel } from "@/models/models/model/model/ModelModel";
import { DetailFieldDate } from "@/ui/common/components/form/details/DetailFieldDate";
import { DetailFieldModelSearchSelect } from "@/ui/common/components/form/details/DetailFieldModelSearchSelect";
import { DetailFieldModelSelect } from "@/ui/common/components/form/details/DetailFieldModelSelect";
import { DetailFieldSelect } from "@/ui/common/components/form/details/DetailFieldSelect";
import { DetailFieldText } from "@/ui/common/components/form/details/DetailFieldText";
import { DetailFieldTextArea } from "@/ui/common/components/form/details/DetailFieldTextArea";
import { Button } from "@/ui/shadcn/ui/button";
import { observer } from "mobx-react-lite";

interface AssetInfoProps {
  asset: AssetModel;
}
export const AssetInfo = observer((props: AssetInfoProps) => {
  return (
    <div className="p-10">
      <div className="flex flex-row text-lg font-semibold">
        Asset Info
        <Button
          variant={"default"}
          className="ml-auto"
          onClick={() => {
            navigator.clipboard
              .writeText(props.asset.publicLink)
              .then(() => {
                window.alert("Copied");
              })
              .catch((err) => {
                console.error("Failed to copy text to clipboard", err);
              });
          }}
        >
          Share Link
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-x-5 gap-y-3">
        <DetailFieldModelSearchSelect<AssetModel, ModelModel>
          record={props.asset}
          field="model_id"
          label="Model"
          displayField="label"
          placeholder="Model"
          modelName="model"
          modelDisplayField="label"
          modelSearchFilters={{ disabled: "0" }}
          modelSearchParam="q"
        />
        <DetailFieldModelSelect<AssetModel, ClientModel>
          record={props.asset}
          field="client_id"
          label="Client"
          displayField="client_name"
          placeholder="Client"
          modelName="client"
          modelDisplayField="label"
          modelSearchFilters={{
            disabled: "0",
            company_id: props.asset.company_id?.toString() || "",
          }}
          modelSearchField="name"
          link={`/clients/details/${props.asset.client_id}`}
        />

        <DetailFieldDate
          record={props.asset}
          field="verified_at_ts"
          label="Verified At"
          displayField="verified_at_ts"
          placeholder="Verified At"
        />
        <DetailFieldText
          record={props.asset}
          field="year"
          type="number"
          label="Year"
          placeholder="Year"
        />
        <DetailFieldText
          record={props.asset}
          field="quantity"
          type="number"
          label="Quantity"
          placeholder="Quantity"
        />
        <DetailFieldText
          record={props.asset}
          field="price"
          type="number"
          label="Price"
          placeholder="Price"
          prepend="$"
        />

        <DetailFieldSelect
          record={props.asset}
          field="install_status"
          label="Install Status"
          displayField="install_status"
          options={constants.asset.install_status}
        />
        <DetailFieldSelect
          record={props.asset}
          field="operational_status"
          label="Operational Status"
          displayField="operational_status"
          options={constants.asset.operational_status}
        />
        <DetailFieldText
          record={props.asset}
          field="serial_number"
          type="text"
          label="Serial Number"
          placeholder="Serial"
        />
        <div></div>

        <DetailFieldTextArea
          record={props.asset}
          field="description"
          label="Description"
        />
        <DetailFieldTextArea
          record={props.asset}
          field="configuration_notes"
          label="Configuration Notes"
        />
        <DetailFieldTextArea
          record={props.asset}
          field="notes"
          label="Internal Notes"
        />
      </div>
    </div>
  );
});
