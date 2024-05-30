import { getHoaDonAll } from "@/api/user/index.api";
import Link from "next/link";
import React, { Suspense } from "react";
import PaginationHoaDon from "./pagination";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Update from "./update";

export default async function HoaDonPage({
  searchParams,
}: {
  searchParams: { page: string };
}) {
  const data = await getHoaDonAll(searchParams.page);
  console.log("====================================");
  console.log(data);
  console.log("====================================");
  return (
    <main className="">
      <nav
        className="relative flex flex-wrap items-center justify-between px-0 py-2 mx-6 transition-all shadow-none duration-250 ease-soft-in rounded-2xl lg:flex-nowrap lg:justify-start"
        navbar-main
        navbar-scroll="true"
      >
        <div className="flex items-center justify-between w-full px-4 py-1 mx-auto flex-wrap-inherit">
          <nav>
            <ol className="flex flex-wrap pt-1 mr-12 bg-transparent rounded-lg sm:mr-16">
              <li className="text-sm leading-normal">
                <a className="opacity-50 text-slate-700" href="javascript:;">
                  Pages
                </a>
              </li>
              <li
                className="text-sm pl-2 capitalize leading-normal text-slate-700 before:float-left before:pr-2 before:text-gray-600 before:content-['/']"
                aria-current="page"
              >
                Hóa đơn
              </li>
            </ol>
            <h6 className="mb-0 font-bold capitalize">Hóa đơn</h6>
          </nav>
        </div>
      </nav>
      <div className="py-4 flex">
        <h2 className="px-10 pb-2 text-xl font-semibold grow">
          Tất cả hóa đơn
        </h2>
        <div
          className="w-[200px]
        "
        >
          {/* <Link
            href={"/admin/product/laptop/insert"}
            className="float-left  bg-blue-500 text-black p-2 rounded-md hover:bg-blue-400 font-semibold"
          >
            Thêm mới
          </Link> */}
        </div>
      </div>
      <table className="w-full h-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 overflow-x-scroll">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-2 py-3 text-center">
              id
            </th>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-2 py-3 text-center">
              Thông tin liên hệ
            </th>
            <th scope="col" className="px-6 py-3 text-center">
              Địa chỉ
            </th>
            <th scope="col" className="px-6 py-3 text-center">
              Trạng thái
            </th>
            <th scope="col" className="px-6 py-3 text-center">
              Tổng giá
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data?.data
              .filter((item: any) => item.items.length > 0)
              .map((item: any, index: number) => (
                <tr key={item._id}>
                  <td
                    className={`text-center hover:after:contents-['...'] hover:after:top-0`}
                  >
                    {index + 1}
                  </td>
                  <td>{item.name}</td>
                  <td>
                    <p>Email: {item.email}</p>
                    <p>SDT: {item.phone}</p>
                  </td>
                  <td>{item.address}</td>
                  <td>{item.status || "Chưa giao"}</td>
                  <td>
                    <HoverCard>
                      <HoverCardTrigger>
                        {item.total
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}{" "}
                        VND
                      </HoverCardTrigger>
                      <HoverCardContent className="w-[420px]">
                        <div className="flex gap-2 flex-wrap w-full h-auto">
                          {item.items.map((item: any) => (
                            <div className="h-[100px] w-full " key={item._id}>
                              {item.products.map((product: any) => (
                                <div className="flex" key={product.name}>
                                  <Image
                                    src={product.thumbnail}
                                    alt={product.name}
                                    height={100}
                                    width={100}
                                    className="h-[100px] w-1/3"
                                  />
                                  <div className=" relative">
                                    <span>{product.name}</span>
                                    <span>
                                      {product.total}{" "}
                                      {`(SL : ${product.quantity})`}
                                    </span>
                                    <p className=" absolute bottom-0 right-1">
                                      {" "}
                                      {product &&
                                        product.total &&
                                        product.total
                                          .toString()
                                          .replace(
                                            /\B(?=(\d{3})+(?!\d))/g,
                                            "."
                                          )}{" "}
                                      VND
                                    </p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          ))}
                        </div>
                      </HoverCardContent>
                    </HoverCard>
                  </td>
                  <td className=" space-x-3">
                    <Update id={item._id} status={item.status || "Chưa giao"} />
                    {/* <Button variant={"destructive"}>Xóa</Button> */}
                  </td>
                </tr>
              ))}
        </tbody>
      </table>
      <Suspense fallback={null}>
        <PaginationHoaDon totalPages={data.totalPages} />
      </Suspense>
    </main>
  );
}
