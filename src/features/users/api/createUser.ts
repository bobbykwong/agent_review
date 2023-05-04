import useSWRMutation from "swr/mutation";

import axios from "axios";

const config = {
  baseURL: "/api",
  withCredentials: true,
};

const axiosInstance = axios.create(config);

// TODO: move axiosInstance to app level

import { useNotificationStore } from "@/stores/useNotificationStore";

interface CreateUserParams {
  data: {
    name: string;
    email: string;
    photoURL: string;
  };
}

function createUser(params: CreateUserParams) {
  return axiosInstance.post("/users", params.data, config);
}

export function useCreateUser() {
  const notify = useNotificationStore((s) => s.notify);

  return useSWRMutation(
    "sign-up",
    (_, { arg }: { arg: CreateUserParams["data"] }) =>
      createUser({ data: arg }),
    {
      throwOnError: false,
      onSuccess: async () => {
        notify({ msg: "Welcome to Realway!", status: "success" });
      },
    }
  );
}
