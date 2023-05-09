import { useEffect, useMemo } from "react";
import Link from "next/link";

import { useSort } from "@/hooks/useSort";
import { usePage } from "@/hooks/usePage";
import { useFilter } from "@/hooks/useFilter";
import { format } from "@/utils/format";
import { Spinner } from "@/components/spinner";
import { Button } from "@/components/button";

import { SalespersonCardUI } from "./SalespersonCardUI";
import { useSalespersons } from "../api/getSalespersons";
import { SortSalespersons } from "./SortSalespersons";
import { FilterSalespersons } from "./FilterSalespersons";

export const SALESPERSONS_PAGE_SIZE = 12;

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
      <div className="w-[375px] ml-auto flex flex-col gap-4 items-end">
        <FilterSalespersons filter={filter} addFilterItems={addFilterItems} />
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
          <div className="grid grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 desktop:grid-cols-4 gap-4">
            {salespersonsQuery.data.results.map((s) => (
              <Link
                key={s.id}
                href={`/salespersons/${s.id}`}
                className="hover:ring ring-teal-400 ring-offset-1  rounded-lg duration-300"
              >
                <SalespersonCardUI salesperson={s} />
              </Link>
            ))}
          </div>
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
