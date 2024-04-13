"use client";
import Link from "next/link";
import React, { useState } from "react";
import SidebarLinkGroup from "./SidebarLinkGroup";
import { usePathname } from "next/navigation";
import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

export default function SidebarAdmin({
  sidebarOpen,
  setSidebarOpen,
}: SidebarProps) {
  const pathname = usePathname();
  let storedSidebarExpanded = "true";
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true"
  );

  return (
    <aside className="max-w-62.5 w-[20%]   z-50 fixed left-0 h-[98vh] my-[1vh]  ml-2 block  flex-wrap items-center justify-between overflow-y-auto rounded-2xl border-0  p-0  shadow-md transition-transform duration-200  md:hidden sm:hidden">
      <div className="h-[100px] ">
        {/* <Image
          src="/logo.jpg"
          alt="Laptop_TC"
          width={600}
          height={600}
          className="w-full h-full object-cover"
        /> */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          className="w-6 h-6 absolute top-1 right-1 hidden md:block sm:block"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M6 18 18 6M6 6l12 12"
          />
        </svg>
      </div>
      <hr className="h-px mt-0 bg-transparent bg-gradient-to-r from-transparent via-black/40 to-transparent" />
      <div className="items-center block w-auto max-h-screen overflow-auto h-sidenav grow basis-full py-2">
        <ul className="flex flex-col pl-0 mb-0">
          <li className={`mt-0.5 w-full `}>
            <Link
              className={`py-4 shadow-soft-xl text-sm ease-nav-brand my-0 mx-4 flex items-center whitespace-nowrap rounded-lg  px-4 font-semibold text-slate-700 transition-colors ${
                pathname === "/admin" ? "bg-slate-200" : ""
              }`}
              href="/admin"
            >
              <span className=" duration-300 opacity-100 pointer-events-none ease-soft font-medium text-black text-md">
                Trang chủ
              </span>
            </Link>
          </li>
          <li className="mt-3 w-full">
            <Accordion type="single" collapsible className="  px-4">
              <AccordionItem value="item-1">
                <AccordionTrigger
                  className={`text-black text-md rounded-lg px-4  ${
                    pathname === "/admin/product" ? "bg-slate-200" : ""
                  }`}
                >
                  Sản phẩm
                </AccordionTrigger>
                <AccordionContent>
                  <Link
                    className={`py-3 mb-2  shadow-soft-xl text-sm ease-nav-brand my-0  flex items-center whitespace-nowrap rounded-lg  font-semibold text-slate-700 transition-colors ${
                      pathname === "/admin/product/laptop" ||
                      pathname === "/admin/product/laptop/insert"
                        ? "bg-slate-200"
                        : ""
                    }`}
                    href="/admin/product/laptop"
                  >
                    <div className="bg-gradient-to-tl from-purple-700 to-pink-500 shadow-soft-2xl mr-2 flex h-8 w-8 items-center justify-center rounded-lg  bg-center stroke-0 text-center xl:p-2.5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        className="w-16 h-16"
                      >
                        <title>Trang chủ</title>
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                        />
                      </svg>
                    </div>
                    <span className="ml-1 duration-300 opacity-100 pointer-events-none ease-soft">
                      Laptop
                    </span>
                  </Link>
                  <Link
                    className={`py-3  shadow-soft-xl text-sm ease-nav-brand my-0  flex items-center whitespace-nowrap rounded-lg  font-semibold text-slate-700 transition-colors ${
                      pathname === "/admin/product/banner" ||
                      pathname === "/admin/product/banner/insert"
                        ? "bg-slate-200"
                        : ""
                    }`}
                    href="/admin/product/banner"
                  >
                    <div className="bg-gradient-to-tl from-purple-700 to-pink-500 shadow-soft-2xl mr-2 flex h-8 w-8 items-center justify-center rounded-lg  bg-center stroke-0 text-center xl:p-2.5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        className="w-16 h-16"
                      >
                        <title>Trang chủ</title>
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                        />
                      </svg>
                    </div>
                    <span className="ml-1 duration-300 opacity-100 pointer-events-none ease-soft">
                      Banner
                    </span>
                  </Link>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </li>
        </ul>
      </div>
    </aside>
  );
}
