import Link from "next/link";
import React from "react";
import CreateBlog from "./formAddBlog";

export default async function CreateBlogPage() {
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
            <h6 className="mb-0 font-bold capitalize">Thêm bài viết</h6>
          </nav>
        </div>
      </nav>
      <div className="py-4 flex">
        <h2 className="px-10 pb-2 grow text-xl font-semibold">
          Thêm mới bài viết
        </h2>
      </div>
      <section>
        <CreateBlog />
      </section>
    </main>
  );
}
