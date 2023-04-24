import { Inter } from "next/font/google";
import { Salespersons } from "@/features/salespersons";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return <Salespersons />;
}
