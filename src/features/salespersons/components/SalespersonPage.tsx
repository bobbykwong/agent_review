import _ from "lodash";

import { format } from "@/utils/format";
import { Spinner } from "@/components/spinner";
import { Table } from "@/components/table";

import {
  useSalesperson,
  Salesperson,
  Transaction,
} from "../api/getSalesperson";

interface SalespersonProps {
  id: Salesperson["id"];
}

export function SalespersonPage({ id }: SalespersonProps) {
  const salespersonQuery = useSalesperson({ id });

  if (!salespersonQuery.data) return <Spinner />;

  const {
    name,
    registrationNum,
    registrationStartDate,
    registrationEndDate,
    estateAgentName,
    estateAgentLicenseNum,
    transactions,
  } = salespersonQuery.data;

  const profileItems = [
    { header: "name", value: name },
    {
      header: "registration no.",
      value: registrationNum,
    },
    {
      header: "registration start",
      value: format.fullDate(registrationStartDate),
    },
    {
      header: "registration end",
      value: format.fullDate(registrationEndDate),
    },
    {
      header: "Agency",
      value: estateAgentName,
    },
    {
      header: "Agency registration no.",
      value: estateAgentLicenseNum,
    },
  ];

  return (
    <div className="flex flex-col gap-12">
      <div>
        <h2 className="text-xl font-bold mb-4">Profile</h2>
        <div className="flex flex-col gap-6 tablet:gap-0">
          {profileItems.map(({ header, value }, i) => (
            <div
              key={i}
              className="flex flex-col tablet:flex-row max-w-screen-tablet tablet:items-center justify-between"
            >
              <span className="uppercase font-semibold text-sm tracking-wider">
                {header}
              </span>
              <span>{value}</span>
            </div>
          ))}
        </div>
      </div>
      <div>
        <div>
          <div className="flex gap-4">
            <button className="bg-teal-400 text-white w-fit px-4 py-2 mb-4">
              Transactions
            </button>
            <button className="ring ring-inset ring-teal-400 text-teal-400 w-fit px-4 py-2 mb-4">
              Articles (coming soon)
            </button>
          </div>
          <Table<Transaction>
            data={_.orderBy(transactions, "transactionDate", "desc")}
            columns={[
              {
                title: "Date",
                field: "transactionDate",
                renderCell: ({ entry }) => (
                  <div>{format.fullDate(entry.transactionDate)}</div>
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
                renderCell: ({ entry }) => (
                  <div>{format.titleCase(entry.town)}</div>
                ),
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
