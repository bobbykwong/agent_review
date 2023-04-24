import { Spinner } from "@/components/spinner";
import { CardGrid } from "@/components/layout";

import { useSalespersons } from "../api/getSalespersons";
import { SalespersonCardUI } from "./SalespersonCardUI";

export function Salespersons() {
  const salespersonsQuery = useSalespersons({ filter: {} });

  if (!salespersonsQuery.data) return <Spinner />;

  return (
    <div>
      <div className="flex gap-4 w-fit ml-auto">
        <div className="px-4 py-2 bg-teal-400 text-white">Sort by</div>
        <div className="px-4 py-2 bg-teal-400 text-white">Filter</div>
      </div>
      <br />
      <CardGrid>
        {salespersonsQuery.data.results.map((s) => (
          <SalespersonCardUI key={s.id} salesperson={s} />
        ))}
      </CardGrid>
    </div>
  );
}
