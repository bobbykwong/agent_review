import useSWR from "swr";

import { APIFilter, APIList, APISort, PageToken } from "@/api/types";
import { get } from "@/utils/apiClient";

import { SALESPERSONS_PAGE_SIZE } from "../components/Salespersons";
import { Salesperson } from "./getSalesperson";

function getSalespersons({
  filter,
  sort,
  pageToken,
}: {
  filter: APIFilter;
  sort: APISort;
  pageToken?: PageToken;
}) {
  let params: Record<string, any> = {
    pageSize: SALESPERSONS_PAGE_SIZE,
    filter,
    sort,
  };

  if (pageToken) {
    params = { ...params, pageToken };
  }
  return get<APIList<Salesperson>>("/salespersons", {
    params,
  });
}

export function useSalespersons({
  filter,
  sort,
  pageToken,
}: {
  filter: APIFilter;
  sort: APISort;
  pageToken?: PageToken;
}) {
  return useSWR(["salespersons", filter, sort, pageToken], () =>
    getSalespersons({ filter, sort, pageToken })
  );
}
