import "./globals.css";
import { font } from "./fonts";
import Provider from "@/providers";
import * as React from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={` ${font.className}`} suppressHydrationWarning={true}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
