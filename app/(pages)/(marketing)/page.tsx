import Hero from "@/components/modules/marketing/hero";
import React from "react";

// Nextjs ISR caching strategy
export const revalidate = false;

export default function page() {
  return <Hero />;
}

// Nextjs dynamic metadata
export function generateMetadata() {
  return {
    title: `Marketing page`,
    description: `The marketing page`,
    icons: {
      icon: `/assets/images/mobile_black.svg`,
    },
  };
}
