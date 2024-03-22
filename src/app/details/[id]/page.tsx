import { getAllData } from "@/api/product/index.api";
import { TButtonAddToCart } from "@/types/data/index.types";
import React from "react";
import CarouselProduct from "./carousel";
import { ButtonAddToCart } from "@/components/buttonAddCart";

export default async function NameProduct({
  params,
}: {
  params: { id: string };
}) {
  const { data } = await getAllData(params.id);

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
    <div className="h-auto sm:h-auto  text-black  rounded-md">
      <section className="w-full h-[500px] flex md:flex-col sm:flex-col md:h-[700px] sm:h-[650px]">
        <div className="w-[50%]   md:w-full md:h-[400px] sm:w-full sm:h-[500px]">
          <CarouselProduct item={item} />
        </div>
        <div className="flex flex-col ml-4 px-4 sm:ml-0 sm:mt-2 md:ml-0 md:mt-2 bg-white rounded-md">
          <h1 className="text-2xl font-semibold">{item?.name}</h1>
          <del className="  text-small pt-2">
            {item?.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
              " ₫"}
          </del>
          <span className="  text-3xl font-semibold text-red-600 pt-0">
            {(item.total - totalDis)
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " ₫"}
          </span>
          <div className="py-2 ">
            <ButtonAddToCart data={dataAddCart} />
          </div>
          <div className="  py-1 justify-between items-center  md:block md:flex-col  md:items-start md:px-2 sm:block">
            <div className="md:text-sm ">
              <span className="pr-6">Số lượng:{item?.discount_percent}</span>
              <span className="pr-2">Lượt mua : {item?.totalPurchases}</span>
            </div>
          </div>
          <div className="py-1"></div>
        </div>
      </section>
      <hr />
    </div>
  );
}
