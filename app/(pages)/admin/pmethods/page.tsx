import Container from "@/components/custom/Container";
import Pmethods from "@/components/modules/admin/pmethods";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import React from "react";

export default function page() {
  return (
    <>
      <section className="py-10">
        <Container>
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap space-y-4 justify-between items-center">
              <Heading
                name="Payments methods"
                description="All payment methods used for creating products."
              />
              <div className="flex items-center gap-1 ">
                <Link
                  href="/admin/pmethods/new"
                  className="bg-black p-4 flex items-center gap-4 text-white rounded-md text-xl"
                >
                  <Plus className="me-1" />
                  Add new pmethod
                </Link>
              </div>
            </div>
            <Separator />
          </div>
        </Container>
      </section>
      <section>
        <Container>
          <Pmethods />
        </Container>
      </section>
    </>
  );
}

export const metadata: Metadata = {
  title: "Pmethods - Orion - Ecommerce",
  description:
    "A Ecommerce app. We are selling everything, shoes for mens womens and kids",
  icons: {
    icon: "/assets/images/logo_dark.svg",
  },
};
