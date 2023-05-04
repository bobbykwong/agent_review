import { User } from "@/features/users";
import { post } from "@/utils/apiClient";

export function refreshToken() {
  return post<User["id"]>("/auth/refresh-token", {});
}
