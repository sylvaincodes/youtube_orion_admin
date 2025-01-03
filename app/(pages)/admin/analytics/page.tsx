import Container from "@/components/custom/Container";
import Analytics from "@/components/modules/admin/analytics";
import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Calendar } from "lucide-react";
import { Metadata } from "next";
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
                name="Analytics"
                description="Analytics data."
              />
              <div className="flex items-center gap-1 ">
                <Button
                  className="bg-black p-4 flex items-center gap-4 text-white rounded-md text-xl"
                >
                  <Calendar className="me-1" />
                  Select Period
                </Button>
              </div>
            </div>
            <Separator />
          </div>
        </Container>
      </section>
      <section>
        <Container>
          <Analytics />
        </Container>
      </section>
    </>
  );
}

export const metadata: Metadata = {
  title: "Analytics - Orion - Ecommerce",
  description:
    "A Ecommerce app. We are selling everything, shoes for mens womens and kids",
  icons: {
    icon: "/assets/images/logo_dark.svg",
  },
};
