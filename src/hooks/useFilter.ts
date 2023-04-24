import _ from "lodash";
import { useState } from "react";

import { APIFilter } from "@/api/types";

export function useFilter(initialFilter: APIFilter) {
  const [filter, setFilter] = useState<APIFilter>(initialFilter);

  function addFilterItems(filterItems: APIFilter) {
    setFilter({ ...filter, ...filterItems });
  }
  function removeFilterItems(filterNames: string[]) {
    setFilter(_.omit(filter, filterNames));
  }

  return {
    filter,
    addFilterItems,
    removeFilterItems,
  };
}
