import { useState } from "react";
import { PageNum } from "@/api/types";

export function usePage() {
  const [pageNum, setPageNum] = useState<PageNum>(0);

  function resetPageNum() {
    setPageNum(0);
  }

  function prevPage() {
    setPageNum(pageNum - 1);
  }

  function nextPage() {
    setPageNum(pageNum + 1);
  }

  return {
    pageNum,
    resetPageNum,
    prevPage,
    nextPage,
  };
}
