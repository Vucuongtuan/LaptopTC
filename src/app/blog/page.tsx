import { getAllBlog } from "@/api/admin/index.api";
import BreadcrumdTheme from "@/components/breadcrumbTheme";
import { Container } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import slugify from "slugify";

export default async function Blog({
  searchParams,
}: {
  searchParams: { page: string };
}) {
  console.log(searchParams.page);

  const checkPage = searchParams.page !== undefined ? searchParams.page : "1";
  const blog = await getAllBlog(checkPage);

  return (
    <main className="w-full h-auto min-h-[500px] ">
      <Container>
        <BreadcrumdTheme nameb={"Tin Tức"} />
        <section className="w-full h-full grid grid-cols-2 gap-4 ">
          {blog?.data?.data.map((item: any) => {
            const date = new Date(item.date_create);
            const day = date.getDate();
            const month = date.getMonth() + 1;
            const year = date.getFullYear();
            const slug = slugify(item.title as string, {
              replacement: "-",
              remove: undefined,
              lower: false,
              strict: false,
              locale: "vi",
              trim: true,
            });
            return (
              <Link
                href={`/blog/${slug}`}
                className="w-full h-[180px]  flex shadow-2xl rounded-md  "
                key={item._id}
              >
                <Image
                  src={item.thumbnail}
                  alt={item.description}
                  width={200}
                  height={160}
                  className="w-2/5 h-full object-cover"
                />
                <div className="h-full w-3/5 px-2 py-1 relative">
                  <span>{item.description}</span>
                  <div className="absolute flex justify-between bottom-0 left-0 px-2 py-1 text-sm w-full">
                    <span>Author : {item.author}</span>
                    <span>
                      {day}/{month}/{year}{" "}
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </section>
      </Container>
    </main>
  );
}
