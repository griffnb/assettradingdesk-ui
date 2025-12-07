import { FacilityModel } from "@/models/models/facility/model/FacilityModel";
import { Store } from "@/models/store/Store";
import { FacilityForm } from "@/ui/customer/settings/FacilityForm";
import { useState } from "react";
import { useNavigate } from "react-router";

export default function FacilityNew() {
  const navigate = useNavigate();
  const [facility] = useState<FacilityModel>(() => Store.facility.create());

  const handleSuccess = () => {
    navigate("/manage/facilities");
  };

  const handleCancel = () => {
    navigate("/manage/facilities");
  };

  return (
    <FacilityForm
      record={facility}
      onSuccess={handleSuccess}
      onCancel={handleCancel}
    />
  );
}
