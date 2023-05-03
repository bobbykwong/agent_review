import { ReactNode } from "react";

interface HorizontalLayoutProps {
  children: ReactNode;
}

export function HorizontalLayout({ children }: HorizontalLayoutProps) {
  return (
    <div className="px-app max-w-screen-desktop w-full mx-auto">{children}</div>
  );
}
