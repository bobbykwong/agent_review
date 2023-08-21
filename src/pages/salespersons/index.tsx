import Head from "next/head";

import { Salespersons } from "@/features/salespersons";
import { HorizontalLayout, PageLayout } from "@/components/layout";

export default function Home() {
  return (
    <>
      <Head>
        <title>Better Agents</title>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <meta
          name="description"
          content="Find the perfect property agent in Singapore with our app. Use real transaction data and agent expertise to make an informed decision. Say goodbye to biased advertising and hello to reliable recommendations."
        />
        <link rel="icon" href="/favicon_ver_1.png" />
      </Head>
      <div className="bg-gray-100">
        <PageLayout>
          <Salespersons />
        </PageLayout>
      </div>
    </>
  );
}
