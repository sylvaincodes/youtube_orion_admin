import { getEarnings } from "@/actions/orderitem";
import Container from "@/components/custom/Container";
import WithdrawalForm from "@/components/modules/sellers/stores/withdrawals/WithdrawalForm";
import { Metadata } from "next";
import React from "react";

export default async function page({
  params,
}: {
  params: { storeId: string };
}) {
  const { storeId } = await params;
  const earnings = await getEarnings(storeId);
  return (
    <>
      <section className="py-10">
        <Container>
          <WithdrawalForm store={storeId} earnings={earnings} />
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
