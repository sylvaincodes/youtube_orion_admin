import Container from "@/components/custom/Container";
import Brands from "@/components/modules/admin/brands/index";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import React from "react";

export const dynamic = "force-dynamic";

export default function Page() {
  return (
    <>
      <section className="py-10">
        <Container>
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap space-y-4 justify-between items-center">
              <Heading
                name="Brands"
                description="All brands used for creating products."
              />
              <div className="flex items-center gap-1 ">
                <Link
                  href="/admin/brands/new"
                  className="bg-black p-4 flex items-center gap-4 text-white rounded-md text-xl"
                >
                  <Plus className="me-1" />
                  Add new brand
                </Link>
              </div>
            </div>
            <Separator />
          </div>
        </Container>
      </section>
      <section>
        <Container>
          <Brands />
        </Container>
      </section>
    </>
  );
}

export const metadata: Metadata = {
  title: "Brands - Orion - Ecommerce",
  description:
    "A Ecommerce app. We are selling everything, shoes for mens womens and kids",
  icons: {
    icon: "/assets/images/logo_dark.svg",
  },
};
