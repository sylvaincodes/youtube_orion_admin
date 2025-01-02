import Container from "@/components/custom/Container";
import BrandForm from "@/components/modules/admin/brands/BrandForm";
import { Metadata } from "next";
import React from "react";

export default function page() {
  return (
    <>
      <section className="py-10">
        <Container>
          <BrandForm />
        </Container>
      </section>
    </>
  );
}

export const metadata: Metadata = {
  title: "New Brand - Orion - Ecommerce",
  description:
    "A Ecommerce app. We are selling everything, shoes for mens womens and kids",
  icons: {
    icon: "/assets/images/logo_dark.svg",
  },
};
