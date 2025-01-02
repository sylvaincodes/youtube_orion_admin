import Container from "@/components/custom/Container";
import ShippingForm from "@/components/modules/sellers/stores/shippings/ShippingForm";
import { Metadata } from "next";
import React from "react";

export default function page({ params }: { params: { storeId: string } }) {
  return (
    <>
      <section className="py-10">
        <Container>
          <ShippingForm store={params.storeId} />
        </Container>
      </section>
    </>
  );
}

export const metadata: Metadata = {
  title: "New Shipping - Orion - Ecommerce",
  description:
    "A Ecommerce app. We are selling everything, shoes for mens womens and kids",
  icons: {
    icon: "/assets/images/logo_dark.svg",
  },
};
