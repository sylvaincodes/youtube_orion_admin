import Container from "@/components/custom/Container";
import ProductForm from "@/components/modules/sellers/stores/products/ProductForm";
import { Metadata } from "next";
import React from "react";

export default async function page({
  params,
}: {
  params: { storeId: string };
}) {

  const { storeId } = await  params
  return (
    <>
      <section className="py-10">
        <Container>
          <ProductForm storeId={storeId} />
        </Container>
      </section>
    </>
  );
}

export const metadata: Metadata = {
  title: "New product - Orion - Ecommerce",
  description:
    "A Ecommerce app. We are selling everything, shoes for mens womens and kids",
  icons: {
    icon: "/assets/images/logo_dark.svg",
  },
};
