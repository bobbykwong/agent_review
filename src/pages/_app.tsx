import clsx from "clsx";
import "@/styles/globals.css";
import Head from "next/head";
import type { AppProps } from "next/app";
import { Poppins } from "next/font/google";
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
          content="Find out more about your property agent. See reviews from past clients or write a review to help future clients."
        />
        <link rel="icon" href="/graphics/favicon_ver_1.png" />
      </Head>
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
