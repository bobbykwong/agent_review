import { useState } from "react";
import { useRouter } from "next/router";
import { PageNum } from "@/api/types";

export function usePage() {
  const [pageNum, setPageNum] = useState<PageNum>(0);
  const router = useRouter();

  function resetPageNum() {
    setPageNum(0);
  }

  function prevPage() {
    setPageNum(pageNum - 1);
    router.query.page = pageNum.toString();
  }

  function nextPage() {
    setPageNum(pageNum + 1);
    router.query.page = pageNum.toString();
  }

  return {
    pageNum,
    resetPageNum,
    prevPage,
    nextPage,
  };
}
