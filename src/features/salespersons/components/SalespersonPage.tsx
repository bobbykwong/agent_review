import _ from "lodash";
import Head from "next/head";
import Link from "next/link";

import { format } from "@/utils/format";
import { Spinner } from "@/components/spinner";
import { Tabs } from "@/components/tabs";
import { Rating } from "@/components/rating";
import { SalespersonTransactions } from "@/features/transactions";
import { SalespersonReviews } from "@/features/reviews";

import { useSalesperson, Salesperson } from "../api/getSalesperson";

interface SalespersonProps {
  id: Salesperson["id"];
}

export function SalespersonPage({ id }: SalespersonProps) {
  const salespersonQuery = useSalesperson({ id });

  if (!salespersonQuery.data) return <Spinner />;

  const {
    name,
    photoURL,
    rating,
    numTransactions,
    numReviews,
    registrationNum,
    registrationStartDate,
    registrationEndDate,
    estateAgentName,
    estateAgentLicenseNum,
  } = salespersonQuery.data;

  const profileItems = [
    {
      header: "Transanctions",
      value: numTransactions,
    },
    {
      header: "Registration No.",
      value: registrationNum,
    },
    {
      header: "Registration Start",
      value: format.fullDate(registrationStartDate),
    },
    {
      header: "Registration End",
      value: format.fullDate(registrationEndDate),
    },
    {
      header: "Agency Registration No.",
      value: estateAgentLicenseNum,
    },
  ];

  return (
    <>
      <Head>
        <title>{name}</title>
        <meta
          name="description"
          content={`${name} is a real estate salesperson currently working with ${estateAgentName}.`}
        >
          {name}
        </meta>
      </Head>
      <div className="max-w-screen-tablet mx-auto">
        {/* Profile */}
        <div className="rounded-xl shadow bg-white">
          <div className="h-32 bg-teal-400 rounded-t-xl" />
          <div className="relative">
            <img
              src={photoURL}
              className="w-32 h-32 rounded-full object-cover object-top shadow ring ring-white absolute -top-16 left-8"
            />
            <div className="pt-24 pb-8 px-8">
              <p className="text-xl font-medium">{name}</p>
              <p className="text-gray-400">{estateAgentName}</p>
              <div className="mt-8">
                <div className="flex gap-4 items-center">
                  <Rating value={rating} size="sm" readOnly />
                  <p className="text-gray-400">
                    {numReviews === 0
                      ? "0 reviews"
                      : numReviews === 1
                      ? "1 review"
                      : `${numReviews} reviews`}
                  </p>
                </div>
              </div>
              <div className="mt-8 grid grid-cols-2 gap-y-4 gap-x-12">
                {profileItems.map(({ header, value }, i) => (
                  <div key={i}>
                    <p className="font-medium">{value}</p>
                    <p className="text-sm text-gray-400">{header}</p>
                  </div>
                ))}
              </div>
              <div className="mt-2 w-fit ml-auto">
                <Link
                  href={`/salespersons/${id}/evaluate`}
                  className="block px-4 py-[6px] bg-teal-400 text-white rounded-lg hover:opacity-80"
                >
                  Write Review
                </Link>
              </div>
            </div>
          </div>
        </div>
        {/* Tabs */}
        <div className="mt-8 rounded-xl shadow p-8 bg-white">
          <Tabs
            tabs={[
              { label: "Reviews", content: <SalespersonReviews id={id} /> },
              {
                label: "Transactions",
                content: <SalespersonTransactions id={id} />,
              },
            ]}
          />
        </div>
      </div>
    </>
  );
}
