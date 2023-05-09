import { Rating } from "@/components/rating";
import { Spinner } from "@/components/spinner";
import { format } from "@/utils/format";

import { Review } from "../api/getSalespersonReviews";
import { useUser } from "@/features/users/api/getUser";

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
    isVerified,
  } = review;

  const authorQuery = useUser({ id: authorId });

  if (!authorQuery.data) return <Spinner />;

  return (
    <div className="py-12 max-w-screen-tablet">
      <div>
        <div id="user" className="py-2 flex justify-between gap-4">
          <div className="flex gap-4">
            <img
              src={authorQuery.data.photoURL}
              className="w-12 h-12 object-cover rounded-full"
            />
            <div>
              <p className="font-semibold">{authorQuery.data.name}</p>
              <Rating value={rating} size="sm" readOnly />
            </div>
          </div>
          <span className="text-gray-400 text-sm">
            {format.timeAgo(createdAt)}
          </span>
        </div>
      </div>
      <div id="content" className="text-gray-600 leading-8">
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
