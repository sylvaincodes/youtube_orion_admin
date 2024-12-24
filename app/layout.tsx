import "./globals.css";
import { font } from "./fonts";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={` ${font.className}`}>{children}</body>
    </html>
  );
}
