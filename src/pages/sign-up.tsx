import useSWRMutation from "swr/mutation";
import { useState } from "react";
import { useRouter } from "next/router";
import { TextField } from "@mui/material";

import { post } from "@/utils/apiClient";
import { Button } from "@/components/button";
import { Salesperson } from "@/features/salespersons";
import { useNotificationStore } from "@/stores/useNotificationStore";

export default function Page() {
  const [registrationNum, setRegistrationNum] = useState("");
  const [email, setEmail] = useState("");

  const createInterestMutation = useCreateInterest();

  return (
    <div className="flex justify-center">
      <div className="max-w-screen-tablet">
        <div className="mb-16">
          <p className="text-justify">
            {`Thank you for your interest in our app! We're excited to share it
            with you, but we're still in the early stages of development. While
            the app isn't quite ready for public use, we would love to keep you
            updated on our progress and let you know as soon as it's available.
            If you'd like to stay in the loop, please enter your email address
            below and we'll add you to our mailing list. We appreciate your
            support and can't wait to share our app with you in the near future!`}
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <TextField
            label="CEA no."
            onChange={(e) => setRegistrationNum(e.target.value)}
            value={registrationNum}
          />
          <TextField
            label="Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <Button
            className="rounded"
            onClick={() => {
              createInterestMutation.trigger({
                registrationNum,
                email,
              });
            }}
            isLoading={createInterestMutation.isMutating}
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
}

interface CreateInterestParams {
  data: {
    registrationNum: Salesperson["registrationNum"];
    email: string;
  };
}

function createInterest(params: CreateInterestParams) {
  return post("/interests", params.data);
}

export function useCreateInterest() {
  const { push } = useRouter();

  const notify = useNotificationStore((s) => s.notify);

  return useSWRMutation(
    `interest`,
    (url, { arg }: { arg: CreateInterestParams["data"] }) =>
      createInterest({ data: arg }),
    {
      onSuccess: async () => {
        await push("/");
        notify({ msg: "Got it :)", status: "success" });
      },
      throwOnError: false,
    }
  );
}
