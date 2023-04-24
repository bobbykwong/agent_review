import { useState } from "react";

export function usePage() {
  const [pageNum, setPageNum] = useState(1);

  function resetPageNum() {
    setPageNum(1);
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
