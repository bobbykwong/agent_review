import { Rating } from "@/components/rating";
import { Spinner } from "@/components/spinner";
import { ReviewChip } from "@/components/reviewChip";
import { format } from "@/utils/format";

import StarRoundedIcon from "@mui/icons-material/StarRounded";
import clsx from "clsx";

import { Review } from "../api/getLatestReviews";
import { useUser } from "@/features/users/api/getUser";
import { property } from "lodash";
import Link from "next/link";

interface ReviewCardProps {
  review: Review;
  isMoving: boolean
}

export function ReviewCard({ review, isMoving }: ReviewCardProps) {
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
    isVerified
  } = review;


  const authorQuery = useUser({ id: authorId });

  if (!authorQuery.data) return <Spinner />;

  const salespersonResult = salesperson[0]
  
  return (
    <a
      // Ensure that user does not click into profile when scrolling carousel
      onClick={e => {
        if (isMoving) {
          e.preventDefault();
        }
      }}
      href={`/salespersons/${salespersonId}`}
    >
      <div className="max-w-xs h-96 rounded overflow-hidden shadow-lg px-5 pt-5 ml-10 border-2 bg-slate-50">
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
              <p className="font-semibold align-text-bottom">{Math.round(salespersonResult.rating * 10) / 10} <span className="text-sm font-normal text-gray-500 align-text-bottom">({salespersonResult.numReviews}   {salespersonResult.numReviews === 1 ? "Review" : "Reviews"}) </span></p>
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
    </a>
  )
}

