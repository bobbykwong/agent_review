import { differenceInMonths } from "date-fns";
import AccountBoxRoundedIcon from "@mui/icons-material/AccountBoxRounded";

import { Rating } from "@/components/rating";

import { Salesperson } from "../types";

interface SalespersonCardUIProps {
  salesperson: Salesperson;
}

export function SalespersonCardUI({ salesperson }: SalespersonCardUIProps) {
  return (
    <div className="bg-white rounded-lg h-full shadow">
      <div className="p-6 flex flex-col items-center">
        {/* Image */}
        <div className="w-24 h-24 rounded-3xl">
          {salesperson.photoURL ? (
            <img
              src={salesperson.photoURL}
              className="h-full w-full object-cover rounded-3xl object-top"
              alt="salesperson"
            />
          ) : (
            <div className="h-full w-full bg-slate-800 flex items-center justify-center rounded-3xl">
              <AccountBoxRoundedIcon className="!text-4xl text-white" />
            </div>
          )}
        </div>
        {/* Name and estate agent name */}
        <div className="mt-4 flex flex-col items-center">
          <p className="text-lg font-medium">{salesperson.name}</p>
          <p className="text-gray-400">{salesperson.estateAgentName}</p>
        </div>
        {/* Reviews */}
        <div className="mt-6">
          <div className="flex gap-4 items-center">
            <Rating value={salesperson.rating} size="sm" readOnly />
          </div>
        </div>
      </div>

      {/* Transactions and Experience */}
      <div className="flex divide-x py-4">
        <div className="px-6 flex-1 flex flex-col items-center justify-center">
          <span className="md:text-3xl text-2xl font-semibold">
            {salesperson.numReviews}
          </span>
          <span className="text-sm text-gray-400">
            {salesperson.numReviews === 1 ? "Review" : "Reviews"} 
          </span>
        </div>
        <div className="px-8 flex-1 flex flex-col items-center justify-center">
          <span className="md:text-3xl text-2xl font-semibold">
            {salesperson.numTransactions}
          </span>
          <span className="text-sm text-gray-400">Transactions</span>
        </div>
      </div>
    </div>
  );
}
