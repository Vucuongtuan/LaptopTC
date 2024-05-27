import { getBlogByName } from "@/api/product/index.api";
import MakupHtml from "@/app/details/[id]/makupHtml";
import NotFound from "@/app/not-found";
import BreadcrumdTheme from "@/components/breadcrumbTheme";
import { Container } from "@mui/material";
import React from "react";
interface Blog {
  response: { status: number };
  data: { title: string };
}
export default async function BlogDetails({
  params,
}: {
  params: { slug: string };
}) {
  const blog: Blog | any = await getBlogByName(params.slug);

  if (!blog || blog.response?.status !== 200) {
    return <NotFound />;
  }

  return (
    <main className="h-auto min-h-[300px] w-full">
      <Container>
        <BreadcrumdTheme nameb={blog?.data?.title} />
      </Container>
      <h1>{blog?.data?.description}</h1>
      <MakupHtml content={blog?.data?.body} />
    </main>
  );
}
