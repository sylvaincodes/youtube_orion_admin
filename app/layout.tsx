import "./globals.css";
import { font } from "./fonts";
import Provider from "@/providers";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={` ${font.className}`}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
