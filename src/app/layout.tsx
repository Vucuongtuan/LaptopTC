import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import StoreProvider from "./StoreProvider";
import { Toaster } from "@/components/ui/toaster";
import TanStackProviders from "@/components/tanstackProvider";
import { Analytics } from "@vercel/analytics/react";
import LayoutProvider from "./layoutProvider";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Laptop_TC | Chuyên cung cấp những sản phẩm laptop gaming , văn phòng",
  description:
    "Laptop_TC | Chuyên cung cấp những sản phẩm laptop gaming , văn phòng",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <TanStackProviders>
          <StoreProvider>
            <LayoutProvider>{children}</LayoutProvider>
          </StoreProvider>
        </TanStackProviders>
        <Toaster />
        <Analytics />
      </body>
    </html>
  );
}
