"use client";

import { CategoryModel } from "@/models/models/category/model/CategoryModel";
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

export interface CategoriesIndexProps {
  className?: string;
}

export const CategoriesIndex = observer(function CategoriesIndex({
  className,
}: CategoriesIndexProps = {}) {
  const [categories, setCategories] = useState<CategoryModel[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await Store.category.query({
        limit: "500",
        sort: "name",
      });

      if (response.success && response.data) {
        setCategories(response.data);
      }
      setLoading(false);
    };

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div className="mx-auto flex items-center justify-center p-6 md:w-[1200px]">
        <div className="text-center">Loading categories...</div>
      </div>
    );
  }

  const totalAssets = categories.reduce(
    (sum, category) => sum + (category.asset_count || 0),
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
            <h1 className="text-3xl font-semibold">Equipment Categories</h1>
            <p className="mt-2 text-sm text-white/80">
              Explore industrial equipment by category and find the right assets
              for your needs
            </p>
          </div>
          <div className="rounded-2xl border border-white/20 bg-gray-500/50 px-6 py-4 text-right">
            <p className="text-sm text-white/90">Total Categories</p>
            <p className="text-2xl font-semibold">{categories.length}</p>
            {totalAssets > 0 && (
              <p className="text-xs text-white/90">
                {totalAssets} assets available
              </p>
            )}
          </div>
        </div>
        <div className="mt-6 flex flex-wrap gap-2">
          <Badge variant="secondary" className="bg-white/20 text-white">
            {categories.length}{" "}
            {categories.length === 1 ? "Category" : "Categories"}
          </Badge>
          {totalAssets > 0 && (
            <Badge variant="secondary" className="bg-white/20 text-white">
              {totalAssets} Total Assets
            </Badge>
          )}
        </div>
      </div>

      <Separator className="my-4" />

      {/* Categories Grid */}
      {categories.length > 0 ? (
        <div className="w-full space-y-4">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/categories/${category.slug}`}
                className="group block transition-transform hover:scale-[1.02]"
              >
                <Card className="h-full border-slate-200 transition-shadow hover:shadow-lg">
                  <CardHeader>
                    <div className="flex items-start justify-between gap-3">
                      <CardTitle className="line-clamp-2 text-lg">
                        {category.name}
                      </CardTitle>
                      {category.asset_count > 0 && (
                        <Badge variant="secondary" className="shrink-0">
                          {category.asset_count}
                        </Badge>
                      )}
                    </div>
                    {category.description && (
                      <CardDescription className="line-clamp-3 text-sm">
                        {category.description}
                      </CardDescription>
                    )}
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm text-slate-600">
                      {category.asset_count > 0 ? (
                        <span>
                          {category.asset_count}{" "}
                          {category.asset_count === 1 ? "asset" : "assets"}{" "}
                          available
                        </span>
                      ) : (
                        <span className="text-slate-400">
                          No assets currently listed
                        </span>
                      )}
                    </div>
                    {category.industry_name && (
                      <div className="mt-2">
                        <Badge variant="outline" className="text-xs">
                          {category.industry_name}
                        </Badge>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      ) : (
        <div className="w-full py-12 text-center">
          <p className="text-lg text-slate-600">No categories found.</p>
        </div>
      )}
    </div>
  );
});
