import Container from "@/components/custom/Container";
import Heading from "@/components/custom/Heading";
import Subcategories from "@/components/modules/admin/subcategories";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import Link from "next/link";
import React from "react";

// Nextjs ISR caching strategy
export const revalidate = false;

export default function page() {
  return (
    <>
      <section className="py-10">
        <Container>
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap space-y-4 justify-between items-center">
              <Heading
                name="Sub-Categories"
                description="Group of subs categories availbables"
              />
              <Link
                href="/admin/subcategories/new"
                className="bg-black p-4 flex items-center gap-4 text-white rounded-md text-xl"
              >
                <Plus />
                Add new
              </Link>
            </div>
            <Separator />
          </div>
        </Container>
      </section>
      <section className="py-10">
        <Container>
          <Subcategories />
        </Container>
      </section>
    </>
  );
}

// Nextjs dynamic metadata
export function generateMetadata() {
  return {
    title: `Sub categories`,
    description: `Page - Description here`,
    icons: {
      icon: `path to asset file`,
    },
  };
}
