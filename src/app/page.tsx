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
import { Metadata } from "next";
import { getBlogNew } from "@/api/admin/index.api";
import { INewBlog } from "@/types/data/index.types";
import Link from "next/link";
import slugify from "slugify";
export const metadata: Metadata = {
  title: "Laptop_TC | Chuyên cung cấp những sản phẩm laptop gaming , văn phòng",
  description:
    "Laptop_TC | Chuyên cung cấp những sản phẩm laptop gaming , văn phòng",
  openGraph: {
    title:
      "Laptop_TC | Chuyên cung cấp những sản phẩm laptop gaming , văn phòng",
    description:
      "Laptop_TC | Chuyên cung cấp những sản phẩm laptop gaming , văn phòng",
    images: [
      {
        url: "/logo.png",
      },
    ],
  },
};
export default async function Home() {
  const [dataLaptop, dataMouse, dataKeyboard, blog]: [any, any, any, any] =
    await Promise.all([
      getDataLaptop(8),
      getDataMouse(8),
      getDataKeyboard(8),
      getBlogNew(1, 4),
    ]);
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
        <Suspense fallback={<LoadingElement />}>
          <section className="h-auto w-full min-h-[200px]">
            <h2 className="py-6 text-center font-bold">Tin tức công nghệ</h2>
            <div className="w-full h-auto min-h-[200px] grid grid-cols-4 gap-8 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 sm:gap-2">
              {blog.data?.data.map((item: any) => {
                const slug = slugify(item.title as string, {
                  replacement: "-",
                  remove: undefined,
                  lower: true,
                  strict: false,
                  locale: "vi",
                  trim: true,
                });
                return (
                  <Link
                    href={`/blog/${slug}?id=${item._id}`}
                    className="w-full h-[250px]  rounded-lg flex flex-col p-2"
                    key={item._id}
                  >
                    <Image
                      src={item.thumbnail}
                      alt={item.description}
                      height={200}
                      width={200}
                      className="w-full h-2/3 rounded-lg object-cover"
                    />
                    <div className="w-full h-1/3">
                      <Link
                        href={`/blog/${slug}?id=${item._id}`}
                        className="font-medium"
                      >
                        {item.title}
                      </Link>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        </Suspense>
      </Container>
    </main>
  );
}
