import { getAllData, getAllDataByID } from "@/api/product/index.api";
import { TButtonAddToCart } from "@/types/data/index.types";
import React from "react";
import CarouselProduct from "./carousel";
import { ButtonAddToCart } from "@/components/buttonAddCart";
import { Metadata, ResolvingMetadata } from "next";




type Props = {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}
export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const id = params.id
  const product = await getAllDataByID(id)
  const previousImages = (await parent).openGraph?.images || []
 const image = product?.data[0].thumbnail[0]
 
  return {
    title: product?.data[0].name,
    description: product?.data[0].description,
    openGraph: {
      title: product?.data[0].name,
      description: product?.data[0].description,
      images: [ { url: image, width: 800, height: 600 }, ...previousImages],
    },
  }
}
 
export default async function NameProduct({
  params,
}: {
  params: { id: string };
}) {
  const { data } = await getAllDataByID(params.id);

  const item = data[0];
  const totalDis = (item.total * item?.discount_percent) / 100;
  const dataAddCart: TButtonAddToCart = {
    _id: item._id,
    thumbnail: item.thumbnail[0],
    name: item.name,
    total: item.total - totalDis,
    description: item.description,
  };
  return (
    <div className="h-auto sm:h-auto  bg-white text-black  rounded-md">
      <section className="w-full h-[500px] flex  md:flex-col sm:flex-col md:h-[700px] sm:h-[550px] p-4">
        <div className="w-[50%] h-full md:w-full md:h-[500px] sm:w-full sm:h-[300px] shadow-md sm:shadow-none ">
          <CarouselProduct item={item} />
        </div>
        <div className="flex flex-col ml-4 px-4 w-[50%] md:w-full md:py-2  sm:w-full sm:py-2 sm:ml-0 sm:mt-2 md:ml-0 md:mt-2 sm:px-0 sm:shadow-none md:px-0 md:shadow-none shadow-md  rounded-md">
          <h1 className="text-2xl font-semibold sm:text-xl">{item?.name}</h1>
          <div className="flex items-center py-4">
            <div className="w-10 h-6 mr-2 rounded-md text-sm text-center border-2  border-yellow-400">
              {"-" + item.discount_percent + "%"}
            </div>
            <del className="  text-small">
              {item?.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
                " ₫"}
            </del>
            <span className=" ml-4 text-3xl sm:text-2xl font-semibold text-red-600 pt-0">
              {(item.total - totalDis)
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " ₫"}
            </span>
          </div>
          <div className="py-2 ">
            <ButtonAddToCart data={dataAddCart} />
          </div>
          <div className="  py-1 justify-between items-center  md:block md:flex-col  md:items-start md:px-2 sm:block">
            <div className="md:text-sm ">
              <span className="pr-6">Số lượng:{item?.discount_percent}</span>
              <span className="pr-2">
                Lượt mua : {item?.totalPurchases || 0}
              </span>
            </div>
          </div>
          <div className="py-1"></div>
        </div>
      </section>
      <hr />
    </div>
  );
}
