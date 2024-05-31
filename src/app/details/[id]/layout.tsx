import { getAllBlog, getBlogNew } from "@/api/admin/index.api";
import {
  getAllData,
  getAllDataByID,
  getBlogByIdProduct,
  getDataToBrands,
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
import MakupHtml from "./component/makupHtml";
import EvaluationForm from "./component/evaluationForm";
import { log } from "console";
import { INewBlog } from "@/types/data/index.types";
import Image from "next/image";

const inter = Inter({ subsets: ["latin"] });

export default async function DetailsLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  const [data, blog, newBlog] = await Promise.all([
    getAllDataByID(params.id),
    getBlogByIdProduct(params.id),
    getBlogNew(undefined, 5),
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
            <div className="bg-white w-[40%] p-2 md:w-full sm:w-full">
              <h2 className="text-xl font-semibold mb-2">Tin tức mới</h2>
              {newBlog?.data.data.map((item: INewBlog) => {
                const date = new Date(item.date_create);
                return (
                  <div className="w-full h-[100px] flex" key={item._id}>
                    <Image
                      src={item.thumbnail}
                      alt={item.title}
                      width={100}
                      height={100}
                      className="w-1/3 h-full rounded-lg p-1"
                    />
                    <div className="flex-grow h-full pl-2 relative">
                      <h3 className="text-[0.8rem] font-semibold">
                        {item.title}
                      </h3>
                      <div className=" absolute bottom-0 left-0 w-full px-2">
                        <span className="text-[0.8rem]">
                          {" "}
                          {`${date.getDate()}/${
                            date.getMonth() + 1
                          }/${date.getFullYear()}`}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
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
