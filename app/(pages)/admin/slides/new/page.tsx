import Container from "@/components/custom/Container";
import SlideForm from "@/components/modules/admin/slides/SlideForm";
import { Metadata } from "next";
import React from "react";

export default function page() {
  return (
    <>
      <section className="py-10">
        <Container>
          <SlideForm />
        </Container>
      </section>
    </>
  );
}

export const metadata: Metadata = {
  title: "New Categories - Orion - Ecommerce",
  description:
    "A Ecommerce app. We are selling everything, shoes for mens womens and kids",
  icons: {
    icon: "/assets/images/logo_dark.svg",
  },
};
