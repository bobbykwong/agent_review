import Head from "next/head";
import Script from 'next/script'

import { Salespersons } from "@/features/salespersons";
import { HorizontalLayout, PageLayout } from "@/components/layout";

export default function Home() {
  return (
    <>
      <Head>
        {/* Google tag (gtag.js) */}
        <Script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}></Script>
        <Script>
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}');
          `
          }
        </Script>
        <title>Real Estate Salespersons listing page</title>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <meta
          name="description"
          content="Find over 34,000 CEA registered property agents on our salespersons listing page."
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
