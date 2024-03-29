import { useEffect, useMemo } from "react";
import { useRouter } from 'next/router'
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
import { APIFilter } from "@/api/types";

export const SALESPERSONS_PAGE_SIZE = 12;

export function Salespersons() {
  // Get name from url params
  const {query} = useRouter();
  const queryName = query["name"] !== undefined ? query["name"] : ""
  const queryPageNum = query["page"] !== undefined ? parseInt(query["page"] as string)-1 : 0
  
  const { filter, addFilterItems, removeFilterItems } = useFilter({name: queryName});
  const { pageNum, setPageNum, resetPageNum, prevPage, nextPage } = usePage(queryPageNum);
  useEffect(() => window.scrollTo(0, 0), [pageNum]);
  const { sort, addSortItem, removeSortItem } = useSort("rating_desc");

  // Ensure that filter name is always aligned with url param name
  useEffect(() => {
    if (queryName !== filter.name) {
      addFilterItems({ name: queryName });
    }
  }, [queryName, filter.name, addFilterItems]);

  // Ensure that pageNum is always aligned with url page number
  useEffect(() => {
    if (queryPageNum !== pageNum) {
      setPageNum(queryPageNum);
    }
  }, [queryPageNum, pageNum]);

  // see notion task "Salespersons page reflects url params"
  // useEffect(resetPageNum, [filter, sort]);
  useEffect(() => {
    addSortItem("rating_desc")
  }, [filter])
  
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
    <div className="flex flex-col justify-center items-center">
      <div className="w-[320px] lg:w-1/2 flex flex-col lg:flex-row gap-4 items-end">
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
