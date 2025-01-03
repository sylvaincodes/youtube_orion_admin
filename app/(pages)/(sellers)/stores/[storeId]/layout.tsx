import Header from "@/components/modules/sellers/header";
import { checkRole } from "@/lib/roles";
import { redirect } from "next/navigation";
import React from "react";

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { storeId: string };
}) {
    
  if ((await checkRole("admin")) === true) {
    redirect("/admin/dashboard");
  }

  const { storeId } = await params

  return (
    <>
      <Header storeId={storeId} />
      {children}
    </>
  );
}
