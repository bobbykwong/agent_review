import useSWR from "swr";

import { get } from "@/utils/apiClientNew";

export interface User {
  id: string;
  name: string;
  email: string;
  photoURL: string;
}

export function getUser({ id }: { id: User["id"] }) {
  return get<User>(`/users/${id}`);
}

export function useUser({ id }: { id: User["id"] }) {
  return useSWR(["users", id], () => getUser({ id }));
}
