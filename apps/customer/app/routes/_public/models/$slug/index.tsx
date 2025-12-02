import { ModelModel } from "@/models/models/model/model/ModelModel";
import { Store } from "@/models/store/Store";
import { LoadingSkeleton } from "@/ui/common/components/loading/LoadingSkeleton";
import { ModelDetails } from "@/ui/customer/models/ModelDetails";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import type { Route } from "../../../../../.react-router/types/app/routes/_public/models/$slug/+types/index";

export function meta({ params }: Route.MetaArgs) {
  return [
    { title: `${params.slug || "Model"} | Asset Trading Desk` },
    {
      name: "description",
      content: `Browse available ${params.slug || "model"} assets for sale. Find detailed specifications, pricing, and contact sellers.`
    },
  ];
}

export default observer(() => {
  const params = useParams();
  const slug = params.slug;

  const [model, setModel] = useState<ModelModel | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;

    setLoading(true);
    Store.model
      .query({ slug: slug, limit: "1" })
      .then((resp) => {
        if (resp.success && resp.data && resp.data.length > 0) {
          setModel(resp.data[0]);
        }
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return <LoadingSkeleton />;
  }

  if (!model) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Model Not Found</h1>
          <p className="mt-2 text-gray-600">
            The model you are looking for does not exist.
          </p>
        </div>
      </div>
    );
  }

  return <ModelDetails model={model} />;
});
