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

const mouseSchema = z.object({
  description: z.string().min(1),
  thumbnail: z.array(z.any()),
  name: z.string().min(1),
  total: z.string().min(1),
  guarantee: z.string().optional(),
  brands: z.string().min(1),
  details: z
    .object({
      color: z.string().optional(),
      polling_rate: z.string().optional(),
      microprocessor: z.string().optional(),
      manufacturer: z.string().optional(),
      similar: z.string().optional(),
      wireless_technology: z.string().optional(),
      battery: z.string().optional(),
      sensor: z.string().optional(),
      resolution: z.string().optional(),
      max_acceleration: z.string().optional(),
      max_speed: z.string().optional(),
      size: z.string().optional(),
      weight: z.string().optional(),
    })
    .optional(),
  discount_percent: z.string().min(1),
  inventory: z.string().min(1),
  product_category: z.string().min(1),
  product_brand: z.string().min(1),
});

export type FormData = z.infer<typeof mouseSchema>;
type FormAddMouse = {
  brand: IBrand[];
  type: any;
};
export default function FormAddMouse({ brand, type }: FormAddMouse) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [changeThumbnail, setChangeThumbnail] = useState<any[]>([]);
  const [changeBrand, setChangeBrand] = useState<string>("");
  const [changeType, setChangeType] = useState<string>("");
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
    resolver: zodResolver(mouseSchema),
  });

  useEffect(() => {
    setValue("thumbnail", changeThumbnail);
    setValue("product_brand", changeBrand);
    setValue("details.manufacturer", changeType);
    setValue("guarantee", "");
    setValue("product_category", changeType);
  }, [setValue, changeThumbnail, changeBrand, changeType]);

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
      const res = await postProductMouse({
        name: data.name,
        total: data.total,
        guarantee: data.guarantee,
        details: data.details || [],
        description: data.description,
        discount_percent: data.discount_percent,
        inventory: data.inventory,
        brands: data.brands,
        product_brand: data.product_brand,
        product_category: data.product_category,
        thumbnails: changeThumbnail,
      });
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
          title: "Thêm mới chuột thành công",
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
          title: "Thêm mới chuột thất bại",
          description: "Kiểm tra các thông tin hoặc thử lại sau",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.log("====================================");
      console.log(error);
      console.log("====================================");
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
    return (
      <div className="w-full h-auto text-center">
        <div className="m-auto">
          <CircularProgress />
        </div>
        <h3>Đang xử lý ,vui long dợi chút ... 😊</h3>
      </div>
    );
  }
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2 className="px-2 py-2 text-xl">Form thêm banner </h2>
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
              <div className="w-1/2 pl-2">
                {" "}
                <label
                  htmlFor="color"
                  className="block text-sm font-medium text-gray-700"
                >
                  color
                </label>
                <input
                  type="text"
                  id="color"
                  {...register("details.color", { required: true })}
                  className="mt-1 p-2 w-full border rounded-md"
                />
                {errors.details?.color && (
                  <span className="text-red-500">
                    Color không được để trống
                  </span>
                )}
              </div>
            </div>
            <div className="flex">
              <div className="w-1/2 pr-2">
                {" "}
                <label
                  htmlFor="polling_rate"
                  className="block text-sm font-medium text-gray-700"
                >
                  Polling rate
                </label>
                <input
                  type="text"
                  id="polling_rate"
                  {...register("details.polling_rate")}
                  className="mt-1 p-2 w-full border rounded-md"
                />
                {errors.details?.polling_rate && (
                  <span className="text-red-500">
                    Polling rate không được để trống
                  </span>
                )}
              </div>
              <div className="w-1/2 pl-2">
                {" "}
                <label
                  htmlFor="microprocessor"
                  className="block text-sm font-medium text-gray-700"
                >
                  Micro processor
                </label>
                <input
                  type="text"
                  id="microprocessor"
                  {...register("details.microprocessor")}
                  className="mt-1 p-2 w-full border rounded-md"
                />
                {errors.details?.microprocessor && (
                  <span className="text-red-500">
                    {" "}
                    Micro processor không được để trống
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="h-[200px] w-1/3 border-2  rounded-md ml-2 ">
            <label
              htmlFor="description"
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
              htmlFor="similar"
              className="block text-sm font-medium text-gray-700"
            >
              Similar
            </label>
            <input
              type="text"
              id="similar"
              {...register("details.similar", { required: false })}
              className="mt-1 p-2 h-full w-full border rounded-md"
              multiple
            />
            {errors.details?.similar && (
              <span className="text-red-500">
                Similar sản phẩm không được để trống
              </span>
            )}
          </div>
          <div className="py-2">
            <label
              htmlFor="wireless_technology"
              className="block text-sm font-medium text-gray-700"
            >
              Wireless technology
            </label>
            <input
              type="text"
              id="wireless_technology"
              {...register("details.wireless_technology")}
              className="mt-1 p-2 h-full w-full border rounded-md"
              multiple
            />
            {errors.details?.wireless_technology && (
              <span className="text-red-500">
                Wireless technology sản phẩm không được để trống
              </span>
            )}
          </div>
          <div className="py-2">
            <label
              htmlFor="battery"
              className="block text-sm font-medium text-gray-700"
            >
              Battery
            </label>
            <input
              type="text"
              id="battery"
              {...register("details.battery")}
              className="mt-1 p-2 h-full w-full border rounded-md"
              multiple
            />
            {errors.details?.battery && (
              <span className="text-red-500">
                Battery sản phẩm không được để trống
              </span>
            )}
          </div>
          <div className="py-2">
            <label
              htmlFor="sensor"
              className="block text-sm font-medium text-gray-700"
            >
              Sensor
            </label>
            <input
              type="text"
              id="sensor"
              {...register("details.sensor")}
              className="mt-1 p-2 h-full w-full border rounded-md"
              multiple
            />
            {errors.details?.sensor && (
              <span className="text-red-500">
                Sensor sản phẩm không được để trống
              </span>
            )}
          </div>
          <div className="py-2">
            <label
              htmlFor="resolution"
              className="block text-sm font-medium text-gray-700"
            >
              Resolution
            </label>
            <input
              type="text"
              id="resolution"
              {...register("details.resolution")}
              className="mt-1 p-2 h-full w-full border rounded-md"
              multiple
            />
            {errors.details?.resolution && (
              <span className="text-red-500">
                Resolution sản phẩm không được để trống
              </span>
            )}
          </div>
          <div className="py-2">
            <label
              htmlFor="max_speed"
              className="block text-sm font-medium text-gray-700"
            >
              Max speed
            </label>
            <input
              type="text"
              id="max_speed"
              {...register("details.max_speed")}
              className="mt-1 p-2 h-full w-full border rounded-md"
              multiple
            />
            {errors.details?.max_speed && (
              <span className="text-red-500">
                Max speed sản phẩm không được để trống
              </span>
            )}
          </div>
          <div className="py-2">
            <label
              htmlFor="size"
              className="block text-sm font-medium text-gray-700"
            >
              Size
            </label>
            <input
              type="text"
              id="size"
              {...register("details.size")}
              className="mt-1 p-2 h-full w-full border rounded-md"
              multiple
            />
            {errors.details?.size && (
              <span className="text-red-500">
                Size sản phẩm không được để trống
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
              {...register("details.weight")}
              className="mt-1 p-2 h-full w-full border rounded-md"
              multiple
            />
            {errors.details?.weight && (
              <span className="text-red-500">
                Weight sản phẩm không được để trống
              </span>
            )}
          </div>
          <div className="py-2">
            <label
              htmlFor="max_acceleration"
              className="block text-sm font-medium text-gray-700"
            >
              max_acceleration
            </label>
            <input
              type="text"
              id="max_acceleration"
              {...register("details.max_acceleration")}
              className="mt-1 p-2 h-full w-full border rounded-md"
              multiple
            />
            {errors.details?.weight && (
              <span className="text-red-500">
                max_acceleration sản phẩm không được để trống
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
            {errors.product_category && (
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
