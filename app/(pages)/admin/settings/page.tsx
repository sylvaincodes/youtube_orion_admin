import Container from "@/components/custom/Container";
import Settings from "@/components/modules/admin/setting";
import { checkRole } from "@/lib/roles";
import React from "react";

// Nextjs ISR caching strategy
export const revalidate = false;

export default async function page() {
  const check = await checkRole("admin");
  return (
    <section className="py-10">
      <Container>
        <Settings check={check} />
      </Container>
    </section>
  );
}

// Nextjs dynamic metadata
export function generateMetadata() {
  return {
    title: `Page - Settings`,
    description: `Page - Description here`,
    icons: {
      icon: `path to asset file`,
    },
  };
}
