"use client";
import { getAllDataByID } from "@/api/product/index.api";
import { IApiKeyboard } from "@/types/data/index.types";
import React, { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CircularProgress, ImageList, ImageListItem } from "@mui/material";
import Image from "next/image";
export default function FormUpdateBanPhim({ brand, data, type }: any) {
  const [changeBrand, setChangeBrand] = useState<string>("");
  const [changeNameBrand, setChangeNameBrand] = useState<string>("");
  const [changeThumbnail, setChangeThumbnail] = useState<any[]>([]);
  const [changeType, setChangeType] = useState<string>("");
  const { register, handleSubmit, formState: errors } = useForm();
  const onSubmit = (data: any) => {
    console.log(data);
  };

  const handleUploadThumbnail = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const thumbnails = e.target.files;
    if (thumbnails) {
      const newThumbnails = Array.from(thumbnails);
      setChangeThumbnail(newThumbnails);
    }
  };

  console.log(errors);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2 className="px-2 py-2 text-xl">Form thêm bàn phím </h2>
      <div className="mb-4 flex">
        <div className="w-2/3 pr-2">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Tên sản phẩm
          </label>
          <input
            type="text"
            id="name"
            {...register("name", { required: true })}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
        <div className="w-1/4 ml-2">
          <label htmlFor="dropdown">Chọn hãng sản phẩm:</label>
          <Select onValueChange={(e) => setChangeBrand(e)}>
            <SelectTrigger className="w-full mt-1">
              <SelectValue placeholder="Chọn" />
            </SelectTrigger>
            <SelectContent>
              {brand?.map((brand: any) => (
                <SelectItem
                  key={brand._id}
                  value={brand._id}
                  defaultChecked={data?.data.product_brand}
                  onClick={() => setChangeNameBrand(brand.name)}
                >
                  {brand.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>{" "}
      </div>
      <div className="w-full ">
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700"
        >
          Description
        </label>
        <textarea
          id="description"
          {...register("description", { required: true })}
          className="mt-1 p-2 w-full border rounded-md"
        />
      </div>

      <div className="mb-4 w-full flex">
        <div className="w-2/3">
          <div className="flex">
            <div className="w-1/2 pr-2">
              <label
                htmlFor="total"
                className="block text-sm font-medium text-gray-700"
              >
                Giá
              </label>
              <input
                type="text"
                id="total"
                {...register("total")}
                className="mt-1 p-2 w-full border rounded-md"
              />
            </div>
            <div className="w-1/2 pl-2">
              <label
                htmlFor="discount_percent"
                className="block text-sm font-medium text-gray-700"
              >
                Giảm giá
              </label>
              <input
                type="text"
                id="discount_percent"
                {...register("discount_percent", { required: true })}
                className="mt-1 p-2 w-full border rounded-md"
              />
            </div>
          </div>
          <div className="flex">
            <div className="w-1/2 pr-2">
              {" "}
              <label
                htmlFor="inventory"
                className="block text-sm font-medium text-gray-700"
              >
                Tồn kho
              </label>
              <input
                type="text"
                id="inventory"
                {...register("inventory", { required: true })}
                className="mt-1 p-2 w-full border rounded-md"
              />
            </div>
          </div>
          <div className="flex">
            <div className="w-1/2 pr-2">
              {" "}
              <label
                htmlFor="switch_key"
                className="block text-sm font-medium text-gray-700"
              >
                Switch
              </label>
              <input
                type="text"
                id="switch_key"
                {...register("switch_key")}
                className="mt-1 p-2 w-full border rounded-md"
              />
            </div>
            <div className="w-1/2 pl-2">
              <label
                htmlFor="pin"
                className="block text-sm font-medium text-gray-700"
              >
                pin
              </label>
              <input
                type="text"
                id="pin"
                {...register("pin")}
                className="mt-1 p-2 w-full border rounded-md"
              />
            </div>
          </div>
        </div>
        <div className="h-[200px] w-1/3 border-2  rounded-md ml-2 ">
          <label
            htmlFor="Thumbnails"
            className="block text-sm font-medium text-gray-700"
          >
            Thumbnails
          </label>
          <input
            type="file"
            id="thumbnail"
            onChange={(e) => handleUploadThumbnail(e)}
            className="mt-1 p-2 h-full w-full "
            multiple
          />

          <ImageList variant="masonry" cols={5} gap={2}>
            {changeThumbnail.map((thumbnail, index) => {
              const previewThumbnail = URL.createObjectURL(thumbnail);
              return (
                <ImageListItem key={index}>
                  <Image
                    src={previewThumbnail}
                    alt="upload Thumbnail"
                    loading="lazy"
                    height={150}
                    width={150}
                  />
                </ImageListItem>
              );
            })}
          </ImageList>
        </div>
      </div>
      <div className="grid grid-cols-4 grid-rows-3 gap-4 mb-4  h-[200px]">
        <div className="py-2">
          <label
            htmlFor="personal"
            className="block text-sm font-medium text-gray-700"
          >
            personal
          </label>
          <input
            type="text"
            id="personal"
            {...register("personal", { required: false })}
            className="mt-1 p-2 h-full w-full border rounded-md"
            multiple
          />
        </div>
        <div className="py-2">
          <label
            htmlFor="foam"
            className="block text-sm font-medium text-gray-700"
          >
            foam
          </label>
          <input
            type="text"
            id="foam"
            {...register("foam")}
            className="mt-1 p-2 h-full w-full border rounded-md"
          />
        </div>
        <div className="py-2">
          <label
            htmlFor="configuration"
            className="block text-sm font-medium text-gray-700"
          >
            configuration
          </label>
          <input
            type="text"
            id="configuration"
            {...register("configuration")}
            className="mt-1 p-2 h-full w-full border rounded-md"
            multiple
          />
        </div>
        <div className="py-2">
          <label
            htmlFor="keycap"
            className="block text-sm font-medium text-gray-700"
          >
            keycap
          </label>
          <input
            type="text"
            id="keycap"
            {...register("keycap")}
            className="mt-1 p-2 h-full w-full border rounded-md"
          />
        </div>
        <div className="py-2">
          <label
            htmlFor="support"
            className="block text-sm font-medium text-gray-700"
          >
            support
          </label>
          <input
            type="text"
            id="support"
            {...register("support")}
            className="mt-1 p-2 h-full w-full border rounded-md"
            multiple
          />
        </div>
        <div className="py-2">
          <label
            htmlFor="accessory"
            className="block text-sm font-medium text-gray-700"
          >
            accessory
          </label>
          <input
            type="text"
            id="accessory"
            {...register("accessory")}
            className="mt-1 p-2 h-full w-full border rounded-md"
            multiple
          />
        </div>
        <div className="py-2">
          <label
            htmlFor="software"
            className="block text-sm font-medium text-gray-700"
          >
            software
          </label>
          <input
            type="text"
            id="software"
            {...register("software")}
            className="mt-1 p-2 h-full w-full border rounded-md"
            multiple
          />
        </div>
        <div className="py-2">
          <label
            htmlFor="layout"
            className="block text-sm font-medium text-gray-700"
          >
            layout
          </label>
          <input
            type="text"
            id="layout"
            {...register("layout")}
            className="mt-1 p-2 h-full w-full border rounded-md"
            multiple
          />
        </div>
        <div className="py-2">
          <label
            htmlFor="compatibility"
            className="block text-sm font-medium text-gray-700"
          >
            compatibility
          </label>
          <input
            type="text"
            id="compatibility"
            {...register("compatibility")}
            className="mt-1 p-2 h-full w-full border rounded-md"
            multiple
          />
        </div>
        <div className="py-2">
          <label
            htmlFor="brands"
            className="block text-sm font-medium text-gray-700"
          >
            Brands
          </label>
          <input
            type="text"
            id="brands"
            {...register("brands")}
            className="mt-1 p-2 h-full w-full border rounded-md"
            multiple
          />
        </div>
        <div className="py-2">
          <label
            htmlFor="brands"
            className="block text-sm font-medium text-gray-700"
          >
            Loại sản phẩm
          </label>
          <Select onValueChange={(e) => setChangeType(e)}>
            <SelectTrigger className="w-full mt-1">
              <SelectValue placeholder="Chọn" />
            </SelectTrigger>
            <SelectContent>
              {type.map((type: any) => (
                <SelectItem
                  value={type._id}
                  key={type._id}
                  defaultValue={data?.data?.product_type_keybourd}
                >
                  {type.name_type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Button submit */}
      <div className="mt-4">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Sửa sản phẩm
        </button>
      </div>
    </form>
  );
}
