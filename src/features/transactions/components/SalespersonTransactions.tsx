import _ from "lodash";

import { Salesperson } from "@/features/salespersons";
import { useSalespersonTransactions } from "../api/getSalespersonTransactions";
import { Spinner } from "@/components/spinner";
import { Table } from "@/components/table";
import { format } from "@/utils/format";

import { Transaction } from "../api/getSalespersonTransactions";

interface SalespersonTransactionsProps {
  id: Salesperson["id"];
}
export function SalespersonTransactions({ id }: SalespersonTransactionsProps) {
  const salespersonTransactionsQuery = useSalespersonTransactions({ id });

  if (!salespersonTransactionsQuery.data) return <Spinner />;

  return (
    <Table<Transaction>
      data={_.orderBy(
        salespersonTransactionsQuery.data.results,
        "transactedAt",
        "desc"
      )}
      columns={[
        {
          title: "Date",
          field: "transactedAt",
          renderCell: ({ entry }) => (
            <div>{format.fullDate(entry.transactedAt)}</div>
          ),
        },
        {
          title: "Transaction Type",
          field: "transactionType",
          renderCell: ({ entry }) => (
            <div>{format.titleCase(entry.transactionType)}</div>
          ),
        },
        {
          title: "Represented",
          field: "represented",
          renderCell: ({ entry }) => (
            <div>{format.titleCase(entry.represented)}</div>
          ),
        },
        {
          title: "Property Type",
          field: "propertyType",
          renderCell: ({ entry }) => (
            <div>{format.propertyType(entry.propertyType)}</div>
          ),
        },
        {
          title: "Town",
          field: "town",
          renderCell: ({ entry }) => <div>{format.titleCase(entry.town)}</div>,
        },
      ]}
    />
  );
}
