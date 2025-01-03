"use client";
import * as React from "react";
import { ThemeProvider } from "./theme-provider";
import ToasterProvider from "./toast-provider";
import dynamic from "next/dynamic";

const Clerk = dynamic(() => import("./clerk-provider"), { ssr: false });

export default function Provider({ children }: { children: React.ReactNode }) {
  return (
    <Clerk>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <ToasterProvider />
        {children}
      </ThemeProvider>
    </Clerk>
  );
}
