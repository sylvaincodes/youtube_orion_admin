import Container from "@/components/custom/Container";
import CategoryForm from "@/components/modules/admin/categories/CategoryForm";
import { Metadata } from "next";
import React from "react";

// Nextjs ISR caching strategy
export const revalidate = false;
export const dynamic = "force-static";

export default async function page({ params }: { params: { _id: string } }) {
  const { _id } = await params;
  return (
    <>
      <section className="py-10">
        <Container>
          <CategoryForm _id={_id} />
        </Container>
      </section>
    </>
  );
}

export const metadata: Metadata = {
  title: "Category - Orion - Ecommerce",
  description:
    "A Ecommerce app. We are selling everything, shoes for mens womens and kids",
  icons: {
    icon: "/assets/images/logo_dark.svg",
  },
};
