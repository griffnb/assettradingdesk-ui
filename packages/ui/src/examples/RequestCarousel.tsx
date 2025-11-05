import { RequestModel } from "@/models/models/request/model/RequestModel";
import { Store } from "@/models/store/Store";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/ui/shadcn/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/ui/shadcn/ui/carousel";

import { cn } from "@/ui/shadcn/utils";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";

// INSTRUCTIONAL EXAMPLE: Props interface with optional className for styling overrides
interface RequestCarouselProps {
  className?: string;
}

// INSTRUCTIONAL EXAMPLE: Always wrap components with observer for MobX reactivity
// INSTRUCTIONAL EXAMPLE: Use named function expressions for better debugging
export const RequestCarousel = observer(function RequestCarousel(
  fullProps: RequestCarouselProps,
) {
  // INSTRUCTIONAL EXAMPLE: When destructuring props, use fullProps as parameter name
  // Extract className separately when you need to merge it with component classes
  const { className, ...props } = fullProps;

  // INSTRUCTIONAL EXAMPLE: State declarations with explicit types
  const [requests, setRequests] = useState<RequestModel[]>([]);
  const [loading, setLoading] = useState(true);

  // INSTRUCTIONAL EXAMPLE: Data fetching in useEffect with async function inside
  // Always fetch data through Store, never call ServerService directly
  useEffect(() => {
    const fetchRequests = async () => {
      // INSTRUCTIONAL EXAMPLE: Store.query() returns a response with success flag and data
      const response = await Store.request.query({
        disabled: "0", // Filter for active records
        limit: "10",
      });
      if (response.success && response.data) {
        setRequests(response.data);
      }
      setLoading(false);
    };
    fetchRequests();
  }, []); // Empty dependency array - fetch once on mount

  // INSTRUCTIONAL EXAMPLE: Handle loading state early with simple return
  if (loading) {
    return <div className="p-6">Loading requests...</div>;
  }

  // INSTRUCTIONAL EXAMPLE: Handle empty state before rendering main content
  if (requests.length === 0) {
    return <div className="p-6">No requests found.</div>;
  }

  // INSTRUCTIONAL EXAMPLE: Main component wrapper uses cn() to merge base classes with optional className prop
  // Keep base layout classes first, then merge in the passed className
  return (
    <div className={cn("w-full px-12", className)} {...props}>
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {/* INSTRUCTIONAL EXAMPLE: Always use model.id as key in map iterations */}
          {requests.map((request) => (
            <CarouselItem
              key={request.id}
              className="md:basis-1/2 lg:basis-1/3"
            >
              <Card>
                <CardHeader>
                  {/* INSTRUCTIONAL EXAMPLE: Use model getters like request.label for computed display values */}
                  <CardTitle>{request.label}</CardTitle>
                  <CardDescription>
                    {/* INSTRUCTIONAL EXAMPLE: Provide fallback text with || for optional fields */}
                    {request.description || "No description"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {/* INSTRUCTIONAL EXAMPLE: Use Tailwind utility classes for spacing (space-y-2) instead of margins */}
                  <div className="space-y-2 text-sm">
                    {/* INSTRUCTIONAL EXAMPLE: Conditional rendering with && for optional data */}
                    {/* Use model getters for formatted values */}
                    {request.price_range && (
                      <div className="flex justify-between">
                        <span className="text-text-neutral-secondary">
                          Price Range:
                        </span>
                        <span>{request.price_range}</span>
                      </div>
                    )}
                    {request.year_range && (
                      <div className="flex justify-between">
                        <span className="text-text-neutral-secondary">
                          Year Range:
                        </span>
                        <span>{request.year_range}</span>
                      </div>
                    )}
                    {/* INSTRUCTIONAL EXAMPLE: Numeric comparisons for conditional display */}
                    {request.time_frame > 0 && (
                      <div className="flex justify-between">
                        <span className="text-text-neutral-secondary">
                          Time Frame:
                        </span>
                        <span>{request.time_frame} days</span>
                      </div>
                    )}
                  </div>
                </CardContent>
                {/* INSTRUCTIONAL EXAMPLE: CardFooter with border-t for visual separation */}
                <CardFooter className="border-t">
                  <div className="flex w-full items-center justify-between text-sm">
                    <span className="text-text-neutral-tertiary">
                      {/* INSTRUCTIONAL EXAMPLE: Fallback text for optional joined data */}
                      {request.company_name || "Unknown Company"}
                    </span>
                    {/* INSTRUCTIONAL EXAMPLE: Use cn() with array for conditional classes */}
                    {/* Group related classes together: base classes first, then conditional classes */}
                    {/* Use ternary for simple boolean-based class selection */}
                    <span
                      className={cn([
                        "rounded-full px-2 py-1 text-xs",
                        request.inPipeline === "Yes"
                          ? "bg-fg-success-secondary text-text-success-primary"
                          : "bg-fg-neutral-secondary text-text-neutral-secondary",
                      ])}
                    >
                      {request.inPipeline === "Yes"
                        ? "In Pipeline"
                        : "Available"}
                    </span>
                  </div>
                </CardFooter>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        {/* INSTRUCTIONAL EXAMPLE: Carousel navigation buttons */}
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
});
