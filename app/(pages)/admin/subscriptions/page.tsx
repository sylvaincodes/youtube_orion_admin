import Container from "@/components/custom/Container";
import Subscriptions from "@/components/modules/admin/subscriptions";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Metadata } from "next";
import React from "react";

export default function page() {
  return (
    <>
      <section className="py-10">
        <Container>
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap space-y-4 justify-between items-center">
              <Heading
                name="Subscriptions"
                description="Group of all sellers subscriptions on the online store available."
              />
            </div>
            <Separator />
          </div>
        </Container>
      </section>
      <section className="py-10">
        <Container>
          <Subscriptions />
        </Container>
      </section>
    </>
  );
}

export const metadata: Metadata = {
  title: "Subscriptions - Orion - Ecommerce",
  description:
    "A Ecommerce app. We are selling everything, shoes for mens womens and kids",
  icons: {
    icon: "/assets/images/logo_dark.svg",
  },
};
