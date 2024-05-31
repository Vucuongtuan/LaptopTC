import {
  getBlogById,
  getBlogByIdProduct,
  getBlogByName,
} from "@/api/product/index.api";
import MakupHtml from "@/app/details/[id]/component/makupHtml";
import NotFound from "@/app/not-found";
import BreadcrumdTheme from "@/components/breadcrumbTheme";
import { Container } from "@mui/material";
import Image from "next/image";
import React from "react";
interface IBlog {
  response: { status: number };
  data: { title: string };
}
export default async function BlogDetails({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { id: string };
}) {
  const blog: IBlog | any = await getBlogById(searchParams.id);

  // if (!blog || blog.response?.status !== 200) {
  //   return <NotFound />;
  // }

  return (
    <main className="h-auto min-h-[300px] w-full blog">
      <Container>
        <BreadcrumdTheme nameb={blog?.data?.title} />

        <h1 className="text-4xl font-semibold">{blog?.data?.description}</h1>
        <Image
          src={blog?.data?.thumbnail}
          alt={blog?.data?.title}
          width={800}
          height={500}
          className=" min-w-[500px] w-auto h-[500px] object-cover"
        />
        <div
          dangerouslySetInnerHTML={{
            __html: blog?.data?.body,
          }}
        ></div>
      </Container>
    </main>
  );
}
