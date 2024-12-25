"use client";

import { ClerkProvider } from "@clerk/nextjs";
import React from "react";
import { ThemeProvider } from "./theme-provider";
import ToasterProvider from "./toast-provider";

export default function Provider({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider
      signInUrl={`${process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL}`}
      signUpUrl={`${process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL}`}
      afterSignOutUrl="/"
      signInFallbackRedirectUrl="/stores"
      signUpFallbackRedirectUrl="/stores"
      appearance={{
        layout: {
          logoImageUrl: "/assets/images/bolcom.svg",
          socialButtonsPlacement: "bottom",
          socialButtonsVariant: "blockButton",
        },
      }}
    >
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <ToasterProvider />
        {children}
      </ThemeProvider>
    </ClerkProvider>
  );
}
