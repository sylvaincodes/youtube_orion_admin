import { getOrderitems } from "@/actions/orderitem";
import Container from "@/components/custom/Container";
import OrderForm from "@/components/modules/sellers/stores/orders/OrderForm";
import { Metadata } from "next";
import React from "react";

export default async function page({
  params,
}: {
  params: {_id: string };
}) {
  const order = await getOrderitems(params._id);

  return (
    <>
      <section className="py-10">
        <Container>
          <OrderForm order={order}  />
        </Container>
      </section>
    </>
  );
}

export const metadata: Metadata = {
  title: "Order - Orion - Ecommerce",
  description:
    "A Ecommerce app. We are selling everything, shoes for mens womens and kids",
  icons: {
    icon: "/assets/images/logo_dark.svg",
  },
};
