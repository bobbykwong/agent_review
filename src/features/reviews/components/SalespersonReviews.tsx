import _ from "lodash";

import { Spinner } from "@/components/spinner";
import { format } from "@/utils/format";
import { Salesperson } from "@/features/salespersons";
import { Empty } from "@/components/empty";
import { Rating } from "@/components/rating";

import { useSalespersonReviews, Review } from "../api/getSalespersonReviews";

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

interface ReviewProps {
  review: Review;
}

function Review({ review }: ReviewProps) {
  const {
    id,
    authorId,
    salespersonId,
    createdAt,
    experiencedAt,
    msg,
    rating,
    isVerified,
  } = review;

  return (
    <div className="py-12 max-w-screen-tablet">
      <div>
        <div id="user" className="py-2 flex justify-between gap-4">
          <div className="flex gap-4">
            <img
              src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80"
              className="w-14 h-14 object-cover rounded-full"
            />
            <div>
              <p className="font-semibold">Peter Chao</p>
              <Rating value={rating} size="sm" readOnly />
            </div>
          </div>
          <span className="text-slate-400 text-sm">
            {format.timeAgo(createdAt)}
          </span>
        </div>
      </div>
      <div id="content" className="text-slate-600 leading-8">
        {msg}
      </div>
      <div className="mt-4 flex items-center justify-between">
        <span className="font-medium">{`Date of experience: ${format.monthYear(
          experiencedAt
        )}`}</span>
        {isVerified && (
          <div className="bg-teal-100 text-teal-700 px-2 py-1 rounded-lg">
            Verified
          </div>
        )}
      </div>
    </div>
  );
}
