import _ from "lodash";

import { Spinner } from "@/components/spinner";
import { Salesperson } from "@/features/salespersons";
import { Empty } from "@/components/empty";

import { useSalespersonReviews } from "../api/getSalespersonReviews";

import { Review } from "./Review";

interface SalespersonReviewsProps {
  id: Salesperson["id"];
}

export function SalespersonReviews({ id }: SalespersonReviewsProps) {
  const salespersonReviewsQuery = useSalespersonReviews({ id });

  if (!salespersonReviewsQuery.data) return <Spinner />;

  if (salespersonReviewsQuery.data.results.length === 0) return <Empty />;

  return (
    <div className="flex flex-col  divide-y">
      {_.orderBy(salespersonReviewsQuery.data.results, "createdAt", "desc").map(
        (r) => (
          <Review key={r.id} review={r} />
        )
      )}
    </div>
  );
}
