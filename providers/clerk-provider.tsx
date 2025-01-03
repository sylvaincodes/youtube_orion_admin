"use client";

import React from "react";
import { ClerkProvider as Clerk } from "@clerk/nextjs";

export default function ClerkProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Clerk
      signInUrl={`${process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL}`}
      signUpUrl={`${process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL}`}
      afterSignOutUrl="/"
      signInFallbackRedirectUrl="/stores"
      signUpFallbackRedirectUrl="/stores"
      appearance={{
        layout: {
          logoImageUrl: "/assets/images/mobile_black.svg",
          socialButtonsPlacement: "bottom",
          socialButtonsVariant: "blockButton",
        },
      }}
    >
      {children}
    </Clerk>
  );
}
