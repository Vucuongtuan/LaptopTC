"use client";
import React from "react";
import { Minus, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useDispatch, useSelector } from "react-redux";
import {
  removeItemFromCart,
  setCheckCartLocal,
  setIsOpenModalCart,
} from "@/lib/features/checkCartLocal";
import Link from "next/link";
import Image from "next/image";
export default function Cart() {
  const dispatch = useDispatch();
  const [cartTotal, setCartTotal] = React.useState<number>(0);
  const dataCart = useSelector((state: any) => state.checkCartLocal.arrayCart);
  React.useEffect(() => {
    const total = dataCart.reduce((acc: number, currentItem: any) => {
      return acc + currentItem.total;
    }, 0);

    setCartTotal(total);
    dispatch(setCheckCartLocal(false));
  }, [dataCart, dispatch]);
  const isOpen = useSelector(
    (state: any) => state.checkCartLocal.isOpenModalCart
  );
  const products = useSelector((state: any) => state.checkCartLocal.arrayCart);

  const subTotal = products.reduce(
    (accumulator: any, product: any) => {
      if (product && typeof product.total === "number") {
        accumulator.acc += product.total;
      }
      return accumulator;
    },
    { acc: 0 }
  );

  const stringSubTotal = subTotal.acc.toString();
  const handleRemoveItemCart = (id: string) => {
    dispatch(removeItemFromCart(id));
  };
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button className="relative">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
            />
          </svg>
          {dataCart.length > 0 ? (
            <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-400">
              {dataCart.length}
            </div>
          ) : (
            ""
          )}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Giỏ hàng </DrawerTitle>
          <DrawerDescription>
            Số lượng sản phẩm : {dataCart?.length ?? 0}{" "}
          </DrawerDescription>
        </DrawerHeader>
        <div className="mt-8">
          <div className="flow-root">
            <ul role="list" className="-my-6 divide-y divide-gray-200">
              {products.map((product: any) => {
                const price = product.total.toString();

                return (
                  <li key={product._id} className="flex py-6">
                    <div className="h-24 w-24 relative flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <Image
                        height={200}
                        width={200}
                        src={product.thumbnail}
                        alt={product.description}
                        className="h-full w-full object-contain object-center"
                      />
                    </div>

                    <div className="ml-4 flex flex-1 flex-col">
                      <div>
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <h3>{product.name}</h3>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">
                          {product.color}
                        </p>
                      </div>
                      <div className="flex flex-1 items-end justify-between text-sm">
                        <p className="text-gray-500">
                          Giá {price.replace(/\B(?=(\d{3})+(?!\d))/g, ".")}đ
                        </p>

                        <div className="flex">
                          <button
                            type="button"
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                            onClick={() => handleRemoveItemCart(product._id)}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
          <div className="flex justify-between text-base font-medium text-gray-900">
            <p>Tổng giá Sản phẩm</p>
          </div>
          <p className="mt-0.5 text-xl text-gray-500">
            {stringSubTotal.replace(/\B(?=(\d{3})+(?!\d))/g, ".")} đ
          </p>
          <div className="mt-6">
            <Link
              href="/thanhtoan"
              className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
            >
              Đến trang thanh toán
            </Link>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
