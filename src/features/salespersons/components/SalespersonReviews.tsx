import _ from "lodash";

import { Stars } from "@/components/star";
import { format } from "@/utils/format";

import { Review } from "../api/getSalespersonReviews";
import { Salesperson } from "../types";

interface SalespersonReviewsProps {
  id: Salesperson["id"];
}

export function SalespersonReviews({ id }: SalespersonReviewsProps) {
  return (
    <div className="flex flex-col  divide-y">
      {_.orderBy(TEMP_REVIEWS, "createdAt", "desc").map((r) => (
        <Review key={r.id} review={r} />
      ))}
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
              <span className="font-semibold">Peter Chao</span>
              <Stars numStars={rating} size="sm" />
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

const TEMP_REVIEWS = [
  {
    id: "id1",
    authorId: "authorId",
    salespersonId: "salespersonId",
    createdAt: new Date("2023-03-25").toISOString(),
    experiencedAt: new Date("2022-03-25").toISOString(),
    msg: "I had the pleasure of working with Sarah Johnson when I was in the market to buy my first home. From start to finish, she was attentive, knowledgeable, and patient. She took the time to understand my needs and preferences, and helped me find the perfect home within my budget. Sarah was always available to answer my questions and guide me through the home buying process. Her expertise in the local market was evident, and she helped me make informed decisions. Overall, Sarah made the home buying process seamless and stress-free. I highly recommend her and Johnson & Co. Realty to anyone looking for a reliable and trustworthy real estate agent.",
    rating: 4,
    isVerified: true,
  },
  {
    id: "id2",
    authorId: "authorId",
    salespersonId: "salespersonId",
    createdAt: new Date("2023-04-25").toISOString(),
    experiencedAt: new Date("2022-04-25").toISOString(),
    msg: "I recently worked with Mark Lewis to sell my home, and I couldn't be happier with the experience. Mark is a true professional, and he went above and beyond to ensure that my home was marketed effectively and sold quickly. He provided me with expert guidance throughout the process, and his communication was top-notch. He was always available to answer my questions and address any concerns I had. Thanks to Mark's expertise and hard work, my home sold for a great price in a short amount of time. I highly recommend Mark Lewis and Lewis Real Estate Group to anyone looking to buy or sell a home.",
    rating: 5,
    isVerified: false,
  },
  {
    id: "id3",
    authorId: "authorId",
    salespersonId: "salespersonId",
    createdAt: new Date("2023-02-25").toISOString(),
    experiencedAt: new Date("2022-02-25").toISOString(),
    msg: "I had the pleasure of working with Jonathan Tan to find my perfect home. He was extremely helpful in understanding my needs and preferences, and worked tirelessly to find the ideal property. Jonathan's knowledge of the local market was impressive, and he made the home buying process stress-free. I highly recommend Jonathan Tan and Tan Homes.",
    rating: 5,
    isVerified: false,
  },
  {
    id: "id4",
    authorId: "authorId",
    salespersonId: "salespersonId",
    createdAt: new Date("2023-01-25").toISOString(),
    experiencedAt: new Date("2022-01-25").toISOString(),
    msg: "Jonathan Tan is an exceptional commercial real estate agent who helped me find the perfect property for my business. His knowledge of the local market and commercial real estate was impressive, and he made the process seamless. I highly recommend Jonathan Tan and Tan Commercial Real Estate.",
    rating: 4,
    isVerified: true,
  },
];
