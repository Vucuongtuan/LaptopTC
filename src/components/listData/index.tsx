import Link from "next/link";
import React from "react";
import Card from "../Card";
import { IApiKeyboard, IApiMouse, IApiProduct } from "@/types/data/index.types";
type ListProductProps = {
  data: IApiProduct[] | IApiMouse[] | IApiKeyboard[];
  name: string;
};
export default function ListData({ data, name }: ListProductProps) {
  return (
    <section className="mt-2 rounded-md shadow-md">
      <div className="py-4 px-1 ">
        <h2 className="h-full font-semibold  flex items-center">
          <Link
            href="#"
            className="text-yellow-300 text-[2rem] mr-2 sm:text-[1.2rem]"
          >
            {name}
          </Link>{" "}
          |
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-8 h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
            />
          </svg>
          <span>Giao hàng miễn phí</span>
        </h2>
      </div>
      <hr />
      <div className=" h-full w-full pb-2 px-1 grid grid-cols-4 grid-flow-row gap-2 md:grid-cols-3 sm:grid-cols-2">
        {data?.map((item) => (
          <Card data={item} key={item._id} />
        ))}
      </div>
    </section>
  );
}
