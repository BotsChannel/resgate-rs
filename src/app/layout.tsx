import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Resgate RS",
  description: "Resgate RS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}
