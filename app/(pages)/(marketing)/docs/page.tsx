import Container from "@/components/custom/Container";
import Row from "@/components/custom/Row";
import Docs from "@/components/modules/marketing/docs";
import { mergeOpenGraph } from "@/lib/mergeOpenGraph";
import { Metadata } from "next";
import React from "react";

export default function page() {
  return (
    <section>
      <Container>
        <Row>
          <Docs/>
        </Row>
      </Container>
    </section>
  );
}

export const metadata: Metadata = {
  title: "Docs - Orion - Ecommerce",
  description:
    "A Ecommerce app. We are selling everything, shoes for mens womens and kids",
  icons: {
    icon: "/assets/images/logo_dark.svg",
  },

  //For SEO: Sharing on social media twitter, whatsapp, Linkeidn etc
  openGraph: mergeOpenGraph({
    title: `Docs Orion - Ecommerce`,
    url: `/`,
  }),
};
