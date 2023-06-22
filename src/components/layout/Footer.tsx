import Link from "next/link";
import { HorizontalLayout } from "./HorizontalLayout";

export function Footer() {
  return (
    <div className="flex justify-center items-center py-4 bg-gray-100">
      <HorizontalLayout>
        <div className="flex justify-center items-center gap-8 h-full">
          <Link href="/legal" className="underline underline-offset-4">
            Legal
          </Link>
          contact@betteragents.sg
        </div>
      </HorizontalLayout>
    </div>
  );
}
