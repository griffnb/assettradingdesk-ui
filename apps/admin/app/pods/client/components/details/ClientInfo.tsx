import { SafeBaseModel } from "@/models/BaseModel";
import { ContactInfo } from "@/models/models/client/model/ClientBaseModel";
import { ClientModel } from "@/models/models/client/model/ClientModel";
import { FacilityModel } from "@/models/models/facility/model/FacilityModel";
import { DetailFieldCheckbox } from "@/ui/common/components/form/details/DetailFieldCheckbox";
import { DetailFieldModelSelect } from "@/ui/common/components/form/details/DetailFieldModelSelect";
import { DetailFieldText } from "@/ui/common/components/form/details/DetailFieldText";
import { observer } from "mobx-react-lite";

interface ClientInfoProps {
  client: ClientModel;
}
export const ClientInfo = observer(function ClientInfo(props: ClientInfoProps) {
  return (
    <div className="p-10">
      <h2 className="text-lg font-semibold">Client Information</h2>
      <div className="grid grid-cols-2 gap-x-5 gap-y-3">
        <DetailFieldText
          record={props.client}
          field="name"
          type="text"
          label="Name"
          placeholder="Name"
        />
        <DetailFieldText
          record={props.client}
          field="title"
          type="text"
          label="Title"
          placeholder="Title"
        />

        <DetailFieldModelSelect<ClientModel, FacilityModel>
          label="Facility"
          displayField="facility_name"
          record={props.client}
          field="facility_id"
          modelName="facility"
          modelDisplayField="name"
          modelSearchFilters={{
            disabled: "0",
            company_id: props.client.company_id?.toString() || "",
          }}
          modelSearchField="name"
        />

        <DetailFieldModelSelect<ClientModel, FacilityModel>
          label="Supervisor"
          displayField="supervisor_name"
          record={props.client}
          field="supervisor_client_id"
          modelName="client"
          modelDisplayField="name"
          modelSearchFilters={{
            disabled: "0",
            company_id: props.client.company_id?.toString() || "",
          }}
          modelSearchField="name"
        />

        <DetailFieldText
          record={props.client}
          field="phone"
          type="text"
          label="Phone"
          placeholder="Phone"
        />
        <DetailFieldText
          record={props.client}
          field="mobile"
          type="text"
          label="Mobile"
          placeholder="Mobile"
        />
        <DetailFieldText
          record={props.client}
          field="email"
          type="email"
          label="Email"
          placeholder="Email"
        />
        <DetailFieldText
          parentRecord={props.client}
          record={props.client.contact_info as SafeBaseModel<ContactInfo>}
          field="linkedin"
          type="url"
          label="Linkedin"
          placeholder="Linkedin"
          link={props.client.contact_info?.linkedin}
        />
        <DetailFieldCheckbox
          record={props.client}
          field="is_decision_maker"
          displayField="is_decision_maker"
          label="Decision Maker"
          placeholder="Decision Maker"
        />
      </div>
    </div>
  );
});
