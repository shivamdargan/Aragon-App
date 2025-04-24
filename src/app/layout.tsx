import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Aragon App",
  description: "Full Stack Assignment",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
      >
        {children}
      </body>
    </html>
  );
}
