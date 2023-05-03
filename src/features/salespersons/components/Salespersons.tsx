import clsx from "clsx";
import { useState, useEffect, useMemo } from "react";
import { Menu, MenuItem } from "@mui/material";

import { format } from "@/utils/format";
import { Spinner } from "@/components/spinner";
import { CardGrid } from "@/components/layout";
import { usePage } from "@/hooks/usePage";
import { usePageTokenCache } from "@/hooks/usePageTokenCache";
import { useFilter } from "@/hooks/useFilter";
import { Button } from "@/components/button";

import { useSalespersons } from "../api/getSalespersons";
import { SalespersonCardLinkUI } from "./SalespersonCardLinkUI";
import { useSort } from "@/hooks/useSort";
import { APISort } from "@/api/types";

export const SALESPERSONS_PAGE_SIZE = 36;

export function Salespersons() {
  const { pageNum, resetPageNum, prevPage, nextPage } = usePage();
  const { pageTokenCache, addToCache, resetCache, isCached } =
    usePageTokenCache();
  useEffect(() => window.scrollTo(0, 0), [pageNum]);

  const { filter, addFilterItems, removeFilterItems } = useFilter({});
  const { sort, addSortItem, removeSortItem } = useSort("experience");

  useEffect(() => {
    resetCache();
    resetPageNum();
  }, [filter, sort]);

  const salespersonsQuery = useSalespersons({
    filter,
    sort,
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
        <SortSalespersons
          sort={sort}
          addSortItem={addSortItem}
          removeSortItem={removeSortItem}
        />
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
    </div>
  );
}

interface SortSalespersonsProps {
  sort: APISort;
  addSortItem: (sortItem: string) => void;
  removeSortItem: () => void;
}

function SortSalespersons({
  sort,
  addSortItem,
  removeSortItem,
}: SortSalespersonsProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button onClick={handleClick}>Sort by</Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem
          onClick={() => {
            addSortItem("experience");
            handleClose();
          }}
        >
          Experience
        </MenuItem>
        <MenuItem
          onClick={() => {
            addSortItem("numTransactions");
            handleClose();
          }}
        >
          Number of transactions
        </MenuItem>
        <MenuItem onClick={handleClose}>Number of articles</MenuItem>
        <MenuItem onClick={handleClose}>Rating</MenuItem>
      </Menu>
    </div>
  );
}
