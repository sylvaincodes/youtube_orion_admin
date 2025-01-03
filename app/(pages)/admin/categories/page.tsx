import Container from "@/components/custom/Container";
import Categories from "@/components/modules/admin/categories";
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
            <div className="flex flex-wrap justify-between items-center space-y-4">
              <Heading
                name="Categories"
                description="Group of subs categories into categories available."
              />
              <div className="flex flex-wrap items-center gap-1 ">
                <Link
                  href="/admin/subcategories/new"
                  className="bg-secondary-500 p-4 flex items-center gap-4 text-white rounded-md text-xl"
                >
                  <BookCopy className="me-1" />
                  Add Sub Category
                </Link>

                <Link
                  href="/admin/categories/new"
                  className="bg-black p-4 flex items-center gap-4 text-white rounded-md text-xl"
                >
                  <Plus className="me-1" />
                  Add new category
                </Link>
              </div>
            </div>
            <Separator />
          </div>
        </Container>
      </section>
      <section className="py-10">
        <Container>
          <Categories />
        </Container>
      </section>
    </>
  );
}

export const metadata: Metadata = {
  title: "Categories - Orion - Ecommerce",
  description:
    "A Ecommerce app. We are selling everything, shoes for mens womens and kids",
  icons: {
    icon: "/assets/images/logo_dark.svg",
  },
};
