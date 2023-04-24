import useSWR from "swr";

import { APIFilter, APIList, PageToken } from "@/api/types";
import { get } from "@/utils/apiClient";

import { SALESPERSONS_PAGE_SIZE } from "../components/Salespersons";
import { Salesperson } from "./getSalesperson";

function getSalespersons({
  filter,
  pageToken,
}: {
  filter: APIFilter;
  pageToken?: PageToken;
}) {
  let params: Record<string, any> = {
    pageSize: SALESPERSONS_PAGE_SIZE,
  };

  if (filter) {
    params = { ...params, filter };
  }
  if (pageToken) {
    params = { ...params, pageToken };
  }
  return get<APIList<Salesperson>>("/salespersons", {
    params,
  });
}

export function useSalespersons({
  filter,
  pageToken,
}: {
  filter: APIFilter;
  pageToken?: PageToken;
}) {
  return useSWR(["salespersons", filter, pageToken], () =>
    getSalespersons({ filter, pageToken })
  );
}
