import clsx from "clsx";
import "@/styles/globals.css";
import Head from "next/head";
import type { AppProps } from "next/app";
import { Poppins } from "next/font/google";
import Script from 'next/script'
import { SWRConfig, SWRConfiguration } from "swr";

import { MUIThemeProvider } from "@/styles/mui";
import { ProgressBar } from "@/components/progress-bar";
import { Notification } from "@/components/notification";
import { useNotificationStore } from "@/stores/useNotificationStore";
import { Layout } from "@/components/layout";
import { useAuthInit } from "@/features/authentication";
import { Analytics } from '@vercel/analytics/react';

const font = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

export default function App({ Component, pageProps }: AppProps) {
  useAuthInit();

  const notify = useNotificationStore((s) => s.notify);

  const swrConfig: SWRConfiguration = {
    dedupingInterval: 2400,
    onError: (e) => {
      if (e.response?.data) {
        notify({ msg: e.response.data, status: "error" });
      } else {
        notify({ msg: "An error occurred", status: "error" });
      }
    },
  };
  return (
    <>
      <Head>
        <title>Better Agents</title>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <meta
          name="description"
          content="BetterAgents is a property agent review website in Singapore"
        />
        <link rel="icon" href="/graphics/favicon_ver_1.png" />
      </Head>
      {/* Google tag (gtag.js) */}
      <Script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}></Script>
      <Script id="google-analytics">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}');
        `
        }
      </Script>
      <MUIThemeProvider>
        <SWRConfig value={swrConfig}>
          <main className={clsx("flex flex-col", font.className)}>
            <ProgressBar />
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </main>
        </SWRConfig>
        <Notification />
      </MUIThemeProvider>
      <Analytics />
    </>
  );
}
