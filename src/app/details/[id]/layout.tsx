import { getAllBlog } from "@/api/admin/index.api";
import {
  getAllData,
  getAllDataByID,
  getBlogByIdProduct,
} from "@/api/product/index.api";
import Loading from "@/app/loading";
import BreadcrumdTheme from "@/components/breadcrumbTheme";
import MarkdownPreview from "@/components/MarkdownToHTML";
import { Container, IconButton } from "@mui/material";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Suspense } from "react";
import { array } from "zod";
import MakupHtml from "./makupHtml";
import EvaluationForm from "./evaluationForm";
import { log } from "console";

const inter = Inter({ subsets: ["latin"] });

export default async function DetailsLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  const [data, blog] = await Promise.all([
    getAllDataByID(params.id),
    getBlogByIdProduct(params.id),
  ]);

  return (
    <Suspense fallback={<Loading />}>
      <div className="bg-[#f2f2f2]">
        <Container>
          <BreadcrumdTheme nameb={data.data[0].name} />
          {children}
          <section className=" mt-2  flex flex-row  md:flex-col sm:flex-col ">
            <div className="w-[60%] h-full rounded-md bg-white mr-2 px-1 sm:w-full">
              {blog !== "" ? (
                <MakupHtml content={blog?.data?.body} />
              ) : (
                <h2 className="text-center text-xl">
                  Chưa có bài viết cho sản phẩm này
                </h2>
              )}
            </div>
            <div className="bg-white w-[40%] p-2 md:w-full sm:w-full"></div>{" "}
          </section>
          <hr />
          <div className="comment bg-white mt-2 rounded-md">
            <h2 className="text-xl font-semibold mb-2">Thông tin đánh giá</h2>
            <div className=" items-center  w-full ">
              <EvaluationForm id={params.id} />
            </div>
          </div>
        </Container>
      </div>
    </Suspense>
  );
}
