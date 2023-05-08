import { useEffect, useMemo } from "react";

import { useSort } from "@/hooks/useSort";
import { format } from "@/utils/format";
import { Spinner } from "@/components/spinner";
import { CardGrid } from "@/components/layout";
import { usePage } from "@/hooks/usePage";
import { useFilter } from "@/hooks/useFilter";
import { Button } from "@/components/button";

import { useSalespersons } from "../api/getSalespersons";
import { SalespersonCardLinkUI } from "./SalespersonCardLinkUI";
import { SortSalespersons } from "./SortSalespersons";
import { FilterSalespersons } from "./FilterSalespersons";

export const SALESPERSONS_PAGE_SIZE = 24;

export function Salespersons() {
  const { pageNum, resetPageNum, prevPage, nextPage } = usePage();
  useEffect(() => window.scrollTo(0, 0), [pageNum]);

  const { filter, addFilterItems, removeFilterItems } = useFilter({});
  const { sort, addSortItem, removeSortItem } = useSort(
    "registrationStartDate_asc"
  );

  useEffect(resetPageNum, [filter, sort]);

  const salespersonsQuery = useSalespersons({
    filter,
    sort,
    pageNum,
  });

  const canPrev = useMemo(() => pageNum > 0, [pageNum]);
  const canNext = useMemo(
    () =>
      salespersonsQuery.data &&
      pageNum <
        Math.ceil(salespersonsQuery.data.totalResults / SALESPERSONS_PAGE_SIZE),
    [pageNum, salespersonsQuery.data]
  );

  return (
    <div>
      <div className="mx-auto w-[350px]">
        <FilterSalespersons filter={filter} addFilterItems={addFilterItems} />
      </div>
      <div className="w-fit ml-auto mt-8">
        <SortSalespersons
          sort={sort}
          addSortItem={addSortItem}
          removeSortItem={removeSortItem}
        />
      </div>
      {!salespersonsQuery.data ? (
        <Spinner />
      ) : (
        <>
          <div className="py-4 w-fit ml-auto">
            <p className="text-gray-600">{`${format.number(
              salespersonsQuery.data.totalResults
            )} results`}</p>
          </div>
          <CardGrid>
            {salespersonsQuery.data.results.map((s) => (
              <SalespersonCardLinkUI key={s.id} salesperson={s} />
            ))}
          </CardGrid>
          <div className="mt-12 flex justify-center gap-4">
            <Button
              variant={canPrev ? "primary" : "inverse"}
              disabled={!canPrev}
              onClick={canPrev ? prevPage : undefined}
            >
              Prev
            </Button>
            <Button
              variant={canNext ? "primary" : "inverse"}
              disabled={!canNext}
              onClick={canNext ? nextPage : undefined}
            >
              Next
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
