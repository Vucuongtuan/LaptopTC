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
import { ImageList, ImageListItem } from "@mui/material";
import axios from "axios";
import {
  postBanner,
  postProductLaptop,
  postThumbnails,
} from "@/api/product/index.api";
import { toast, useToast } from "@/components/ui/use-toast";
import { FormField } from "@/components/ui/form";
import {
  IApiBanner,
  IApiKeyboard,
  IApiMouse,
  IApiProduct,
} from "@/types/data/index.types";

const bannerSchema = z.object({
  description: z.string().min(1),
  thumbnail: z.array(z.any()),
  id: z.string().min(1),
});
export type FormData = z.infer<typeof bannerSchema>;
type FormAddBanner = {
  all: IApiProduct[] | IApiKeyboard[] | IApiMouse[];
};
export default function FormAdd({ all }: FormAddBanner) {
  const [changeThumbnail, setChangeThumbnail] = useState<any[]>([]);
  const [changeID, setChangeID] = useState<string>("");
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    setValue,
    control,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(bannerSchema),
  });

  useEffect(() => {
    setValue("thumbnail", changeThumbnail);
    setValue("id", changeID);
  }, [setValue, changeThumbnail, changeID]);

  const handleUploadThumbnail = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const thumbnails = e.target.files;
    if (thumbnails) {
      const newThumbnails = Array.from(thumbnails);
      setChangeThumbnail(newThumbnails);
    }
  };
  const onSubmit = async (data: FormData) => {
    const res = await postBanner({
      id: data.id,
      description: data.description,
      thumbnail: data.thumbnail[0],
    });

    if (res.status === 200) {
      toast({
        title: "Thêm mới banner thành công",
        description: (
          <>
            <h3>{data.description}</h3>
            <Image
              src={URL.createObjectURL(data.thumbnail[0])}
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
        title: "Thêm mới banner thất bại",
        description: "Kiểm tra các thông tin hoặc thử lại sau",
        variant: "destructive",
      });
    }
    // if (productResponse.status === 200) {
    //   toast({
    //     title: "Thêm mới thành công",
    //   });
    // } else if (productResponse.status === 500) {
    //   toast({
    //     title: "Thêm mới Thất bại",
    //     description: "Kiểm tra lại các thông tin hoặc thử lại sau",
    //     variant: "destructive",
    //   });
    // }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2 className="px-2 py-2 text-xl">Form thêm banner </h2>
      <div className="mb-4 flex">
        <div className="w-2/4 ">
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
          <div>
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
          </div>
        </div>
        <div className="w-1/4 ml-2">
          <label htmlFor="dropdown">Chọn hãng sản phẩm:</label>

          <Select onValueChange={(e) => setChangeID(e)}>
            <SelectTrigger className="w-full mt-1">
              <SelectValue placeholder="Chọn" />
            </SelectTrigger>
            <SelectContent>
              {all?.map((banner) => (
                <SelectItem key={banner._id} value={banner._id}>
                  {banner.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.id && (
            <span className="text-red-500">id không được để trống</span>
          )}
        </div>
      </div>
      <div className="mb-4 w-full flex">
        <div className="h-[300px] w-2/4 border-2  rounded-md ml-2 ">
          {changeThumbnail.map((thumbnail, index) => {
            const previewThumbnail = URL.createObjectURL(thumbnail);
            return (
              <Image
                key={index}
                src={previewThumbnail}
                alt="upload Thumbnail"
                loading="lazy"
                height={150}
                width={150}
                className="w-full h-full object-cover rounded-md"
              />
            );
          })}
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
  );
}
