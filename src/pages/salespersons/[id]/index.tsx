import { useRouter } from "next/router";

import { Spinner } from "@/components/spinner";
import { SalespersonPage, Salesperson } from "@/features/salespersons";
import { PageLayout } from "@/components/layout";

export default function Page() {
  const router = useRouter();
  
  // Declaring a variable with curly braces obtains the key of the object.
  // In this case, router = {"query": {"a" : "b"}, "c" : {"d" : "e"}}
  // so query = {"a" : "b"}
  let { query } = router;
  
  if (!query.id) return <Spinner />;
  const id = query.id as Salesperson["id"];

  const handleBackClick = () => {
    // Handle the back navigation logic here
    router.back()
  };

  return (
    <div className="bg-gray-100">
      <PageLayout>
        {/* <button onClick={handleBackClick}>Back</button> */}
        <SalespersonPage id={id} />
      </PageLayout>
    </div>
  );
}
