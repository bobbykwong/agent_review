import useSWR from "swr";

import { get } from "@/utils/apiClient";
import { APIList } from "@/api/types";

interface Salesperson {
  estateAgentLicenseNum: string;
  estateAgentName: string;
  id: string;
  name: string;
  numReviews: number;
  photoURL: string;
  rating: number;
  registrationEndDate: string;
  registrationNum: string;
  registrationStartDate: string;
  transactions: [];
}

export interface Review {
  id: string;
  authorId: string;
  salespersonId: string;
  salesperson: Salesperson[];
  createdAt: string;
  experiencedAt: string;
  msg: string;
  rating: number;
  propertyType: string;
  transactionType: string;
  transactionCompleted: boolean;
  isVerified: boolean;
}

function getLatestReviews() {
  return get<APIList<Review>>("/reviews/latest", {
    params: {
      limit: 5,
    },
  });
}

export function useLatestReviews() {
  return useSWR("latest-reviews", getLatestReviews);
}
