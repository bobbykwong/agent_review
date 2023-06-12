import useSWRMutation from "swr/mutation";
import { useRouter } from "next/router";

import { useNotificationStore } from "@/stores/useNotificationStore";
import { post } from "@/utils/apiClient";
import { Salesperson } from "@/features/salespersons";

import { Review } from "./getSalespersonReviews";

export interface CreateReviewParams {
  data: Pick<
    Review,
    "salespersonId" | "experiencedAt" | "msg" | "rating" | "propertyType"
  >;
}

function createReview(params: CreateReviewParams) {
  return post<Review["id"]>("/reviews", params.data);
}

export function useCreateReview({
  salespersonId,
}: {
  salespersonId: Salesperson["id"];
}) {
  const notify = useNotificationStore((s) => s.notify);
  const { push } = useRouter();

  return useSWRMutation(
    ["salesperson-reviews", salespersonId],
    (url, { arg }: { arg: CreateReviewParams["data"] }) =>
      createReview({ data: arg }),
    {
      onSuccess: async () => {
        await push(`/salespersons/${salespersonId}`);
        notify({ msg: "Review submitted", status: "success" });
      },
      throwOnError: false,
    }
  );
}
