import Container from "@/components/custom/Container";
import CategoryForm from "@/components/modules/admin/categories/CategoryForm";
import { Metadata } from "next";
import React from "react";

export default function page({ params }: { params: { _id: string } }) {
  return (
    <>
      <section className="py-10">
        <Container>
          <CategoryForm _id={params._id} />
        </Container>
      </section>
    </>
  );
}

// automatically add any further dynamic segment in generateStaticParams for example if a new product has been approved by admin it will added statically cached
export const dynamicParams = true;

// Return a list of `params` to populate the [slug] dynamic segment
export async function generateStaticParams() {
  return [];
}

export const metadata: Metadata = {
  title: "Category - Orion - Ecommerce",
  description:
    "A Ecommerce app. We are selling everything, shoes for mens womens and kids",
  icons: {
    icon: "/assets/images/logo_dark.svg",
  },
};
