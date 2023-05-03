import Link from "next/link";

import { HorizontalLayout } from "./HorizontalLayout";

export function NavBar() {
  return (
    <div className="bg-slate-800 h-16 sticky top-0">
      <div className="flex items-center h-full">
        <HorizontalLayout>
          <div className="flex items-center justify-between h-full">
            <Link href="/" className="text-teal-400 text-xl font-bold">
              Realway
            </Link>
            <Link href="/sign-up" className="text-teal-400">
              Sign up
            </Link>
          </div>
        </HorizontalLayout>
      </div>
    </div>
  );
}
