"use client";
import { getDataToBrands } from "@/api/product/index.api";
import { IBrand } from "@/types/data/index.types";
import { useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface ICheckPrice {
  id: number;
  name: string;
  min?: number;
  max?: number;
}
const CheckPrice: ICheckPrice[] = [
  {
    id: 1,
    name: "Tất cả",
  },
  {
    id: 2,
    name: "Từ 0 -> 500K",
    min: 0,
    max: 500000,
  },
  {
    id: 3,
    name: "Từ 500K đến 2 triệu",
    min: 500000,
    max: 2000000,
  },
  {
    id: 4,
    name: "Từ 2 triệu đến 10 triệu",
    min: 2000000,
    max: 10000000,
  },
  {
    id: 5,
    name: "Từ 10 triệu đến 20 triệu",
    min: 10000000,
    max: 20000000,
  },
  { id: 6, name: "Trên 20 triệu", min: 20000000 },
];
export const SideBar = ({ brand, params }: any) => {
  const navigation = useRouter();
  const searchParams = useSearchParams();
  const [checkBrand, setCheckBrand] = React.useState<number>(0);
  const [price, setPrice] = React.useState<number>(0);
  const [nameState, setNameState] = React.useState<string>();
  useEffect(() => {
    const brandNameParam = searchParams.get("hang");
    const idBrandParam = searchParams.get("id_brand");

    if (brandNameParam && idBrandParam) {
      const index = brand?.findIndex(
        (brand: any) =>
          brand.name === brandNameParam && brand._id === idBrandParam
      );
      if (index !== -1) {
        setCheckBrand(index);
      }
    }
  }, [searchParams, brand, price]);

  const handleCheckboxChange = (
    brandId: number,
    brandName: string,
    index: number
  ) => {
    setCheckBrand(index);
    setNameState(brandName);
    navigation.push(
      brandName === brand[0].name
        ? `/product/${params}`
        : `/product/${params}?hang=${brandName}&id_brand=${brandId}`
    );
  };
  const handleCheckPriceChange = (
    name: string,
    min: number | undefined,
    max: number | undefined,
    index: number
  ) => {
    setPrice(index);
    navigation.push(
      name === brand[0].name
        ? `/product/${params}`
        : `/product/${params}?min=${min}${
            max !== undefined ? `&max=${max}` : ``
          }`
    );
  };
  const uiMobile = () => (
    <div className="h-full w-full py-6 px-2 hidden sm:block md:block">
      <h3>Lọc theo hãng</h3>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button className="h-6">{nameState ? `${nameState}` : "Open"}</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <div className="w-[400px] grid grid-cols-4">
            {brand?.map((brand: any, index: number) => (
              <DropdownMenuItem
                key={brand._id}
                onClick={(e) =>
                  handleCheckboxChange(brand._id, brand.name, index)
                }
              >
                <Image
                  src={brand.thumbnail}
                  alt={brand.description}
                  width={200}
                  height={200}
                />
              </DropdownMenuItem>
            ))}
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
  return (
    <div className="p-0   basis-[30%] max-w-[30%] bg-white mr-2 rounded-md shadow-xl block md:w-full sm:max-w-[100%]">
      {uiMobile()}
      <div className="align-baseline sm:hidden md:hidden">
        <div className="w-full h-auto p-2">
          <span className="mb-4">Hãng sản xuất </span>
          <div className="flex items-center flex-wrap flex-row w-full">
            {brand?.map((brand: any, index: number) => (
              <div
                className="flex-grow flex-shrink basis-[50%] "
                key={brand._id}
              >
                <input
                  type="checkbox"
                  checked={checkBrand === index}
                  name={brand.name}
                  value={brand.name}
                  onChange={() =>
                    handleCheckboxChange(brand._id, brand.name, index)
                  }
                />{" "}
                {brand.name}
              </div>
            ))}
          </div>
        </div>
        {/* <div className="w-full h-auto p-2">
          <span className="mb-4">Theo giá</span>
          <div className=" ">
            {CheckPrice?.map((item: ICheckPrice, index: number) => (
              <div className="flex-grow flex-shrink basis-[50%] " key={item.id}>
                <input
                  type="checkbox"
                  checked={price === index}
                  name={item.name}
                  value={item.name}
                  onChange={() =>
                    handleCheckPriceChange(item.name, item.min, item.max, index)
                  }
                />{" "}
                {item.name}
              </div>
            ))}
          </div>
        </div> */}
      </div>
    </div>
  );
};
