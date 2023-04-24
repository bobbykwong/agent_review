import clsx from "clsx";
import { ReactNode } from "react";

interface CardGridProps {
  children: ReactNode;
}

export function CardGrid({ children }: CardGridProps) {
  return (
    <div
      className={clsx(
        "grid justify-center gap-8 grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 desktop:grid-cols-4"
      )}
    >
      {children}
    </div>
  );
}
