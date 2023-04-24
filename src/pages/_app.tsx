import clsx from "clsx";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Link from "next/link";
import { IBM_Plex_Mono } from "next/font/google";

const font = IBM_Plex_Mono({
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <main>
        <div className={clsx(font.className, "py-4 px-[5vw] bg-white")}>
          <Link href="/" className="text-3xl font-bold text-teal-400 italic">
            frfr
          </Link>
        </div>
        <body className="px-[5vw] pb-[5vh]">
          <Component {...pageProps} />
        </body>
      </main>
    </>
  );
}
