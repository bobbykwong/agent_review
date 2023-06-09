export type PageToken = string | null;
export type PageNum = number;
export type NextPageToken = string;
export type TotalResults = number;
export type APIFilter = Record<string, any>;
export type APISort = string | null;

export interface APIList<ResultType> {
  nextPageToken: NextPageToken;
  totalResults: TotalResults;
  results: ResultType[];
}

export interface JSONPatchItem {
  op: "add" | "remove" | "replace";
  path: string;
  value: any;
}

export type JSONPatch = JSONPatchItem[];
