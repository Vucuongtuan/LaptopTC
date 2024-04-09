"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import { useDebounce } from "use-debounce";
import { getAllData } from "@/api/product/index.api";
import Image from "next/image";
export default function SearchBox() {
  const [changeInput, setChangeInput] = React.useState<string>("");
  const [listSearch, setListSearch] = React.useState<any[]>([]);
  const [actionDropdown, setActionDropdown] = React.useState<boolean>(false);
  const [debounce] = useDebounce(changeInput, 700);
  React.useEffect(() => {
    const getDataSearch = async () => {
      if (changeInput.trim() !== "") {
        const res = await getAllData();
        const locData = res?.data?.filter((product: any) =>
          product.name.toLowerCase().includes(changeInput.toLowerCase())
        );
        console.log("====================================");
        console.log(locData);
        console.log("====================================");
        setListSearch(locData);
      } else {
        setListSearch([]);
      }
    };
    getDataSearch();
  }, [debounce, changeInput]);

  return (
    <div className="relative">
      <Input
        className="w-full "
        value={changeInput}
        onFocus={() => setActionDropdown(true)}
        onBlur={() => setActionDropdown(false)}
        onChange={(e) => setChangeInput(e.target.value)}
      />
      {actionDropdown && (
        <div className=" h-auto max-h-[500px] overflow-y-scroll w-full absolute top-11 rounded-md z-50  bg-white">
          <ul>
            {listSearch.length > 0 ? (
              listSearch?.map((item) => (
                <li
                  key={item._id}
                  className="flex overflow-hidden h-[100px] w-full justify-center items-center flex-wrap border-2 border-indigo-200 border-b-[#c7c8c9] "
                >
                  <div className="w-[100px]">
                    <Image
                      height={100}
                      width={100}
                      src={item?.thumbnail[0]}
                      alt={item?.description || item?.name}
                      loading="lazy"
                    />
                  </div>
                  <div className="flex-grow pl-4 h-full">
                    <b>{item?.name}</b>
                    <p>
                      <label
                        htmlFor="Giá giảm"
                        className="text-sm text-red-400 font-medium"
                      >
                        {(
                          item?.total -
                          (item?.total * item?.discount_percent) / 100
                        )
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "VND"}
                      </label>
                      <del className="pl-4 text-[#c7c8c9] ">
                        <label htmlFor="Giá" className="text-sm  font-medium">
                          {item?.total
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "VND"}
                        </label>
                      </del>
                    </p>
                    <p className="text-sm">
                      <label htmlFor="cpu">
                        cpu : {item?.details?.cpu?.slice(0, 40)}...
                      </label>
                    </p>
                    <p>
                      <label htmlFor="card">
                        card : {item?.details?.card_graphics?.slice(0, 40)}...
                      </label>
                    </p>
                  </div>
                </li>
              ))
            ) : (
              <h3>Không tìm thấy kết quả</h3>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
