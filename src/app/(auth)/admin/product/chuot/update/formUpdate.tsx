"use client";
import { getAllDataByID, updateItem } from "@/api/product/index.api";
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
import { useToast } from "@/components/ui/use-toast";

export default function FormUpdateMouse({ data }: any) {
  const { toast } = useToast();
  const [changeThumbnail, setChangeThumbnail] = useState<any[]>([]);
  const { register, handleSubmit, formState: errors } = useForm();
  const onSubmit = async (dataForm: any) => {
    try {
      const dataNew = {
        name: dataForm.name,
        description: dataForm.description,
        total: dataForm.total,
        discount_percent: dataForm.discount_percent,
        inventory: dataForm.inventory,
        switch_key: dataForm.switch_key,
        pin: dataForm.pin,
        details: {
          similar: dataForm.similar,
          wireless_technology: dataForm.wireless_technology,
          battery: dataForm.battery,
          sensor: dataForm.sensor,
          resolution: dataForm.resolution,
          max_speed: dataForm.max_speed,
          size: dataForm.size,
          weight: dataForm.weight,
          max_acceleration: dataForm.max_acceleration,
        },
        brands: dataForm.brands,
      };
      const res = await updateItem(data?.data[0]._id, dataNew, "mouse");
      if (res.status === 200) {
        toast({
          title: "Sửa bàn phím thành công",
          description: (
            <>
              <h3>{dataForm.name}</h3>
            </>
          ),
        });
      }
    } catch (err) {
      console.log(err);
      toast({
        title: "Sửa không thành công",
        description: `Vui lòng thử lại sau`,
        variant: "destructive",
      });
    }
  };
  console.log(errors);

  const handleUploadThumbnail = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const thumbnails = e.target.files;
    if (thumbnails) {
      const newThumbnails = Array.from(thumbnails);
      setChangeThumbnail(newThumbnails);
    }
  };

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
            defaultValue={data?.data[0].name}
            {...register("name", { required: true })}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
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
          defaultValue={data?.data[0].description}
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
                defaultValue={data?.data[0].total}
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
                defaultValue={data?.data[0].discount_percent}
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
                defaultValue={data?.data[0].inventory}
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
                defaultValue={data?.data[0].switch_key}
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
                defaultValue={data?.data[0].pin}
                {...register("pin")}
                className="mt-1 p-2 w-full border rounded-md"
              />
            </div>
          </div>
        </div>
        <div className="h-[250px] w-1/3 border-2  rounded-md ml-2 ">
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
            className="mt-1  p-2 h-1/6 w-full "
            multiple
          />

          <ImageList variant="masonry" cols={5} gap={2}>
            {changeThumbnail.length > 0
              ? changeThumbnail.map((thumbnail, index) => {
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
                })
              : data?.data[0].thumbnail.map(
                  (thumbnail: string, index: number) => {
                    return (
                      <ImageListItem key={index}>
                        <Image
                          src={thumbnail}
                          alt="upload Thumbnail"
                          loading="lazy"
                          height={150}
                          width={150}
                        />
                      </ImageListItem>
                    );
                  }
                )}
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
            defaultValue={data?.data[0].details.similar}
            {...register("similar", { required: false })}
            className="mt-1 p-2 h-full w-full border rounded-md"
            multiple
          />
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
            defaultValue={data?.data[0].details.wireless_technology}
            {...register("wireless_technology")}
            className="mt-1 p-2 h-full w-full border rounded-md"
            multiple
          />
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
            defaultValue={data?.data[0].details.battery}
            {...register("battery")}
            className="mt-1 p-2 h-full w-full border rounded-md"
          />
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
            defaultValue={data?.data[0].details.sensor}
            id="sensor"
            {...register("sensor")}
            className="mt-1 p-2 h-full w-full border rounded-md"
          />
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
            defaultValue={data?.data[0].details.resolution}
            id="resolution"
            {...register("resolution")}
            className="mt-1 p-2 h-full w-full border rounded-md"
          />
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
            defaultValue={data?.data[0].details.max_speed}
            {...register("max_speed")}
            className="mt-1 p-2 h-full w-full border rounded-md"
          />
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
            defaultValue={data?.data[0].details.size}
            {...register("size")}
            className="mt-1 p-2 h-full w-full border rounded-md"
          />
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
            defaultValue={data?.data[0].details.weight}
            {...register("weight")}
            className="mt-1 p-2 h-full w-full border rounded-md"
          />
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
            defaultValue={data?.data[0].details.max_acceleration}
            {...register("max_acceleration")}
            className="mt-1 p-2 h-full w-full border rounded-md"
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
            defaultValue={data?.data[0].brands}
            {...register("brands")}
            className="mt-1 p-2 h-full w-full border rounded-md"
          />
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
