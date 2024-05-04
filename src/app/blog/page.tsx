import { getAllBlogNoProduct } from "@/api/product/index.api";
import { Container } from "@mui/material";
import React from "react";
import PaginationBlog from "./pagination";
import BlogCard from "./blogCard";

export default async function BlogPage({
  searchParams,
}: {
  searchParams: { page: string };
}) {
  const res = await getAllBlogNoProduct(searchParams.page);

  return (
    <Container className="">
      <main className="w-full h-auto  min-h-[500px] ">
        <h1 className="py-4">Tin tức công nghệ mới nhất</h1>
        <div className="w-full h-full relative bg-red-300">
          <section className="w-full h-5/6 grid grid-cols-3 grid-rows-4 gap-4">
            {res?.data?.data.map((item: any) => (
              <BlogCard data={item} key={item._id} />
            ))}
          </section>
          <section className=" h-1/6  bottom-0 m-auto ">
            <PaginationBlog
              totalPage={res.data.totalPage}
              query={
                searchParams.page !== undefined
                  ? parseInt(searchParams.page)
                  : 1
              }
            />
          </section>
        </div>
      </main>
    </Container>
  );
}
