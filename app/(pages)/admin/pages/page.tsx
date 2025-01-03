import Container from "@/components/custom/Container";
import Pages from "@/components/modules/admin/pages";
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
                name="Pages"
                description="All pages used on the online store."
              />
              <div className="flex items-center gap-1 ">
                <Link
                  href="/admin/pages/new"
                  className="bg-black p-4 flex items-center gap-4 text-white rounded-md text-xl"
                >
                  <Plus className="me-1" />
                  Add new page
                </Link>
              </div>
            </div>
            <Separator />
          </div>
        </Container>
      </section>
      <section>
        <Container>
          <Pages />
        </Container>
      </section>
    </>
  );
}

export const metadata: Metadata = {
  title: "Pages - Orion - Ecommerce",
  description:
    "A Ecommerce app. We are selling everything, shoes for mens womens and kids",
  icons: {
    icon: "/assets/images/logo_dark.svg",
  },
};
