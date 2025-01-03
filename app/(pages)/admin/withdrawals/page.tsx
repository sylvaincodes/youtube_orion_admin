import Container from "@/components/custom/Container";
import Withdrawals from "@/components/modules/admin/withdrawals";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Metadata } from "next";
import React from "react";

export default function Page() {
  return (
    <>
      <section className="py-10">
        <Container>
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap space-y-4 justify-between items-center">
              <Heading
                name="Withdrawals"
                description="All requests created from sellers."
              />
            </div>
            <Separator />
          </div>
        </Container>
      </section>
      <section>
        <Container>
          <Withdrawals />
        </Container>
      </section>
    </>
  );
}

export const metadata: Metadata = {
  title: "Withdrawals - Orion - Ecommerce",
  description:
    "A Ecommerce app. We are selling everything, shoes for mens womens and kids",
  icons: {
    icon: "/assets/images/logo_dark.svg",
  },
};
