import useSWR from "swr";

import { APIFilter, APIList, APISort, PageNum } from "@/api/types";
import { get } from "@/utils/apiClient";

import { SALESPERSONS_PAGE_SIZE } from "../components/Salespersons";
import { Salesperson } from "./getSalesperson";

function getSalespersons({
  filter,
  sort,
  pageNum,
}: {
  filter: APIFilter;
  sort: APISort;
  pageNum?: PageNum;
}) {
  let params: Record<string, any> = {
    limit: SALESPERSONS_PAGE_SIZE,
    ...filter,
    sortby: sort,
    page: pageNum,
  };

  return get<APIList<Salesperson>>("/salespersons", {
    params,
  });
}

export function useSalespersons({
  filter,
  sort,
  pageNum,
}: {
  filter: APIFilter;
  sort: APISort;
  pageNum?: PageNum;
}) {
  return useSWR(["salespersons", filter, sort, pageNum], () =>
    getSalespersons({ filter, sort, pageNum })
  );
}
