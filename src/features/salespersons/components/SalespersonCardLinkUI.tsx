import Link from "next/link";
import { differenceInMonths } from "date-fns";

import { Stars } from "@/components/star";

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
        <img
          src={
            salesperson.photoURL ||
            "https://images.unsplash.com/photo-1567111089028-9abb29aa1102?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1035&q=80"
          }
          className="h-36 w-28 object-cover rounded-xl"
          alt="salesperson"
        />
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
            {salesperson.rating === null ? (
              <p>No reviews yet</p>
            ) : (
              <Stars numStars={3} size="sm" />
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
