"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { z } from "zod";
import Image from "next/image";
import { CircularProgress, ImageList, ImageListItem } from "@mui/material";
import axios from "axios";
import {
  postBanner,
  postKeyboard,
  postProductLaptop,
  postProductMouse,
  postThumbnails,
} from "@/api/product/index.api";
import { toast, useToast } from "@/components/ui/use-toast";
import { FormField } from "@/components/ui/form";
import {
  IApiBanner,
  IApiKeyboard,
  IApiMouse,
  IApiProduct,
  IBrand,
} from "@/types/data/index.types";
import LoadingPage from "@/components/loadingElement";

const keyboardSchema = z.object({
  name: z.string(),
  total: z.number(),
  thumbnail: z.array(z.string()),
  layout: z.string(),
  switch_key: z.string(),
  pin: z.string().nullable(),
  personal: z.string(),
  foam: z.string().nullable(),
  weight: z.string(),
  size: z.string(),
  connector: z.array(z.string()),
  configuration: z.string().nullable(),
  keycap: z.string(),
  support: z.string(),
  accessory: z.string(),
  software: z.string(),
  compatibility: z.string(),
  discount_percent: z.number(),
  inventory: z.number(),
  product_type_keybourd: z.string(),
  product_brand: z.string(),
  totalPurchases: z.string(),
  description: z.string(),
  brands: z.string(),
});

export type FormData = z.infer<typeof keyboardSchema>;
type FormAddKeyboard = {
  brand: IBrand[];
  type: any;
};
export default function FormAddKeyboard({ brand, type }: FormAddKeyboard) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [changeThumbnail, setChangeThumbnail] = useState<any[]>([]);
  const [changeBrand, setChangeBrand] = useState<string>("");
  const [changeType, setChangeType] = useState<string>("");
  const [connectors, setConnectors] = useState<string[]>([]);
  const [changeCollector, setChangeCollector] = useState<string>("");
  const [changeNameBrand, setChangeNameBrand] = useState<string>("");
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    setValue,
    control,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(keyboardSchema),
  });

  useEffect(() => {
    setValue("thumbnail", changeThumbnail);
    setValue("product_brand", changeBrand);
    setValue("connector", connectors);
    setValue("product_type_keybourd", changeType);
  }, [setValue, changeThumbnail, changeBrand, changeType, connectors]);

  const handleUploadThumbnail = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const thumbnails = e.target.files;
    if (thumbnails) {
      const newThumbnails = Array.from(thumbnails);
      setChangeThumbnail(newThumbnails);
    }
  };

  const onSubmit = async (data: FormData) => {
    try {
      setIsLoading(true);
      const res = await postKeyboard(data);
      // {
      //   name: data.name,
      //   total: data.total,
      //   thumbnail: data.thumbnail,
      //   layout: data.layout,
      //   switch_key: data.switch_key,
      //   pin: data.pin,
      //   personal: data.personal,
      //   foam: data.foam,
      //   weight: data.weight,
      //   size: data.size,
      //   connector: data.connector,
      //   configuration: data.configuration,
      //   keycap: data.keycap,
      //   support: data.support,
      //   accessory: data.accessory,
      //   software: data.software,
      //   compatibility: data.compatibility,
      //   discount_percent: data.discount_percent,
      //   inventory: data.inventory,
      //   product_type_keybourd: data.product_type_keybourd,
      //   product_brand: data.product_brand,
      //
      //   description: data.description,
      //   brands: data.brands,
      // }
      toast({
        title: "click",
        description: (
          <>
            <h3>{data.description}</h3>
            <Image
              src={data.thumbnail[0]}
              alt={data.description}
              height={150}
              width={150}
            />
          </>
        ),
      });
      if (res.status === 200) {
        toast({
          title: "Thêm mới bàn phím thành công",
          description: (
            <>
              <h3>{data.description}</h3>
              <Image
                src={data.thumbnail[0]}
                alt={data.description}
                height={150}
                width={150}
              />
            </>
          ),
        });
        reset();
      } else if (res.status === 500) {
        toast({
          title: "Thêm mới bàn phím thất bại",
          description: "Kiểm tra các thông tin hoặc thử lại sau",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Thêm mới chuột thất bại",
        description: "Kiểm tra các thông tin hoặc thử lại sau",
        variant: "destructive",
      });
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }
  };
  if (isLoading === true) {
    return <LoadingPage />;
  }
  return (
    <>
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
            {errors.description && (
              <span className="text-red-500">
                Tên sản phẩm không được để trống
              </span>
            )}
          </div>
          <div className="w-1/4 ml-2">
            <label htmlFor="dropdown">Chọn hãng sản phẩm:</label>
            <Select onValueChange={(e) => setChangeBrand(e)}>
              <SelectTrigger className="w-full mt-1">
                <SelectValue placeholder="Chọn" />
              </SelectTrigger>
              <SelectContent>
                {brand?.map((brand) => (
                  <SelectItem
                    key={brand._id}
                    value={brand._id}
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
          {errors.description && (
            <span className="text-red-500">
              description không được để trống
            </span>
          )}
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
                  {...register("total", { required: true })}
                  className="mt-1 p-2 w-full border rounded-md"
                />
                {errors.total && (
                  <span className="text-red-500">Giá không được để trống</span>
                )}
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
                {errors.inventory && (
                  <span className="text-red-500">
                    Tồn kho không được để trống
                  </span>
                )}
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
                {errors.switch_key && (
                  <span className="text-red-500">
                    Switch không được để trống
                  </span>
                )}
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
                {errors.pin && (
                  <span className="text-red-500"> pin không được để trống</span>
                )}
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
            {errors.thumbnail && (
              <span className="text-red-500">
                Thumbnails sản phẩm không được để trống
              </span>
            )}
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
            {errors.personal && (
              <span className="text-red-500">
                personal sản phẩm không được để trống
              </span>
            )}
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
            {errors.foam && (
              <span className="text-red-500">
                foam sản phẩm không được để trống
              </span>
            )}
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
            {errors.configuration && (
              <span className="text-red-500">
                Battery sản phẩm không được để trống
              </span>
            )}
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
            {errors.keycap && (
              <span className="text-red-500">
                keycap sản phẩm không được để trống
              </span>
            )}
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
            {errors.support && (
              <span className="text-red-500">
                support sản phẩm không được để trống
              </span>
            )}
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
            {errors.accessory && (
              <span className="text-red-500">
                accessory sản phẩm không được để trống
              </span>
            )}
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
            {errors.software && (
              <span className="text-red-500">
                software sản phẩm không được để trống
              </span>
            )}
          </div>
          <div className="py-2">
            <label
              htmlFor="weight"
              className="block text-sm font-medium text-gray-700"
            >
              Weight
            </label>
            <input
              type="text"
              id="weight"
              {...register("weight")}
              className="mt-1 p-2 h-full w-full border rounded-md"
              multiple
            />
            {errors.weight && (
              <span className="text-red-500">
                Weight sản phẩm không được để trống
              </span>
            )}
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
            {errors.compatibility && (
              <span className="text-red-500">
                compatibility sản phẩm không được để trống
              </span>
            )}
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
            {errors.brands && (
              <span className="text-red-500">
                brands sản phẩm không được để trống
              </span>
            )}
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
                  <SelectItem value={type._id} key={type._id}>
                    {type.name_type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.product_type_keybourd && (
              <span className="text-red-500">
                Loại sản phẩm không được để trống
              </span>
            )}
          </div>
        </div>

        {/* Button submit */}
        <div className="mt-4">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Thêm sản phẩm
          </button>
        </div>
      </form>
    </>
  );
}
