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
        <title>Realway</title>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <meta
          name="description"
          content="Find the perfect property agent in Singapore with our app. Use real transaction data and agent expertise to make an informed decision. Say goodbye to biased advertising and hello to reliable recommendations."
        />
        <link rel="icon" href="/graphics/hut.svg" />
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
    </>
  );
}
