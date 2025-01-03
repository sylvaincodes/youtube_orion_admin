import Container from "@/components/custom/Container";
import Products from "@/components/modules/sellers/stores/products";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import React from "react";

export default async function page({
  params,
}: {
  params: { storeId: string };
}) {
  const { storeId } = await params;
  return (
    <>
      <section className="py-10">
        <Container>
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap space-y-4 justify-between items-center">
              <Heading
                name="Your products"
                description="Here are your products."
              />
              <Link
                href={`/stores/${storeId}/products/new`}
                className="bg-black p-4 flex items-center gap-4 text-white rounded-md text-xl"
              >
                <Plus className="me-1" />
                Add new
              </Link>
            </div>
            <Separator />
          </div>
        </Container>
      </section>
      <section className="py-10">
        <Container>
          <Products storeId={storeId} />
        </Container>
      </section>
    </>
  );
}

export const metadata: Metadata = {
  title: "Products - Orion - Ecommerce",
  description:
    "A Ecommerce app. We are selling everything, shoes for mens womens and kids",
  icons: {
    icon: "/assets/images/logo_dark.svg",
  },
};
