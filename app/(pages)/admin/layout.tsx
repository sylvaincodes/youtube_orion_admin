import Header from "@/components/modules/admin/header";
import React from "react";

// Nextjs ISR caching strategy
export const revalidate = false;

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
