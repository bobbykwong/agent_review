import clsx from "clsx";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Link from "next/link";
import { IBM_Plex_Mono } from "next/font/google";
import Head from "next/head";

const font = IBM_Plex_Mono({
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

export default function App({ Component, pageProps }: AppProps) {
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
      <main className={clsx("flex flex-col", font.className)}>
        <div className="py-4 px-[5vw] bg-white">
          <Link href="/" className="text-3xl font-bold text-teal-400 italic">
            Realway
          </Link>
        </div>
        <div className="px-[5vw] py-[5vh] pb-[15vh] flex-1">
          <Component {...pageProps} />
        </div>
        <div className="px-[5vw] py-32 bg-slate-100">
          <div className="flex gap-12 justify-center">
            <Link
              href="/legal"
              className="underline underline-offset-4 text-slate-700"
            >
              Legal
            </Link>
            <Link
              href="/legal"
              className="underline underline-offset-4 text-slate-700"
            >
              Contact us
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
