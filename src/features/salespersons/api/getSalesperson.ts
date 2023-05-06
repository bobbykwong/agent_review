import useSWR from "swr";

import { get } from "@/utils/apiClientNew";

export interface Salesperson {
  id: string;
  photoURL: string;
  name: string;
  registrationNum: string;
  registrationStartDate: string;
  registrationEndDate: string;
  estateAgentName: string;
  estateAgentLicenseNum: string;
  // transactions: Transaction[];
}

function getSalesperson({ id }: { id: Salesperson["id"] }) {
  return get<Salesperson>(`/salespersons/${id}`);
}

export function useSalesperson({ id }: { id: Salesperson["id"] }) {
  return useSWR(["salespersons", id], () => getSalesperson({ id }));
}
