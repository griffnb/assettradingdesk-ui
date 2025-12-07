import { FacilityModel } from "@/models/models/facility/model/FacilityModel";
import { Store } from "@/models/store/Store";
import { FacilityForm } from "@/ui/customer/settings/FacilityForm";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

export default function FacilityEdit() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [facility, setFacility] = useState<FacilityModel | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      Store.facility.get(id).then((resp: any) => {
        if (resp.success && resp.data) {
          setFacility(resp.data);
        }
        setLoading(false);
      });
    }
  }, [id]);

  const handleSuccess = () => {
    navigate("/manage/facilities");
  };

  const handleCancel = () => {
    navigate("/manage/facilities");
  };

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <i className="fa fa-spinner fa-spin text-4xl text-gray-800"></i>
      </div>
    );
  }

  if (!facility) {
    return (
      <div className="flex h-full items-center justify-center">
        <p>Facility not found</p>
      </div>
    );
  }

  return (
    <FacilityForm
      record={facility}
      onSuccess={handleSuccess}
      onCancel={handleCancel}
    />
  );
}
