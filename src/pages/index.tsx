import Head from "next/head";

import { Salespersons } from "@/features/salespersons";

export default function Home() {
  return (
    <>
      <Head>
        <title>Realway</title>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <meta
          name="description"
          content="Find the perfect property agent in Singapore with our app. Use real transaction data and agent expertise to make an informed decision. Say goodbye to biased advertising and hello to reliable recommendations."
        />
        <link rel="icon" href="/graphics/hut.svg" />
      </Head>
      <Salespersons />
    </>
  );
}
