import { ManufacturerModel } from "@/models/models/manufacturer/model/ManufacturerModel";
import { ModelModel } from "@/models/models/model/model/ModelModel";
import { Store } from "@/models/store/Store";
import { LoadingSkeleton } from "@/ui/common/components/loading/LoadingSkeleton";
import { ManufacturerDetails } from "@/ui/customer/manufacturers/ManufacturerDetails";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

export function meta({ params }: { params: { slug: string } }) {
  return [
    { title: `${params.slug} Equipment | Asset Trading Desk` },
    {
      name: "description",
      content: `Browse equipment models from ${params.slug}. Find industrial assets and machinery on Asset Trading Desk.`,
    },
  ];
}

export default observer(() => {
  const params = useParams();
  const slug = params.slug;

  const [manufacturer, setManufacturer] = useState<ManufacturerModel | null>(null);
  const [models, setModels] = useState<ModelModel[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;

    const fetchData = async () => {
      setLoading(true);

      // Fetch manufacturer by slug
      const manufacturerResp = await Store.manufacturer.query({ slug });
      if (manufacturerResp.success && manufacturerResp.data && manufacturerResp.data.length > 0) {
        const manufacturerData = manufacturerResp.data[0];
        setManufacturer(manufacturerData);

        // Fetch models for this manufacturer
        const modelsResp = await Store.model.query({ manufacturer_id: manufacturerData.id });
        if (modelsResp.success && modelsResp.data) {
          setModels(modelsResp.data);
        }
      }

      setLoading(false);
    };

    fetchData();
  }, [slug]);

  if (loading) {
    return <LoadingSkeleton />;
  }

  if (!manufacturer) {
    return <div className="p-8 text-center">Manufacturer not found</div>;
  }

  return <ManufacturerDetails manufacturer={manufacturer} models={models} />;
});
