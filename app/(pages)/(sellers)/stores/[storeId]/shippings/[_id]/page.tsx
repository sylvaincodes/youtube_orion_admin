import Container from "@/components/custom/Container";
import ShippingForm from "@/components/modules/sellers/stores/shippings/ShippingForm";
import { Metadata } from "next";
import React from "react";

export default function page({
  params,
}: {
  params: { _id: string; storeId: string };
}) {
  return (
    <>
      <section className="py-10">
        <Container>
          <ShippingForm _id={params._id} store={params.storeId} />
        </Container>
      </section>
    </>
  );
}

export const dynamicParams = true; // automatically add any further dynamic segment in generateStaticParams

export const metadata: Metadata = {
  title: "Shipping - Orion - Ecommerce",
  description:
    "A Ecommerce app. We are selling everything, shoes for mens womens and kids",
  icons: {
    icon: "/assets/images/logo_dark.svg",
  },
};
