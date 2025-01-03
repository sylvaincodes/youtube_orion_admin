import { getEarnings, getSellers, getSubscriptions } from "@/actions/stores";
import Container from "@/components/custom/Container";
import Dashboard from "@/components/modules/admin/dashboard";
import React from "react";

// Nextjs ISR caching strategy
export const revalidate = 3600; //every 1 hour refetch data

export default async function page() {
  const sellers = await getSellers();
  const members = await getSubscriptions();
  const earnings = await getEarnings();
  return (
    <section className="py-10">
      <Container>
        <Dashboard earnings={earnings} sellers={sellers} members={members} />
      </Container>
    </section>
  );
}

// Nextjs dynamic metadata
export function generateMetadata() {
  return {
    title: `Admin - Dashboard`,
    description: `Admin - Details of your app`,
    icons: {
      icon: `path to asset file`,
    },
  };
}
