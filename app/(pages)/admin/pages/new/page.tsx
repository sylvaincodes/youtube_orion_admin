import Container from "@/components/custom/Container";
import PageForm from "@/components/modules/admin/pages/PageForm";
import { Metadata } from "next";
import React from "react";

export default function page() {
  return (
    <>
      <section>
        <Container>
          <PageForm />
        </Container>
      </section>
    </>
  );
}

export const metadata: Metadata = {
  title: "New Page - Orion - Ecommerce",
  description:
    "A Ecommerce app. We are selling everything, shoes for mens womens and kids",
  icons: {
    icon: "/assets/images/logo_dark.svg",
  },
};
