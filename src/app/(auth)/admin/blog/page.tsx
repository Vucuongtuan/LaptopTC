import Link from "next/link";
import React from "react";
import PaginationProduct from "../product/pagination";
import TableBlogAll from "./table";
import { getAllBlog } from "@/api/admin/index.api";

export default async function BlogPage() {
  const data = await getAllBlog("1");

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
                Bài viết
              </li>
            </ol>
            <h6 className="mb-0 font-bold capitalize">Blogs</h6>
          </nav>
        </div>
      </nav>
      <div className="py-4 flex">
        <h2 className="px-10 pb-2 grow text-xl font-semibold">
          Tất cả bài viết
        </h2>
        <div
          className="w-[200px]
        "
        >
          <Link
            href={"/admin/blog/insert"}
            className="float-left  bg-blue-500 text-black p-2 rounded-md hover:bg-blue-400 font-semibold"
          >
            Thêm mới
          </Link>
        </div>
      </div>
      <section className="w-full h-auto relative">
        <TableBlogAll data={data.data.data} />
        <PaginationProduct data={data.data.totalPage} />
      </section>
    </main>
  );
}
