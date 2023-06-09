import { Rating } from "@/components/rating";
import { Spinner } from "@/components/spinner";
import { ReviewChip } from "@/components/reviewChip";
import { format } from "@/utils/format";

import { Review } from "../api/getSalespersonReviews";
import { useUser } from "@/features/users/api/getUser";
import { property } from "lodash";

interface ReviewProps {
  review: Review;
}

export function Review({ review }: ReviewProps) {
  const {
    id,
    authorId,
    salespersonId,
    createdAt,
    experiencedAt,
    msg,
    rating,
    propertyType,
    transactionType,
    transactionCompleted,
    isVerified,
  } = review;

  const authorQuery = useUser({ id: authorId });

  if (!authorQuery.data) return <Spinner />;

  return (
    <div className="py-12 max-w-screen-tablet">
      <div className="flex gap-4 py-2">
        <img
          src={authorQuery.data.photoURL}
          className="w-12 h-12 object-cover rounded-full"
        />
        <div>
          <p className="font-semibold">{authorQuery.data.name}</p>
          <Rating value={rating} size="sm" readOnly />
        </div>
      </div>
      <div>
        <ReviewChip transactionType={transactionType} propertyType={propertyType} transactionCompleted={transactionCompleted} />
      </div>
      <div id="content" className="mt-4 text-gray-600 leading-8">
        {msg}
      </div>
      <div className="mt-4">
        <p className="font-medium">{`Date of review: ${format.monthYear(
          createdAt
        )}`}</p>
        <p className="font-medium">{`Date of experience: ${format.monthYear(
          experiencedAt
        )}`}</p>
      </div>
    </div>
  );
}
