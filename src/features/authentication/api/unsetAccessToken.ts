import { post } from "@/utils/apiClient";

export function unsetAccessToken() {
  return post<string>("/auth/unset-access-token", {});
}
