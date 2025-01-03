import Container from "@/components/custom/Container";
import React from "react";
import Dashboard from "@/components/modules/sellers/stores/dashboard";
import { Metadata } from "next";

export const dynamic = "force-dynamic";

export default function page({
  params,
}: {
  params: { storeId: string };
}) {
  return (
    <section className="py-10">
      <Container>
        <Dashboard storeId={params.storeId} />
      </Container>
    </section>
  );
}

export const metadata: Metadata = {
  title: "Dashboard - Orion - Ecommerce",
  description:
    "A Ecommerce app. We are selling everything, shoes for mens womens and kids",
  icons: {
    icon: "/assets/images/logo_dark.svg",
  },
};
