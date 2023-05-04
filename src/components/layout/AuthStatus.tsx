import { Dialog } from "@mui/material";

import { useAuthStore } from "@/features/authentication";
import { UserChip } from "@/features/users";
import { GoogleLoginOrSignupForm } from "@/features/authentication";
import { Spinner } from "@/components/spinner";
import { useDisclosure } from "@/hooks/useDisclosure";

export function AuthStatus() {
  const { open, close, isOpen } = useDisclosure();

  const isLoggedIn = useAuthStore((s) => s.isLoggedIn);
  const userId = useAuthStore((s) => s.userId);

  if (!isLoggedIn)
    return (
      <>
        <button onClick={open} className="text-teal-400">
          Log in
        </button>
        <Dialog onClose={close} open={isOpen}>
          <GoogleLoginOrSignupForm onSuccess={close} />
        </Dialog>
      </>
    );

  if (!userId) return <Spinner />;

  return <UserChip id={userId} />;
}
