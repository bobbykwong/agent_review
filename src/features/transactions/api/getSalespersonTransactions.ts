import useSWR from "swr";

import { get } from "@/utils/apiClient";
import { Salesperson } from "@/features/salespersons";
import { APIList } from "@/api/types";

export interface Transaction {
  salespersonId: Salesperson["id"];
  transactionType:
    | "RESALE"
    | "WHOLE RENTAL"
    | "ROOM RENTAL"
    | "NEW SALE"
    | "SUB-SALE";
  transactedAt: string;
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

function getSalespersonTransactions({ id }: { id: Salesperson["id"] }) {
  return get<APIList<Transaction>>("/transactions", {
    params: {
      salespersonId: id,
    },
  });
}

export function useSalespersonTransactions({ id }: { id: Salesperson["id"] }) {
  return useSWR(["salesperson-transactions", id], () =>
    getSalespersonTransactions({ id })
  );
}
