import { SafeBaseModel } from "@/models/BaseModel";
import { constants } from "@/models/constants";
import { ClientModel } from "@/models/models/client/model/ClientModel";
import { ModelModel } from "@/models/models/model/model/ModelModel";
import { RequestMetaData } from "@/models/models/request/model/RequestBaseModel";
import { RequestModel } from "@/models/models/request/model/RequestModel";
import DetailFieldModelSearchSelect from "@/ui/common/components/form/details/DetailFieldModelSearchSelect";
import DetailFieldModelSelect from "@/ui/common/components/form/details/DetailFieldModelSelect";
import { DetailFieldMultiSelect } from "@/ui/common/components/form/details/DetailFieldMultiSelect";
import { DetailFieldText } from "@/ui/common/components/form/details/DetailFieldText";
import { DetailFieldTextArea } from "@/ui/common/components/form/details/DetailFieldTextArea";
import { observer } from "mobx-react-lite";

interface RequestInfoProps {
  request: RequestModel;
}
export const RequestInfo = observer(function RequestInfo(
  props: RequestInfoProps,
) {
  return (
    <div className="p-10">
      <h2 className="text-lg font-semibold">Asset Info</h2>
      <div className="grid grid-cols-2 gap-x-5 gap-y-3">
        <DetailFieldModelSearchSelect<RequestModel, ModelModel>
          record={props.request}
          field="model_id"
          label="Model"
          displayField="label"
          placeholder="Model"
          modelName="model"
          modelDisplayField="label"
          modelSearchFilters={{ disabled: "0" }}
          modelSearchParam="q"
        />
        <DetailFieldModelSelect<RequestModel, ClientModel>
          record={props.request}
          field="client_id"
          label="Client"
          displayField="client_name"
          placeholder="Client"
          modelName="client"
          modelDisplayField="label"
          modelSearchFilters={{
            disabled: "0",
            company_id: props.request.company_id || "",
          }}
          modelSearchField="name"
          link={`/clients/details/${props.request.client_id}`}
        />

        <DetailFieldText
          record={props.request.meta_data as SafeBaseModel<RequestMetaData>}
          parentRecord={props.request}
          field="min_year"
          type="number"
          label="Min Year"
          placeholder="Year"
        />
        <DetailFieldText
          record={props.request.meta_data as SafeBaseModel<RequestMetaData>}
          parentRecord={props.request}
          field="max_year"
          type="number"
          label="Max Year"
          placeholder="Year"
        />

        <DetailFieldText
          record={props.request}
          field="min_price"
          type="number"
          label="Min Price"
          placeholder="Price"
          prepend="$"
        />
        <DetailFieldText
          record={props.request}
          field="max_price"
          type="number"
          label="Max Price"
          placeholder="Price"
          prepend="$"
        />

        <DetailFieldMultiSelect
          record={props.request.meta_data as SafeBaseModel<RequestMetaData>}
          parentRecord={props.request}
          field="install_statuses"
          label="Install Status"
          displayField="install_statusesFmt"
          options={constants.asset.install_status}
        />
        <DetailFieldMultiSelect
          record={props.request.meta_data as SafeBaseModel<RequestMetaData>}
          parentRecord={props.request}
          field="operational_statuses"
          label="Operational Status"
          displayField="operational_statusesFmt"
          options={constants.asset.operational_status}
        />

        <DetailFieldTextArea
          record={props.request}
          field="description"
          label="Description"
        />
        <DetailFieldTextArea
          record={props.request}
          field="configuration_notes"
          label="Configuration Notes"
        />
      </div>
    </div>
  );
});
