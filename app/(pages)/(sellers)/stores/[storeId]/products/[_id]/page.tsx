import Container from "@/components/custom/Container";
import ProductForm from "@/components/modules/sellers/stores/products/ProductForm";
import { Metadata } from "next";
import React from "react";

export default function page({
  params,
}: {
  params: { storeId: string; _id: string };
}) {
  return (
    <>
      <section className="py-10">
        <Container>
          <ProductForm storeId={params.storeId} _id={params._id} />
        </Container>
      </section>
    </>
  );
}

export const metadata: Metadata = {
  title: "Update - Orion - Ecommerce",
  description:
    "A Ecommerce app. We are selling everything, shoes for mens womens and kids",
  icons: {
    icon: "/assets/images/logo_dark.svg",
  },
};
