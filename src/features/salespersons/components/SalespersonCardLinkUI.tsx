import Link from "next/link";
import AccountBoxRoundedIcon from "@mui/icons-material/AccountBoxRounded";
import { differenceInMonths } from "date-fns";

import { Salesperson } from "../api/getSalesperson";

interface SalespersonCardLinkUIProps {
  salesperson: Salesperson;
}
export function SalespersonCardLinkUI({
  salesperson,
}: SalespersonCardLinkUIProps) {
  return (
    <Link
      href={`/salespersons/${salesperson.id}`}
      className="bg-white rounded-xl p-4 shadow hover:ring ring-teal-400 duration-300"
    >
      <div className="flex gap-4">
        {salesperson.photoURL ? (
          <img
            src={salesperson.photoURL}
            className="h-36 w-28 object-cover rounded-xl"
            alt="salesperson"
          />
        ) : (
          <div className="h-36 w-28 object-cover bg-slate-800 text-white rounded-xl flex items-center justify-center">
            <AccountBoxRoundedIcon className="!text-5xl" />
          </div>
        )}
        <div className="truncate">
          <p className="font-medium text-lg truncate">{salesperson.name}</p>
          <p className="text-gray-500">{salesperson.registrationNum}</p>
          <div className="mt-4 text-gray-500 truncate">
            <p className="truncate">{salesperson.estateAgentName}</p>
            <p>{`Experience - ${Math.ceil(
              differenceInMonths(
                new Date(),
                new Date(salesperson.registrationStartDate)
              ) / 12
            )}Y`}</p>
            <p>No reviews yet</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
