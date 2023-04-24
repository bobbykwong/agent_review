import _ from "lodash";

import { format } from "@/utils/format";
import { Spinner } from "@/components/spinner";
import { CardGrid } from "@/components/layout";

import { useSalesperson, Salesperson } from "../api/getSalesperson";

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
    <div>
      <div>
        <h2 className="text-xl font-bold mb-8">Profile</h2>
        {profileItems.map(({ header, value }, i) => (
          <div key={i} className="max-w-screen-mobile flex justify-between">
            <span className="uppercase font-semibold text-sm tracking-wider">
              {header}
            </span>
            <span>{value}</span>
          </div>
        ))}
      </div>
      <br />
      <div>
        <h2 className="text-xl font-bold mb-8">Transactions</h2>
        <CardGrid>
          {_.orderBy(transactions, "transactionDate", "desc").map((t, i) => (
            <div key={i} className="p-4 ring ring-inset ring-teal-400">
              {[
                { header: "date", value: format.fullDate(t.transactionDate) },
                { header: "transaction type", value: t.transactionType },
                {
                  header: "represented",
                  value: format.titleCase(t.represented),
                },
                { header: "property type", value: t.propertyType },
                { header: "town", value: format.titleCase(t.town) },
              ].map(({ header, value }, i) => (
                <div key={i} className="flex justify-between">
                  <span className="uppercase font-semibold text-sm tracking-wider">
                    {header}
                  </span>
                  <span>{value}</span>
                </div>
              ))}
            </div>
          ))}
        </CardGrid>
      </div>
    </div>
  );
}
