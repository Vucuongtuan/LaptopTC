import { IApiKeyboard, IApiMouse, IApiProduct } from "@/types/data/index.types";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import slugify from "slugify";
const Card = ({ data }: { data: IApiProduct | IApiKeyboard | IApiMouse }) => {
  const now = Date.now();
  const oneMonthAgo = now - 2678400000;

  const renderNewTag = (time: string) => {
    const timestamp = Date.parse(time);
    return timestamp >= oneMonthAgo && timestamp <= now;
  };
  const newTotal = data?.total.toString();
  const discountTotal =
    (parseFloat(newTotal.replace(/\./g, "").replace(",", ".")) *
      data?.discount_percent) /
    100;
  const newDiscount = (data?.total - discountTotal).toString();

  const nameslug = slugify(data.name) as string;

  return (
    <>
      <Link
        href={`/details/${data._id}`}
        key={data._id}
        className="bg-white rounded-md shadow-md overflow-hidden relative"
      >
        <figure className="h-[250px] bg-white relative sm:h-[180px] sm:min-h-[150px] sm:max-h-[180px]">
          <Image
            height={500}
            width={500}
            src={data?.thumbnail[0]}
            alt={data?.description || data?.name}
            loading="lazy"
            className="h-full w-full object-contain  hover:scale-110 transition duration-700"
          />
        </figure>
        <div className="card-body h-[150px] px-4 py-4 sm:h-[120px] md:h-[150px] sm:px-1">
          <h2 className="card-title text-[0.88rem] sm:text-[0.7rem] ">
            {data.name}
          </h2>
          {renderNewTag(data.create_date) && (
            <div className="bg-[#A81010] text-white rounded-full p-[4px] text-sm absolute top-2 right-2">
              NEW
            </div>
          )}

          <p className="text-[#B30000] font-medium flex flex-col">
            <div className="text-[0.7rem] sm:text-[0.6rem]">
              <del className="text-[#595959] ">
                {newTotal.replace(/\B(?=(\d{3})+(?!\d))/g, ".")} VND
              </del>
              <span className="ml-4">{"-" + data?.discount_percent + "%"}</span>
            </div>
            <span className="sm:text-[0.7rem]">
              {newDiscount.replace(/\B(?=(\d{3})+(?!\d))/g, ".")} VND
            </span>{" "}
          </p>
          <div className="card-actions flex justify-end mt-2 sm:mt-1 sm:absolute sm:bottom-[7px] sm:right-2">
            <div className="badge badge-outline mr-3 sm:text-[0.6rem]">
              {data?.totalPurchases || 0} đã bán
            </div>
            <div className="badge badge-outline sm:text-[0.6rem]">
              Còn {data?.inventory}
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default Card;
