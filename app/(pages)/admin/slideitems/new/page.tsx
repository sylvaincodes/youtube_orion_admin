import Container from "@/components/custom/Container";
import SlideItemForm from "@/components/modules/admin/slideitems/SlideItemForm";
import { Metadata } from "next";
import React from "react";

export default function page() {
  return (
    <>
      <section className="py-10">
        <Container>
          <SlideItemForm />
        </Container>
      </section>
    </>
  );
}

export const metadata: Metadata = {
  title: "New Sub Categories - Orion - Ecommerce",
  description:
    "A Ecommerce app. We are selling everything, shoes for mens womens and kids",
  icons: {
    icon: "/assets/images/logo_dark.svg",
  },
};
