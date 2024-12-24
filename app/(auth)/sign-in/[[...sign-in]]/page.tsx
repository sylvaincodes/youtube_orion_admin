import { SignIn } from "@clerk/nextjs";
import React from "react";

export default function Page() {
  return (
    <div className="h-full grid grid-cols-1">
      <div className="flex justify-center items-center">
        <SignIn />
      </div>
    </div>
  );
}

// Nextjs dynamic metadata
export function generateMetadata() {
  return {
    title: `Orion - Login page`,
    description: `Login to your app`,
    icons: {
      icon: `path to asset file`,
    },
  };
}
