import { getOnlineAdmin } from "@/api/admin/index.api";
import { getAllData, getRevenue } from "@/api/product/index.api";
import LineChart from "@/components/linechart";
import SidebarAdmin from "@/components/sideBarADmin";
import { IApiKeyboard, IApiMouse, IApiProduct } from "@/types/data/index.types";
import Image from "next/image";
import React from "react";

export default async function DashboardAdminPage() {
  const [data, adminOnline] = await Promise.all([
    getRevenue(),
    getOnlineAdmin(),
  ]);
  const currentTotal = parseFloat(data.data.total[data.data.total.length - 1]);
  const previousTotal = parseFloat(data.data.total[data.data.total.length - 2]);
  const changePercentage = Math.floor(
    ((currentTotal - previousTotal) / previousTotal) * 100
  );
  // const topThreeProducts = data?.slice(0, 4);
  // const Gia = topThreeProducts[0].total.toString();
  let arrowIcon;

  if (changePercentage > 0) {
    arrowIcon = (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-10 w-10 text-green-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 10l7-7m0 0l7 7m-7-7v18"
        />
      </svg>
    );
  } else if (changePercentage < 0) {
    arrowIcon = (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-22 w-22 text-red-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 14l-7 7m0 0l-7-7m7 7V3"
        />
      </svg>
    );
  } else {
    arrowIcon = null;
  }

  return (
    <main className="ease-soft-in-out px-2  xl:ml-68.5 relative  h-full max-h-screen rounded-xl transition-all duration-200 md:w-full sm:w-full">
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
                Home
              </li>
            </ol>
            <h1 className="mb-0 font-bold capitalize">Home</h1>
          </nav>
        </div>
      </nav>
      <section className="flex py-12 w-full h-[550px] mt-2 ">
        <div className=" w-2/3 h-full rounded-md shadow-md relative ">
          <LineChart data={data.data} />
        </div>
        <div className="flex-grow mx-6 rounded-md shadow-md">
          <h2 className="text-red-400 h-1/6 font-semibold text-2xl text-center py-8 ">
            Doanh thu tổng
          </h2>
          <div className=" h-5/6 overflow-hidden ">
            <div className="h-full flex flex-col justify-center items-center">
              <div className="flex text-[60px] mb-2">
                {changePercentage > 0 ? (
                  <span
                    className=" text-green-500
              "
                  >
                    {changePercentage + "%"}
                  </span>
                ) : (
                  <span
                    className=" text-red-500
              "
                  >
                    {changePercentage + "%"}
                  </span>
                )}

                {arrowIcon}
              </div>
              <span className="text-lg">
                Tổng doanh thu :{" "}
                {data.data.total[data.data.total.length - 1].replace(
                  /\B(?=(\d{3})+(?!\d))/g,
                  "."
                )}{" "}
                VND
              </span>
            </div>
          </div>
        </div>
      </section>
      <section className="min-h-[300px] w-full h-auto">
        <table className="w-full h-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Id
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>

              <th scope="col" className="px-6 py-3 text-center">
                author
              </th>
              <th scope="col" className="px-6 py-3">
                ID Product
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {adminOnline !== null ? (
              adminOnline?.data.map((item: any) => (
                <tr
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  key={item._id}
                >
                  <td className="px-6 py-4"> {item._id}</td>
                  <td className="px-6 py-4 text-center">{item.name}</td>
                  <td className="px-6 py-4 text-center">{item.position}</td>
                </tr>
              ))
            ) : (
              <span className="text-center">
                Không có người nào đang online
              </span>
            )}
          </tbody>
        </table>
      </section>
    </main>
  );
}
