import DetailFieldModelSearchSelect from "@/common_lib/components/form/details/DetailFieldModelSearchSelect";
import DetailFieldSelect from "@/common_lib/components/form/details/DetailFieldSelect";
import ClientModel from "@/pods/client/model/ClientModel";
import { constants } from "@/utils/constants";
import { observer } from "mobx-react";
import PipelineModel from "../../model/PipelineModel";

interface PipelineDetailsProps {
  pipeline: PipelineModel;
}
const PipelineDetails = observer((props: PipelineDetailsProps) => {
  return (
    <div className="p-10">
      <h2 className="text-lg font-semibold">Pipeline Info</h2>
      <div className="grid grid-cols-2 gap-x-5 gap-y-3">
        <div className="col-span-2">
          <DetailFieldSelect
            record={props.pipeline}
            field="stage"
            label="Stage"
            displayField="stageFmt"
            options={constants.pipeline.stages}
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

export default PipelineDetails;
