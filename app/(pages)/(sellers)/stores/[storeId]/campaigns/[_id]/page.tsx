import Container from "@/components/custom/Container";
import CampaignForm from "@/components/modules/sellers/stores/campaigns/CampaignForm";
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
          <CampaignForm _id={params._id} storeId={params.storeId} />
        </Container>
      </section>
    </>
  );
}

export const metadata: Metadata = {
  title: "Campaign - Orion - Ecommerce",
  description:
    "A Ecommerce app. We are selling everything, shoes for mens womens and kids",
  icons: {
    icon: "/assets/images/logo_dark.svg",
  },
};
