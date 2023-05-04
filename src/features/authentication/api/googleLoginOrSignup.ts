import useSWRMutation from "swr/mutation";

import { post } from "@/utils/apiClientNew";

// // TODO: move axiosInstance to app level

import { useNotificationStore } from "@/stores/useNotificationStore";
import { useAuthStore } from "@/features/authentication";
import { User } from "../../users/api/getUser";

interface GoogleLoginOrSignupParams {
  data: {
    googleIdToken: string;
  };
}

function googleLoginOrSignup(params: GoogleLoginOrSignupParams) {
  return post<User["id"]>("/auth/google-login-or-signup", params.data);
}

export function useGoogleLoginOrSignup() {
  const notify = useNotificationStore((s) => s.notify);
  const login = useAuthStore((s) => s.login);

  return useSWRMutation(
    "google-login-or-signup",
    (_, { arg }: { arg: GoogleLoginOrSignupParams["data"] }) =>
      googleLoginOrSignup({ data: arg }),
    {
      throwOnError: false,
      onSuccess: async ({ data: userId }) => {
        login(userId);
        notify({ msg: "Signed in successfully!", status: "success" });
      },
    }
  );
}
