import Link from "next/link";
import { Salesperson } from "../api/getSalesperson";

interface SalespersonCardUIProps {
  salesperson: Salesperson;
}
export function SalespersonCardUI({ salesperson }: SalespersonCardUIProps) {
  const items = [
    { header: "name", value: salesperson.name },
    {
      header: "transaction count",
      value: salesperson.transactions.length,
    },
    {
      header: "License period",
      value: `${new Date(salesperson.registrationStartDate).getFullYear()} till
        ${new Date(salesperson.registrationEndDate).getFullYear()}`,
    },
  ];
  return (
    <div className="ring ring-inset ring-teal-400 p-4">
      {items.map(({ header, value }, i) => (
        <div key={i} className="flex justify-between">
          <span className="font-semibold text-sm uppercase tracking-wider">
            {header}
          </span>
          <span>{value}</span>
        </div>
      ))}

      <br />
      <div className="w-fit ml-auto flex flex-col gap-2">
        <Link
          href={`/salespersons/${salesperson.id}`}
          className="px-2 py-1 bg-teal-400 text-white"
        >
          View profile
        </Link>
      </div>
    </div>
  );
}
