import { useRouter } from "next/router";

import { Spinner } from "@/components/spinner";
import { SalespersonPage, Salesperson } from "@/features/salespersons";

export default function Page() {
  let { query } = useRouter();

  if (!query.id) return <Spinner />;

  const id = query.id as Salesperson["id"];

  return <SalespersonPage id={id} />;
}
