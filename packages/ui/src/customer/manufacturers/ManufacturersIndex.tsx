"use client";

import { ManufacturerModel } from "@/models/models/manufacturer/model/ManufacturerModel";
import { Store } from "@/models/store/Store";
import { Badge } from "@/ui/shadcn/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/ui/shadcn/ui/card";
import { Separator } from "@/ui/shadcn/ui/separator";
import { cn } from "@/utils/cn";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { Link } from "react-router";

export interface ManufacturersIndexProps {
  className?: string;
}

export const ManufacturersIndex = observer(function ManufacturersIndex({
  className,
}: ManufacturersIndexProps = {}) {
  const [manufacturers, setManufacturers] = useState<ManufacturerModel[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchManufacturers = async () => {
      const response = await Store.manufacturer.query({
        limit: "90000",
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
      <div className="mx-auto flex items-center justify-center p-6 md:w-[1200px]">
        <div className="text-center">Loading manufacturers...</div>
      </div>
    );
  }

  const totalAssets = manufacturers.reduce(
    (sum, manufacturer) => sum + (manufacturer.asset_count || 0),
    0,
  );

  return (
    <div
      className={cn(
        "mx-auto flex flex-col items-center gap-8 bg-white p-6 md:w-[1200px]",
        className,
      )}
    >
      {/* Hero Section */}
      <div className="w-full rounded-3xl border bg-[url('/img/hero2.png')] bg-cover bg-center p-8 text-white">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex-1">
            <p className="text-sm uppercase tracking-widest text-white/70">
              Browse
            </p>
            <h1 className="text-3xl font-semibold">Equipment Manufacturers</h1>
            <p className="mt-2 text-sm text-white/80">
              Find used and refurbished machinery from trusted brands
            </p>
          </div>
          <div className="rounded-2xl border border-white/20 bg-gray-500/50 px-6 py-4 text-right">
            <p className="text-sm text-white/90">Total Manufacturers</p>
            <p className="text-2xl font-semibold">{manufacturers.length}</p>
            {totalAssets > 0 && (
              <p className="text-xs text-white/90">
                {totalAssets} assets available
              </p>
            )}
          </div>
        </div>
        <div className="mt-6 flex flex-wrap gap-2">
          <Badge variant="secondary" className="bg-white/20 text-white">
            {manufacturers.length}{" "}
            {manufacturers.length === 1 ? "Manufacturer" : "Manufacturers"}
          </Badge>
          {totalAssets > 0 && (
            <Badge variant="secondary" className="bg-white/20 text-white">
              {totalAssets} Total Assets
            </Badge>
          )}
        </div>
      </div>

      <Separator className="my-4" />

      {/* Manufacturers Grid */}
      {manufacturers.length > 0 ? (
        <div className="w-full space-y-4">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {manufacturers.map((manufacturer) => (
              <Link
                key={manufacturer.id}
                to={`/manufacturers/${manufacturer.slug}`}
                className="group block transition-transform hover:scale-[1.02]"
              >
                <Card className="h-full border-slate-200 transition-shadow hover:shadow-lg">
                  <CardHeader>
                    <div className="flex items-start justify-between gap-3">
                      <CardTitle className="line-clamp-2 text-lg">
                        {manufacturer.name}
                      </CardTitle>
                      {manufacturer.asset_count > 0 && (
                        <Badge variant="secondary" className="shrink-0">
                          {manufacturer.asset_count}
                        </Badge>
                      )}
                    </div>
                    {manufacturer.description && (
                      <CardDescription className="line-clamp-3 text-sm">
                        {manufacturer.description}
                      </CardDescription>
                    )}
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm text-slate-600">
                      {manufacturer.asset_count > 0 ? (
                        <span>
                          {manufacturer.asset_count}{" "}
                          {manufacturer.asset_count === 1 ? "asset" : "assets"}{" "}
                          available
                        </span>
                      ) : (
                        <span className="text-slate-400">
                          No assets currently listed
                        </span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      ) : (
        <div className="w-full py-12 text-center">
          <p className="text-lg text-slate-600">No manufacturers found.</p>
        </div>
      )}
    </div>
  );
});
