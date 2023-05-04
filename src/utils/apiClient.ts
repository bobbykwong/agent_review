import qs from "qs";
import axios, { AxiosResponse, AxiosRequestConfig } from "axios";

import { cookies } from "./cookies";

const config = {
  baseURL: process.env.NEXT_PUBLIC_BASE_URL_LEGACY,
  withCredentials: true,
  paramsSerializer: {
    serialize: (params: any) => qs.stringify(params, { arrayFormat: "repeat" }),
  },
};

function defaultResponseHandler(res: AxiosResponse) {
  return res["data"];
}

const axiosInstance = axios.create(config);

export async function get<T>(
  url: string,
  config: AxiosRequestConfig = {}
): Promise<T> {
  return axiosInstance.get<T>(url, config).then(defaultResponseHandler);
}

export async function post<T>(
  url: string,
  data: any,
  config: AxiosRequestConfig = {}
): Promise<AxiosResponse<T>> {
  return axiosInstance.post<T>(url, data, {
    ...config,
    headers: {
      ...config["headers"],
      // "X-CSRF-TOKEN": cookies.get("csrf_access_token"),
    },
  });
}
