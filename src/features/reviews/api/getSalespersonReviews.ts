import useSWR from "swr";

import { get } from "@/utils/apiClient";
import { Salesperson } from "@/features/salespersons";
import { APIList } from "@/api/types";
import { User } from "@/features/users";

export interface Review {
  id: string;
  authorId: User["id"];
  salespersonId: Salesperson["id"];
  createdAt: string;
  experiencedAt: string;
  msg: string;
  rating: number;
  propertyType: string;
  transactionType: string;
  isVerified: boolean;
}

function getSalespersonReviews({ id }: { id: Salesperson["id"] }) {
  return get<APIList<Review>>("/reviews", {
    params: {
      salespersonId: id,
      limit: 10000000,
    },
  });
}

export function useSalespersonReviews({ id }: { id: Salesperson["id"] }) {
  return useSWR(["salesperson-reviews", id], () =>
    getSalespersonReviews({ id })
  );
}
