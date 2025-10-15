import { getDataLaptop } from "@/api/product/index.api";
import ContentListProduct from "@/components/listProduct";
import { Metadata } from "next";
import React from "react";
export const metadata: Metadata = {
  title: "Laptop_TC | Laptop gaming,văn phòng , chính hãng chất lượng cao",
  description:
    "Chuyên cung cấp các dòng laptop gaming,văn phòng chất lượng cao",
};
export default async function LaptopPage() {
  return (
    <>
      <ContentListProduct name={"laptop"} />
    </>
  );
}
