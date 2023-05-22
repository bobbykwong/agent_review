import Link from "next/link";

import { useAuthStore } from "@/features/authentication";
import { Spinner } from "@/components/spinner";

import { HorizontalLayout } from "./HorizontalLayout";
import { AuthStatus } from "./AuthStatus";

export function NavBar() {
  const initialised = useAuthStore((s) => s.initialised);

  return (
    <div className="bg-slate-800 h-16 sticky top-0 z-10">
      <div className="flex items-center h-full">
        <HorizontalLayout>
          <div className="flex items-center justify-between h-full">
            <Link href="/" className="text-teal-400 text-xl font-bold">
              Better Agents
            </Link>
            {initialised ? (
              <AuthStatus />
            ) : (
              <Spinner className="text-primary" />
            )}
          </div>
        </HorizontalLayout>
      </div>
    </div>
  );
}
