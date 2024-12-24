import { SignUp } from "@clerk/nextjs";
import React from "react";

export default function Page() {
  return (
    <div className="h-full grid grid-cols-1">
      <div className="flex justify-center items-center">
        <SignUp />
      </div>
    </div>
  );
}

// Nextjs dynamic metadata
export function generateMetadata() {
  return {
    title: `Orion - Register page`,
    description: `Register to your app`,
    icons: {
      icon: `path to asset file`,
    },
  };
}
