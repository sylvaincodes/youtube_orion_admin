import Container from "@/components/custom/Container";
import StoreModal from "@/components/modules/sellers/header/StoreModal";
import { checkRole } from "@/lib/roles";
import { TypeStoreModel } from "@/types/models";
import { Metadata } from "next";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";

export const dynamic = "force-dynamic";

export default async function page() {
  if ((await checkRole("admin")) === true) {
    redirect("/admin/dashboard");
  }
  return (
    <section>
      <Container>
        <div className="flex  flex-col justify-center gap-12 py-40 px-10 items-center">
          <Image
            src="/assets/images/mobile_black.svg"
            width={200}
            height={200}
            alt="logo"
          />
          <h6 className="text-xl text-center lg:text-3xl font-light tracking-wider">
            Welcome on
            <strong className="!text-primary-900 font-bold text-3xl mx-2">
              Orion
            </strong>
            Multi Vendor online shop
          </h6>
          <h6 className="text-xl tracking-wider text-center">
            Create or select a store below
          </h6>

          <StoreModal className="border border-border w-[320px] lg:w-[620px]" />
        </div>
      </Container>
    </section>
  );
}

export const dynamicParams = true; // automatically add any further dynamic segment in generateStaticParams

export async function generateStaticParams() {
  const stores = await fetch(
    process.env.NEXT_PUBLIC_API_URL + "/api/admin/stores"
  ).then((res) => res.json());

  return stores.map((store: TypeStoreModel) => ({
    storeId: store._id,
  }));
}

export const metadata: Metadata = {
  title: "Orion - Ecommerce",
  description:
    "A Ecommerce app. We are selling everything, shoes for mens womens and kids",
  icons: {
    icon: "/assets/images/logo_dark.svg",
  },
};
