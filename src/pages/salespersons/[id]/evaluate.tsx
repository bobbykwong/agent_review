import _ from "lodash";
import { useRouter } from "next/router";

import { PageLayout } from "@/components/layout";
import { CreateReview } from "@/features/reviews";
import { Spinner } from "@/components/spinner";
import { Salesperson } from "@/features/salespersons";

export default function Page() {
  let { query } = useRouter();

  if (!query.id) return <Spinner />;

  const id = query.id as Salesperson["id"];

  return (
    <div className="bg-gray-100">
      <PageLayout>
        <CreateReview salespersonId={id} />
      </PageLayout>
    </div>
  );
}
