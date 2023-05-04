import Dialog from "@mui/material/Dialog";
import Link from "next/link";

import { useDisclosure } from "@/hooks/useDisclosure";
import { UserSignupForm } from "@/features/users";

import { HorizontalLayout } from "./HorizontalLayout";

export function NavBar() {
  const { open, close, isOpen } = useDisclosure();
  return (
    <>
      <div className="bg-slate-800 h-16 sticky top-0">
        <div className="flex items-center h-full">
          <HorizontalLayout>
            <div className="flex items-center justify-between h-full">
              <Link href="/" className="text-teal-400 text-xl font-bold">
                Realway
              </Link>
              <button onClick={open} className="text-teal-400">
                Sign up
              </button>
            </div>
          </HorizontalLayout>
        </div>
      </div>
      <Dialog onClose={close} open={isOpen}>
        <UserSignupForm />
      </Dialog>
    </>
  );
}
