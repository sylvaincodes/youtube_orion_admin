import React from "react";

// Nextjs ISR caching strategy
export const revalidate = false;

export default function page() {
  return <div>you have not the access for this page</div>;
}

// Nextjs dynamic metadata
export function generateMetadata() {
  return {
    title: `Page - Title here`,
    description: `Page - Description here`,
    icons: {
      icon: `path to asset file`,
    },
  };
}
