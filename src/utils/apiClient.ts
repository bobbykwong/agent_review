import qs from "qs";
import axios, { AxiosResponse, AxiosRequestConfig } from "axios";

const config = {
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
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
