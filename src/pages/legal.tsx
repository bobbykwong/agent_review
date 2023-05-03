import Link from "next/link";

import { PageLayout } from "@/components/layout";

export default function Page() {
  return (
    <PageLayout>
      <h2 className="text-2xl font-bold mb-2">Data source</h2>
      <p className="max-w-screen-tablet text-justify">
        Contains information from{" "}
        <Link
          href="https://data.gov.sg/dataset/cea-salesperson-info"
          className="text-teal-400 font-semibold"
        >
          CEA Salesperson Information
        </Link>{" "}
        and{" "}
        <Link
          href="https://data.gov.sg/dataset/cea-salesperson-residential-transaction-record"
          className="text-teal-400 font-semibold"
        >
          CEA Salespersons’ Property Transaction Records (residential)
        </Link>{" "}
        accessed on 2023-04-24, which is made available under the{" "}
        <Link
          href="https://data.gov.sg/open-data-licence"
          className="text-teal-400 font-semibold"
        >
          terms
        </Link>{" "}
        of the Singapore Open Data Licence version 1.0
      </p>
    </PageLayout>
  );
}
