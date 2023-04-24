import useSWR from "swr";

import { get } from "@/utils/apiClient";

export interface Transaction {
  transactionType:
    | "RESALE"
    | "WHOLE RENTAL"
    | "ROOM RENTAL"
    | "NEW SALE"
    | "SUB-SALE";
  transactionDate: string;
  represented: "BUYER" | "SELLER" | "LANDLORD" | "TENANT";
  propertyType:
    | "HDB"
    | "CONDOMINIUM_APARTMENTS"
    | "LANDED"
    | "STRATA_LANDED"
    | "EXECUTIVE_CONDOMINIUM";
  town: string;
  district: string;
  generalLocation: string;
}

export interface Salesperson {
  id: string;
  name: string;
  registrationNum: string;
  registrationStartDate: string;
  registrationEndDate: string;
  estateAgentName: string;
  estateAgentLicenseNum: string;
  transactions: Transaction[];
}

function getSalesperson({ id }: { id: Salesperson["id"] }) {
  return get<Salesperson>(`/salespersons/${id}`);
}

export function useSalesperson({ id }: { id: Salesperson["id"] }) {
  return useSWR(["salespersons", id], () => getSalesperson({ id }));
}
