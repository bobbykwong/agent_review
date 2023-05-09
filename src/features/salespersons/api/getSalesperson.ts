import useSWR from "swr";

import { get } from "@/utils/apiClient";

export interface Salesperson {
  id: string;
  photoURL: string;
  rating: number | null;
  numTransactions?: number; // (temp)
  numReviews?: number; // (temp)
  name: string;
  registrationNum: string;
  registrationStartDate: string;
  registrationEndDate: string;
  estateAgentName: string;
  estateAgentLicenseNum: string;
}

function getSalesperson({ id }: { id: Salesperson["id"] }) {
  return get<Salesperson>(`/salespersons/${id}`);
}

export function useSalesperson({ id }: { id: Salesperson["id"] }) {
  return useSWR(["salespersons", id], () => getSalesperson({ id }));
}
