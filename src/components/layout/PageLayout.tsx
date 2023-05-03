import { ReactNode } from "react";

import { HorizontalLayout } from "./HorizontalLayout";

interface PageLayoutProps {
  children: ReactNode;
}

export function PageLayout({ children }: PageLayoutProps) {
  return (
    <div className="py-app min-h-screen">
      <HorizontalLayout>{children}</HorizontalLayout>
    </div>
  );
}
