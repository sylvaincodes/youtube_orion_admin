import Container from "@/components/custom/Container";
import Slideitems from "@/components/modules/admin/slideitems";
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
                name="Sellers campaigns"
                description="Group of campaigns available."
              />
            </div>
            <Separator />
          </div>
        </Container>
      </section>
      <section className="py-10">
        <Container>
          <Slideitems />
        </Container>
      </section>
    </>
  );
}

export const metadata: Metadata = {
  title: "Sellers campaigns - Orion - Ecommerce",
  description:
    "A Ecommerce app. We are selling everything, shoes for mens womens and kids",
  icons: {
    icon: "/assets/images/logo_dark.svg",
  },
};
