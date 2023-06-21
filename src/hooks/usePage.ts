import { useState } from "react";
import { useRouter } from "next/router";
import { PageNum } from "@/api/types";

export function usePage(queryPageNum: number) {
  const [pageNum, setPageNum] = useState<PageNum>(queryPageNum || 0);
  const router = useRouter();

  function resetPageNum() {
    setPageNum(0);
  }

  function prevPage() {
    const newPageNum = pageNum - 1;
    setPageNum(newPageNum);
    router.query.page = (newPageNum + 1).toString();
    router.push(router);
  }

  function nextPage() {
    const newPageNum = pageNum + 1;
    setPageNum(newPageNum);
    router.query.page = (newPageNum + 1).toString();
    router.push(router);
  }

  return {
    pageNum,
    setPageNum,
    resetPageNum,
    prevPage,
    nextPage,
  };
}
