import Container from "@/components/custom/Container";
import Orders from "@/components/modules/sellers/stores/orders/index";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Metadata } from "next";
import React from "react";

export default function page({
  params,
}: {
  params: { storeId: string };
}) {
  return (
    <>
      <section className="py-10">
        <Container>
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap space-y-4 justify-between items-center">
              <Heading name="All orders" description="Here are your orders." />
            </div>
            <Separator />
          </div>
        </Container>
      </section>
      <section className="py-10">
        <Container>
          <Orders storeId={params.storeId} />
        </Container>
      </section>
    </>
  );
}

export const metadata: Metadata = {
  title: "Orders - Orion - Ecommerce",
  description:
    "A Ecommerce app. We are selling everything, shoes for mens womens and kids",
  icons: {
    icon: "/assets/images/logo_dark.svg",
  },
};
