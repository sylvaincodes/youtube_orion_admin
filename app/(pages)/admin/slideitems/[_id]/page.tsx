import Container from "@/components/custom/Container";
import SlideItemForm from "@/components/modules/admin/slideitems/SlideItemForm";
import { Metadata } from "next";
import React from "react";

export default async function page({ params }: { params: { _id: string } }) {
  const { _id } = await params;
  return (
    <>
      <section className="py-10">
        <Container>
          <SlideItemForm _id={_id} />
        </Container>
      </section>
    </>
  );
}

export const metadata: Metadata = {
  title: "Campaigns sellers - Orion - Ecommerce",
  description:
    "A Ecommerce app. We are selling everything, shoes for mens womens and kids",
  icons: {
    icon: "/assets/images/logo_dark.svg",
  },
};
