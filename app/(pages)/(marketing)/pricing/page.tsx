import Container from "@/components/custom/Container";
import Row from "@/components/custom/Row";
import Pricing from "@/components/modules/marketing/pricing";
import { Metadata } from "next";
import React from "react";

export default function page() {
  return (
    <section>
      <Container>
        <Row>
          <Pricing />
        </Row>
      </Container>
    </section>
  );
}

export const metadata: Metadata = {
  title: "Pricing - Orion - Ecommerce",
  description:
    "A Ecommerce app. We are selling everything, shoes for mens womens and kids",
  icons: {
    icon: "/assets/images/logo_dark.svg",
  },
};
