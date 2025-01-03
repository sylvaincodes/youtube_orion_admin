import Container from "@/components/custom/Container";
import Slides from "@/components/modules/admin/slides";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { BookCopy, Plus } from "lucide-react";
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
                name="Slides"
                description="Group of all slides on the online store available."
              />
              <div className="flex items-center gap-1 ">
                <Link
                  href="/admin/slideitems"
                  className="bg-secondary-500 p-4 flex items-center gap-4 text-white rounded-md text-xl"
                >
                  <BookCopy className="me-1" />
                  Sellers campaigns
                </Link>

                <Link
                  href="/admin/slides/new"
                  className="bg-black p-4 flex items-center gap-4 text-white rounded-md text-xl"
                >
                  <Plus className="me-1" />
                  Add new slide
                </Link>
              </div>
            </div>
            <Separator />
          </div>
        </Container>
      </section>
      <section className="py-10">
        <Container>
          <Slides />
        </Container>
      </section>
    </>
  );
}

export const metadata: Metadata = {
  title: "Slides - Orion - Ecommerce",
  description:
    "A Ecommerce app. We are selling everything, shoes for mens womens and kids",
  icons: {
    icon: "/assets/images/logo_dark.svg",
  },
};
