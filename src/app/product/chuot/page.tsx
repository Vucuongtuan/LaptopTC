import ContentListProduct from "@/components/listProduct";
import { Metadata } from "next";
import React from "react";
export const metadata: Metadata = {
  title: "Laptop_TC | Chuột gaming,văn phòng , chính hãng chất lượng cao",
  description: "Chuyên cung cấp các dòng chuột gaming,văn phòng chất lượng cao",
};
export default async function MousePage() {
  return (
    <>
      <ContentListProduct name={"chuot"} />
    </>
  );
}
