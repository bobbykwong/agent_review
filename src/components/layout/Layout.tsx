import { ReactNode } from "react";

import { NavBar } from "./NavBar";
import { Footer } from "./Footer";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div>
      <NavBar />
      {children}
      <Footer />
    </div>
  );
}
