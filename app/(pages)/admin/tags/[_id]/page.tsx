import Container from "@/components/custom/Container";
import TagForm from "@/components/modules/admin/tags/TagForm";
import { Metadata } from "next";
import React from "react";

export default async function page({ params }: { params: { _id: string } }) {
  const { _id } = await params;
  return (
    <>
      <section className="py-10">
        <Container>
          <TagForm _id={_id} />
        </Container>
      </section>
    </>
  );
}

export const metadata: Metadata = {
  title: "Tag - Orion - Ecommerce",
  description:
    "A Ecommerce app. We are selling everything, shoes for mens womens and kids",
  icons: {
    icon: "/assets/images/logo_dark.svg",
  },
};
