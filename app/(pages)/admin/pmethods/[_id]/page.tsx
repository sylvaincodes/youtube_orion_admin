import Container from "@/components/custom/Container";
import PmethodForm from "@/components/modules/admin/pmethods/PmethodForm";
import { Metadata } from "next";
import React from "react";

export default async function page({ params }: { params: { _id: string } }) {
  const { _id } = await params;
  return (
    <>
      <section className="py-10">
        <Container>
          <PmethodForm _id={_id} />
        </Container>
      </section>
    </>
  );
}

export const metadata: Metadata = {
  title: "Payment methods - Orion - Ecommerce",
  description:
    "A Ecommerce app. We are selling everything, shoes for mens womens and kids",
  icons: {
    icon: "/assets/images/logo_dark.svg",
  },
};
