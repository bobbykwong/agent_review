import { useState } from "react";

import { PageToken } from "@/api/types";

interface CacheItem {
  pageNum: number;
  pageToken: PageToken;
}

const INITIAL_CACHE: CacheItem[] = [{ pageNum: 1, pageToken: null }];

export function usePageTokenCache() {
  const [pageTokenCache, setPageTokenCache] = useState(INITIAL_CACHE);

  function resetCache() {
    setPageTokenCache(INITIAL_CACHE);
  }

  function addToCache(
    pageNum: CacheItem["pageNum"],
    pageToken: CacheItem["pageToken"]
  ) {
    setPageTokenCache([
      ...pageTokenCache.filter((p) => p.pageNum !== pageNum),
      { pageNum, pageToken },
    ]);
  }

  function isCached(pageNum: CacheItem["pageNum"]) {
    return pageTokenCache.map((p) => p.pageNum).includes(pageNum);
  }

  return {
    pageTokenCache,
    addToCache,
    resetCache,
    isCached,
  };
}
