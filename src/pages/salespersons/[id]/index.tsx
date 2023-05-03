import { useRouter } from "next/router";

import { Spinner } from "@/components/spinner";
import { SalespersonPage, Salesperson } from "@/features/salespersons";
import { PageLayout } from "@/components/layout";

export default function Page() {
  let { query } = useRouter();

  if (!query.id) return <Spinner />;

  const id = query.id as Salesperson["id"];

  return (
    <PageLayout>
      <SalespersonPage id={id} />
    </PageLayout>
  );
}
