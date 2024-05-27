import { getProfileUser } from "@/api/user/index.api";
import React from "react";

export default async function Profile({
  searchParams,
}: {
  searchParams: { id: string };
}) {
  const { data } = await getProfileUser(searchParams.id);

  return (
    <section className="">
      <h2 className="text-2xl">Thông tin cá nhân</h2>
      <div className="w-full flex py-1">
        <label htmlFor="Tên">Tên : </label>
        <span className="px-3">{data.name}</span>
      </div>
      <div className="w-full flex py-1">
        <label htmlFor="Email">Email : </label>
        <span className="px-3">{data.email}</span>
      </div>
      <div className="w-full flex py-1">
        <label htmlFor="Phone">Phone : </label>
        <span className="px-3">{data.phone}</span>
      </div>
      <div className="w-full flex py-1">
        <label htmlFor="Đại chỉ">Đại chỉ : </label>
        <span className="px-3">{data.address}</span>
      </div>
      <div className="w-full flex py-1">
        <label htmlFor="Tổng sản phẩm đã mua">Tổng sản phẩm đã mua : </label>
        <span className="px-3">
          {data.cartID.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}{" "}
          VND
        </span>
      </div>
    </section>
  );
}
