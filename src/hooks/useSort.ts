import _ from "lodash";
import { useState } from "react";

import { APISort } from "@/api/types";

export function useSort(initialSort: APISort) {
  const [sort, setSort] = useState<APISort>(initialSort);

  function addSortItem(sortItem: string) {
    setSort(sortItem);
  }
  function removeSortItem() {
    setSort(null);
  }

  return {
    sort,
    addSortItem,
    removeSortItem,
  };
}
