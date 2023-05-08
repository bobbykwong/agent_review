import _ from "lodash";
import Head from "next/head";
import Link from "next/link";

import { format } from "@/utils/format";
import { Spinner } from "@/components/spinner";
import { Tabs } from "@/components/tabs";
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
    registrationNum,
    registrationStartDate,
    registrationEndDate,
    estateAgentName,
    estateAgentLicenseNum,
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
      <div className="flex flex-col gap-12 max-w-screen-tablet mx-auto">
        <div className="max-w-screen-tablet">
          <h2 className="text-xl font-bold mb-4">Profile</h2>
          <div className="flex flex-col gap-6 tablet:gap-0">
            {profileItems.map(({ header, value }, i) => (
              <div
                key={i}
                className="flex flex-col tablet:flex-row tablet:items-center justify-between"
              >
                <span className="uppercase font-semibold text-sm tracking-wider">
                  {header}
                </span>
                <span>{value}</span>
              </div>
            ))}
            <div className="mt-12 ml-auto">
              <Link
                href={`/salespersons/${id}/evaluate`}
                className="block px-4 py-[6px] bg-teal-400 text-white rounded-lg hover:opacity-80"
              >
                Write Review
              </Link>
            </div>
          </div>
        </div>
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
    </>
  );
}
