"use client";

import { ManufacturerModel } from "@/models/models/manufacturer/model/ManufacturerModel";
import { Store } from "@/models/store/Store";
import { Badge } from "@/ui/shadcn/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/ui/shadcn/ui/card";
import { Separator } from "@/ui/shadcn/ui/separator";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { Link } from "react-router";

export const ManufacturersIndex = observer(function ManufacturersIndex() {
  const [manufacturers, setManufacturers] = useState<ManufacturerModel[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchManufacturers = async () => {
      const response = await Store.manufacturer.query({
        limit: "500",
        sort: "name",
      });

      if (response.success && response.data) {
        setManufacturers(response.data);
      }
      setLoading(false);
    };

    fetchManufacturers();
  }, []);

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16">
        <div className="text-center">Loading manufacturers...</div>
      </div>
    );
  }

  const totalAssets = manufacturers.reduce(
    (sum, manufacturer) => sum + (manufacturer.asset_count || 0),
    0
  );

  return (
    <div className="bg-gradient-to-b from-slate-50 to-white">
        <div className="mx-auto max-w-7xl px-4 py-16">
          <div className="mb-12 text-center">
            <h1 className="mb-4 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
              Equipment Manufacturers
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-slate-600">
              Browse industrial equipment by manufacturer. Find used and refurbished machinery from trusted brands.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <Badge variant="secondary" className="text-base">
                {manufacturers.length} Manufacturers
              </Badge>
              <Badge variant="secondary" className="text-base">
                {totalAssets} Total Assets
              </Badge>
            </div>
          </div>

          <Separator className="mb-12" />

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {manufacturers.map((manufacturer) => (
              <Link
                key={manufacturer.id}
                to={`/manufacturers/${manufacturer.slug}`}
                className="transition-transform hover:scale-105"
              >
                <Card className="h-full border-slate-200 hover:border-slate-300 hover:shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span className="line-clamp-1">{manufacturer.name}</span>
                      {manufacturer.asset_count > 0 && (
                        <Badge variant="outline">
                          {manufacturer.asset_count}
                        </Badge>
                      )}
                    </CardTitle>
                    {manufacturer.description && (
                      <CardDescription className="line-clamp-3">
                        {manufacturer.description}
                      </CardDescription>
                    )}
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm text-slate-600">
                      {manufacturer.asset_count > 0 ? (
                        <span>
                          {manufacturer.asset_count} {manufacturer.asset_count === 1 ? "asset" : "assets"} available
                        </span>
                      ) : (
                        <span className="text-slate-400">No assets currently listed</span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {manufacturers.length === 0 && (
            <div className="py-12 text-center">
              <p className="text-lg text-slate-600">No manufacturers found.</p>
            </div>
          )}
        </div>
      </div>
  );
});
