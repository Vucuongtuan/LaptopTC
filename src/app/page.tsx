import {
  getDataKeyboard,
  getDataLaptop,
  getDataMouse,
} from "@/api/product/index.api";
import HeroBanner from "@/components/heroBanner";
import ListData from "@/components/listData";
import LoadingElement from "@/components/loading";
import ProductTrend from "@/components/productTrend";
import { Container } from "@mui/material";
import Image from "next/image";
import { Suspense } from "react";
export default async function Home() {
  const [dataLaptop, dataMouse, dataKeyboard]: [any, any, any] =
    await Promise.all([getDataLaptop(8), getDataMouse(8), getDataKeyboard(8)]);
  const newLaptop = dataLaptop.data.reverse();
  const newMouse = dataMouse.data.reverse();
  const newKeyboard = dataKeyboard.data.reverse();
  return (
    <main className="mt-2">
      <Container>
        <HeroBanner />
        <ProductTrend />

        <Suspense fallback={<LoadingElement />}>
          <ListData data={newLaptop} name="Laptop mới nhất" />
        </Suspense>
        <Suspense fallback={<LoadingElement />}>
          <ListData data={newMouse} name="Chuột mới nhất" />
        </Suspense>
        <Suspense fallback={<LoadingElement />}>
          <ListData data={newKeyboard} name=" Bàn phím mới nhất" />
        </Suspense>
      </Container>
    </main>
  );
}
