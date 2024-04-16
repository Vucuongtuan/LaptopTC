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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
                  className={`text-black text-md rounded-lg px-4   ${
                    pathname === "/admin/product" ? "bg-slate-200" : ""
                  }`}
                >
                  Sản phẩm
                </AccordionTrigger>
                <AccordionContent className="bg-slate-100 rounded-md">
                  <Link
                    className={`py-3 mb-2  shadow-soft-xl text-sm ease-nav-brand my-0  flex items-center whitespace-nowrap rounded-lg  font-semibold text-slate-700 transition-colors ${
                      pathname === "/admin/product/laptop" ||
                      pathname === "/admin/product/laptop/insert"
                        ? "bg-slate-200"
                        : ""
                    }`}
                    href="/admin/product/laptop"
                  >
                    <span className="ml-1 pl-3 duration-300 opacity-100 pointer-events-none ease-soft">
                      Laptop
                    </span>
                  </Link>
                  <Link
                    className={`py-3  mb-2  shadow-soft-xl text-sm ease-nav-brand my-0  flex items-center whitespace-nowrap rounded-lg  font-semibold text-slate-700 transition-colors ${
                      pathname === "/admin/product/chuot" ||
                      pathname === "/admin/product/chuot/insert"
                        ? "bg-slate-200"
                        : ""
                    }`}
                    href="/admin/product/chuot"
                  >
                    <span className="ml-1 pl-3 duration-300 opacity-100 pointer-events-none ease-soft">
                      Chuột
                    </span>
                  </Link>
                  <Link
                    className={`py-3 mb-2  shadow-soft-xl text-sm ease-nav-brand my-0  flex items-center whitespace-nowrap rounded-lg  font-semibold text-slate-700 transition-colors ${
                      pathname === "/admin/product/banner" ||
                      pathname === "/admin/product/banner/insert"
                        ? "bg-slate-200"
                        : ""
                    }`}
                    href="/admin/product/banner"
                  >
                    <span className="ml-1 pl-3 duration-300 opacity-100 pointer-events-none ease-soft">
                      Banner
                    </span>
                  </Link>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </li>
        </ul>
      </div>

      <div className="absolute bottom-1 flex h-[80px] border-t-2 w-full">
        <div className="w-1/3 h-full px-6 py-4">
          <div className="overflow-hidden p-4 rounded-full bg-red-400">
            Image
          </div>
        </div>
        <div className="w-1/3 h-full px-1 p-7">
          <span>name</span>
        </div>
        <div className="w-1/3  py-7 pr-4">
          <DropdownMenu>
            <DropdownMenuTrigger className="float-right">
              {" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-6 h-6 float-right cursor-pointer"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Billing</DropdownMenuItem>
              <DropdownMenuItem>Team</DropdownMenuItem>
              <DropdownMenuItem>Subscription</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </aside>
  );
}
