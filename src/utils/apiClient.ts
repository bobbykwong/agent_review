import axios, { AxiosResponse, AxiosRequestConfig } from "axios";

const config = {
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  withCredentials: true,
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
    headers: config.headers,
  });
}
