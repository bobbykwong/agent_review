import _ from "lodash";

import { Spinner } from "@/components/spinner";
import { Salesperson } from "@/features/salespersons";
import { useSalesperson } from "@/features/salespersons/api/getSalesperson";
import { Rating } from "@/components/rating";

import { useSalespersonReviews } from "../api/getSalespersonReviews";

interface SalespersonRatingProps {
  id: Salesperson["id"];
}

export function SalespersonRating({ id }: SalespersonRatingProps) {
  const salespersonQuery = useSalesperson({ id });
  const salespersonReviewsQuery = useSalespersonReviews({ id });

  if (!salespersonReviewsQuery.data || !salespersonQuery.data)
    return <Spinner />;

  return (
    <div className="flex gap-4 items-center">
      <Rating value={salespersonQuery.data.rating || 0} size="sm" readOnly />
      <p className="text-gray-400">
        {`${salespersonReviewsQuery.data.results.length} reviews`}
      </p>
    </div>
  );
}
