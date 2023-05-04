import jwtDecode from "jwt-decode";
import { useEffect } from "react";

export function UserSignupForm() {
  function handleCallbackResponse(response: any) {
    console.log("Encoded JWT ID Token: ", response.credential);
    console.log("Decoded JWT ID Token: ", jwtDecode(response.credential));
  }

  useEffect(() => {
    /* global google */
    // @ts-ignore

    google.accounts.id.initialize({
      client_id: process.env.NEXT_PUBLIC_GIS_CLIENT_ID,
      callback: handleCallbackResponse,
    });

    // @ts-ignore
    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      type: "standard",
      theme: "outline",
      size: "large",
      width: "320",
      logo_alignment: "left",
    });
  }, []);

  return (
    <div className="p-8 max-w-screen-mobile">
      <div className="flex flex-col gap-8 items-center">
        <h2 className="text-xl font-semibold text-center">
          Log in or sign up in seconds
        </h2>
        <div id="signInDiv" />
        <p className="text-gray-500 text-sm mt-4">
          By continuing, you agree to Realway&apos;{" "}
          <span className="underline">Terms of Use</span>.
        </p>
      </div>
    </div>
  );
}
