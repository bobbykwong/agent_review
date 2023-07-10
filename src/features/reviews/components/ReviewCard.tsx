import { Rating } from "@/components/rating";
import { Spinner } from "@/components/spinner";
import { ReviewChip } from "@/components/reviewChip";
import { format } from "@/utils/format";

import StarRoundedIcon from "@mui/icons-material/StarRounded";
import clsx from "clsx";

import { Review } from "../api/getLatestReviews";
import { useUser } from "@/features/users/api/getUser";
import { property } from "lodash";

interface ReviewCardProps {
  review: Review;
}

export function ReviewCard({ review }: ReviewCardProps) {
  const {
    id,
    authorId,
    salesperson,
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

  const salespersonResult = salesperson[0]

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg px-5 pt-5 ml-5  bg-slate-50">
      <div className="flex">
        <img
            src={salespersonResult.photoURL}
            className="w-14 h-14 object-cover rounded-full"
        />
        <div className="px-2">
          <p className="text-lg font-semibold">{salespersonResult.name}</p>
          <div className="flex">
            <StarRoundedIcon
                fontSize="small"
                className="text-teal-400"
              />
            {/* precision to 1 decimal place */}
            
            <p className="font-semibold align-text-bottom">{Math.round(salespersonResult.rating * 10) / 10} <span className="text-sm font-normal text-gray-500 align-text-bottom">({salespersonResult.numReviews} Reviews) </span></p>
            {/* <p className="text-sm text-gray-500 align-text-bottom">({salespersonResult.numReviews} Reviews)</p> */}
            
          </div>
        </div>
      </div>
      <div className="pt-2">
        <ReviewChip transactionType={transactionType} propertyType={propertyType} transactionCompleted={transactionCompleted} />
      </div>
      <div className="py-4">
        <p className="text-gray-500 text-m overflow-hidden h-15">
          {msg}
        </p>
      </div>
    </div>
  )
}

