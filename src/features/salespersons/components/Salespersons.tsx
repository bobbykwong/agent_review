import clsx from "clsx";
import { useEffect, useMemo } from "react";

import { format } from "@/utils/format";
import { Spinner } from "@/components/spinner";
import { CardGrid } from "@/components/layout";
import { usePage } from "@/hooks/usePage";
import { usePageTokenCache } from "@/hooks/usePageTokenCache";
import { useFilter } from "@/hooks/useFilter";

import { useSalespersons } from "../api/getSalespersons";
import { SalespersonCardLinkUI } from "./SalespersonCardLinkUI";

export const SALESPERSONS_PAGE_SIZE = 36;

export function Salespersons() {
  const { pageNum, resetPageNum, prevPage, nextPage } = usePage();
  const { pageTokenCache, addToCache, resetCache, isCached } =
    usePageTokenCache();
  useEffect(() => window.scrollTo(0, 0), [pageNum]);

  const { filter, addFilterItems, removeFilterItems } = useFilter({});
  useEffect(() => {
    resetCache();
    resetPageNum();
  }, [filter]);

  const salespersonsQuery = useSalespersons({
    filter,
    pageToken: pageTokenCache.filter((p) => p.pageNum === pageNum)[0].pageToken,
  });

  useEffect(
    () =>
      salespersonsQuery.data &&
      addToCache(pageNum + 1, salespersonsQuery.data.nextPageToken),
    [pageNum, salespersonsQuery.data]
  );

  const canPrev = useMemo(() => pageNum > 1, [pageNum]);
  const canNext = useMemo(
    () =>
      isCached(pageNum) &&
      salespersonsQuery.data &&
      pageNum <
        Math.ceil(salespersonsQuery.data.totalResults / SALESPERSONS_PAGE_SIZE),
    [pageNum, salespersonsQuery.data]
  );

  if (!salespersonsQuery.data) return <Spinner />;

  return (
    <div>
      <div className="flex gap-4 w-fit ml-auto">
        <div className="px-4 py-2 bg-teal-400 text-white">Sort by</div>
      </div>
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
        <button
          className={clsx(
            "px-4 py-2",
            { "bg-teal-400 text-white": canPrev },
            { "cursor-not-allowed ring-2 ring-inset ring-teal-400": !canPrev }
          )}
          disabled={!canPrev}
          onClick={canPrev ? prevPage : undefined}
        >
          Prev
        </button>
        <button
          className={clsx(
            "px-4 py-2",
            { "bg-teal-400 text-white": canNext },
            { "cursor-not-allowed ring-2 ring-inset ring-teal-400": !canNext }
          )}
          disabled={!canNext}
          onClick={canNext ? nextPage : undefined}
        >
          Next
        </button>
      </div>
    </div>
  );
}
