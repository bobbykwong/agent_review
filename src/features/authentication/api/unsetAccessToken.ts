import { post } from "@/utils/apiClientNew";

export function unsetAccessToken() {
  return post<string>("/auth/unset-access-token", {});
}
