import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Laptop_TC | Chuyên cung cấp những sản phẩm laptop gaming , văn phòng",
  description:
    "Laptop_TC | Chuyên cung cấp những sản phẩm laptop gaming , văn phòng",
};

export default function AdminLoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
