import Link from "next/link";
import { differenceInMonths } from "date-fns";

import { Salesperson } from "../api/getSalesperson";

interface SalespersonCardLinkUIProps {
  salesperson: Salesperson;
}
export function SalespersonCardLinkUI({
  salesperson,
}: SalespersonCardLinkUIProps) {
  const items = [
    { header: "name", value: salesperson.name },
    {
      header: "transactions",
      value: salesperson.transactions.length,
    },
    {
      header: "experience",
      value: `${Math.ceil(
        differenceInMonths(
          new Date(),
          new Date(salesperson.registrationStartDate)
        ) / 12
      )}Y`,
    },
    {
      header: "articles",
      value: 0,
    },
  ];
  return (
    <Link
      href={`/salespersons/${salesperson.id}`}
      className="ring-2 ring-inset ring-teal-400 p-4 hover:ring-4 duration-300"
    >
      {items.map(({ header, value }, i) => (
        <div key={i} className="flex justify-between gap-8 overflow-hidden">
          <span className="flex-1 font-semibold text-sm uppercase tracking-wider">
            {header}
          </span>
          <span className="truncate">{value}</span>
        </div>
      ))}
    </Link>
  );
}
