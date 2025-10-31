import { constants } from "@/models/constants";
import { ClientModel } from "@/models/models/client/model/ClientModel";
import { PipelineModel } from "@/models/models/pipeline/model/PipelineModel";
import DetailFieldModelSearchSelect from "@/ui/common/components/form/details/DetailFieldModelSearchSelect";
import DetailFieldSelect from "@/ui/common/components/form/details/DetailFieldSelect";

import { observer } from "mobx-react-lite";

interface PipelineInfoProps {
  pipeline: PipelineModel;
}
export const PipelineInfo = observer(function PipelineInfo(
  props: PipelineInfoProps,
) {
  return (
    <div className="p-10">
      <h2 className="text-lg font-semibold">Pipeline Info</h2>
      <div className="grid grid-cols-2 gap-x-5 gap-y-3">
        <div className="col-span-2">
          <DetailFieldSelect
            record={props.pipeline}
            field="stage"
            label="Stage"
            displayField="stage"
            options={constants.pipeline.stage}
          />
        </div>

        <DetailFieldModelSearchSelect<PipelineModel, ClientModel>
          record={props.pipeline}
          field="buyer_client_id"
          label="Buyer"
          displayField="buyer_client_name"
          placeholder="Buyer"
          modelName="client"
          modelDisplayField="label"
          modelSearchFilters={{ disabled: "0" }}
          modelSearchParam="q"
        />
        <DetailFieldModelSearchSelect<PipelineModel, ClientModel>
          record={props.pipeline}
          field="seller_client_id"
          label="Seller"
          displayField="seller_client_name"
          placeholder="Client"
          modelName="client"
          modelDisplayField="label"
          modelSearchFilters={{
            disabled: "0",
          }}
          modelSearchParam="q"
        />
      </div>
    </div>
  );
});
