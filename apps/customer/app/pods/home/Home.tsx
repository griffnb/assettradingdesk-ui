import { Button } from "@/ui/shadcn/ui/button";
import { Card, CardContent } from "@/ui/shadcn/ui/card";
import { Input } from "@/ui/shadcn/ui/input";
import { Search } from "lucide-react";
import { observer } from "mobx-react-lite";

export const Home = observer(function Home() {
  return (
    <div className="h-dvh bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Hero Section */}
      <div className="relative px-6 py-24 sm:px-12 lg:px-20">
        <div className="mx-auto max-w-7xl">
          {/* Main Hero Content */}
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
              The simplest way to buy & sell
              <span className="block text-blue-600">Semiconductor Assets</span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">
              Second-hand equipment, first-class service. Transact with
              confidence with verified, up-to-date information on the tools you
              need.
            </p>

            {/* Search Bar */}
            <div className="mx-auto mt-10 max-w-xl">
              <div className="flex items-center gap-3 rounded-lg border bg-white p-2 shadow-lg">
                <Search className="ml-3 h-5 w-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search equipment, manufacturers, models..."
                  className="flex-1 border-0 bg-transparent text-lg placeholder:text-gray-400 focus-visible:ring-0"
                />
                <Button size="lg" className="px-8">
                  Search
                </Button>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="mt-8 flex items-center justify-center gap-x-6">
              <Button size="lg" variant="outline" className="px-8">
                Browse Listings
              </Button>
            </div>
          </div>

          {/* Statistics Section */}
          <div className="mx-auto mt-20 max-w-4xl">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <Card className="border bg-white/60 backdrop-blur-sm">
                <CardContent className="p-8 text-center">
                  <div className="text-3xl font-bold text-blue-600">40,417</div>
                  <div className="mt-2 text-sm font-semibold uppercase tracking-wide text-gray-600">
                    Active Listings
                  </div>
                </CardContent>
              </Card>

              <Card className="border bg-white/60 backdrop-blur-sm">
                <CardContent className="p-8 text-center">
                  <div className="text-3xl font-bold text-green-600">
                    $7.1B+
                  </div>
                  <div className="mt-2 text-sm font-semibold uppercase tracking-wide text-gray-600">
                    Total Value of Equipment
                  </div>
                </CardContent>
              </Card>

              <Card className="border bg-white/60 backdrop-blur-sm sm:col-span-2 lg:col-span-1">
                <CardContent className="p-8 text-center">
                  <div className="text-3xl font-bold text-purple-600">
                    5,884+
                  </div>
                  <div className="mt-2 text-sm font-semibold uppercase tracking-wide text-gray-600">
                    Companies and Growing
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
