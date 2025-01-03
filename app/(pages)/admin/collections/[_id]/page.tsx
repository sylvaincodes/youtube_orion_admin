import Container from "@/components/custom/Container";
import CollectionForm from "@/components/modules/admin/collections/CollectionForm";
import { Metadata } from "next";
import React from "react";

export default function page({ params }: { params: { _id: string } }) {
  return (
    <>
      <section className="py-10">
        <Container>
          <CollectionForm _id={params._id} />
        </Container>
      </section>
    </>
  );
}

export const metadata: Metadata = {
  title: "Collection - Orion - Ecommerce",
  description:
    "A Ecommerce app. We are selling everything, shoes for mens womens and kids",
  icons: {
    icon: "/assets/images/logo_dark.svg",
  },
};
