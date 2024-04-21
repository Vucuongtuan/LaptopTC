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
import { postProductLaptop, postThumbnails } from "@/api/product/index.api";
import { toast, useToast } from "@/components/ui/use-toast";
import { FormField } from "@/components/ui/form";

const productSchema = z.object({
  name: z.string().min(1),
  brands: z.string().min(1),
  total: z.string().min(1),
  description: z.string().min(1),
  totalPurchases: z.number().default(0),
  thumbnails: z.array(z.any()),
  details: z.object({
    card_graphics: z.string(),
    connector: z.array(z.string()),
    cpu: z.string(),
    hard_drive: z.string(),
    pin: z.string(),
    ram: z.string(),
    screen: z.string(),
    audio: z.string(),
    cam: z.string(),
    keyboard: z.string(),
    size: z.string(),
    system: z.string(),
    weight: z.string(),
    wifi_bluetooth: z.string(),
  }),
  discount_percent: z.string().min(0).max(100),
  inventory: z.string().min(0),
  product_category: z.string().min(1).optional(),
  product_brand: z.string().min(1).optional(),
  product_content: z.string().optional(),
});
export type FormData = z.infer<typeof productSchema>;

export default function FormAdd() {
  const [connectors, setConnectors] = useState<string[]>([]);
  const [changeCollector, setChangeCollector] = useState<string>("");
  const [changeThumbnail, setChangeThumbnail] = useState<any[]>([]);
  const [fetching, setFetching] = useState<boolean>(false);
  const [changBrand, setchangBrand] = useState<string>("");
  const [changeType, setchangeType] = useState<string>("");
  const formRef = useRef<HTMLFormElement | null>(null);
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    setValue,
    control,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(productSchema),
  });
  console.log("====================================");
  console.log("error :", errors);
  console.log("====================================");
  useEffect(() => {
    setValue("details.connector", connectors);
    setValue("totalPurchases", 0);
    setValue("thumbnails", changeThumbnail);
    setValue("product_brand", changBrand);
    setValue("product_category", changeType);
  }, [connectors, setValue, changeThumbnail, changBrand, changeType]);
  const handleAddCollector = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setConnectors([...connectors, changeCollector]);
    // setValue("details.connector", [...connectors, changeCollector]);
  };
  const handleUploadThumbnail = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const thumbnails = e.target.files;
    if (thumbnails) {
      const newThumbnails = Array.from(thumbnails);
      setChangeThumbnail(newThumbnails);
    }
  };
  const onSubmit = async (data: FormData) => {
    setFetching(true);
    const productResponse = await postProductLaptop({
      name: data.name,
      brands: data.brands,
      total: data.total,
      description: data.description,
      totalPurchases: data.totalPurchases,
      discount_percent: data.discount_percent,
      inventory: data.inventory,
      details: data.details,
      product_brand: data.product_brand,
      product_category: data.product_category,
      product_content: data.product_content,
      thumbnails: changeThumbnail,
    }).finally(() => {
      setFetching(false);
    });
    if (productResponse.status === 200) {
      toast({
        title: "Thêm mới thành công",
        description: (
          <>
            <h3>{data.description}</h3>
            <Image
              src={URL.createObjectURL(data.thumbnails[0])}
              alt={data.description}
              height={150}
              width={150}
            />
          </>
        ),
      });
      reset();
    } else if (productResponse.status === 500) {
      toast({
        title: "Thêm mới Thất bại",
        description: "Kiểm tra lại các thông tin hoặc thử lại sau",
        variant: "destructive",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2 className="px-2 py-2 text-xl">Form thêm sản phẩm </h2>
      <div className="mb-4 flex">
        <div className="w-2/4 ">
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
          {errors.name && (
            <span className="text-red-500">
              Tên sản phẩm không được để trống
            </span>
          )}
        </div>
        <div className="w-1/4 ml-2">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Thumbnails
          </label>
          <input
            type="file"
            id="thumbnails"
            onChange={(e) => handleUploadThumbnail(e)}
            className="mt-1 p-2 h-full w-full "
            multiple
          />
          {errors.thumbnails && (
            <span className="text-red-500">
              Thumbnails sản phẩm không được để trống
            </span>
          )}
        </div>
      </div>
      <div className="mb-4 w-full flex">
        <div className="w-2/4">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <input
            type="text"
            id="description"
            {...register("description", { required: true })}
            className="mt-1 px-2 py-2 w-full border rounded-md"
          />
          {errors.name && (
            <span className="text-red-500">
              Description sản phẩm không được để trống
            </span>
          )}
          <div className="w-full mt-2 ">
            <div className="flex">
              <div className="w-1/2">
                <label
                  htmlFor="brands"
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
                {errors.brands && (
                  <span className="text-red-500">Giá không được để trống</span>
                )}
              </div>
              <div className="w-1/2 ml-2">
                <label
                  htmlFor="discount_percent"
                  className="block text-sm font-medium text-gray-700"
                >
                  Giảm giá
                </label>
                <input
                  type="number"
                  id="discount_percent"
                  {...register("discount_percent")}
                  className="mt-1 p-2 w-full border rounded-md"
                />
              </div>
            </div>
            <label
              htmlFor="brands"
              className="block text-sm font-medium text-gray-700"
            >
              Thương hiệu
            </label>
            <input
              type="text"
              id="brands"
              {...register("brands", { required: true })}
              className="mt-1 p-2 w-full border rounded-md"
            />
            {errors.brands && (
              <span className="text-red-500">
                Thương hiệu không được để trống
              </span>
            )}
          </div>
        </div>
        <div className="h-[200px] w-2/4 border-2  rounded-md ml-2">
          <ImageList variant="masonry" cols={5} gap={2}>
            {changeThumbnail.map((thumbnail) => {
              const previewThumbnail = URL.createObjectURL(thumbnail);
              return (
                <ImageListItem key={thumbnail}>
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
      <div className="mb-4 flex"></div>
      <div className="mb-4 flex">
        <div className="px-2 w-2/4"></div>
        <div className="px-2 w-2/4"></div>
      </div>
      <div className="mb-4">
        <label
          htmlFor="inventory"
          className="block text-sm font-medium text-gray-700"
        >
          Tồn kho
        </label>
        <input
          type="number"
          id="inventory"
          {...register("inventory", { required: true })}
          className="mt-1 p-2 w-full border rounded-md"
        />
        {errors.name && (
          <span className="text-red-500">
            Tồn kho sản phẩm không được để trống
          </span>
        )}
      </div>
      <div className="mb-4 flex">
        <div className="px-2 w-2/4">
          <label htmlFor="dropdown">Chọn hãng sản phẩm:</label>

          <Select onValueChange={(e) => setchangBrand(e)}>
            <SelectTrigger className="w-full mt-1">
              <SelectValue placeholder="Chọn" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="658a6f57a729dca615ea5d08">Asus</SelectItem>
              <SelectItem value="658a701fa729dca615ea5d09">Acer</SelectItem>
              <SelectItem value="658a7083a729dca615ea5d0a">Dell</SelectItem>
              <SelectItem value="658a70baa729dca615ea5d0b">HP</SelectItem>
              <SelectItem value="658a70eca729dca615ea5d0c">Lenovo</SelectItem>
              <SelectItem value="658a712ea729dca615ea5d0d">MSI</SelectItem>
              <SelectItem value="658a7163a729dca615ea5d0e">
                Color Master
              </SelectItem>
              <SelectItem value="658a71a1a729dca615ea5d0f">Logitech</SelectItem>
              <SelectItem value="658a71eca729dca615ea5d10">Razer</SelectItem>
              <SelectItem value="65aa95f63334f337b9456649">AKKO</SelectItem>
              <SelectItem value="65e72c32132ad64c06821434">Apple</SelectItem>
              <SelectItem value="661a4d842d48fcfc7e11678c">LG</SelectItem>
            </SelectContent>
          </Select>

          {errors.product_brand && <span>This field is required</span>}
        </div>
        <div className="px-2 w-2/4">
          <label htmlFor="dropdown">Chọn loại sản phẩm:</label>
          <Select onValueChange={(e) => setchangeType(e)}>
            <SelectTrigger className="w-full mt-1">
              <SelectValue placeholder="Chọn" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="656d4843385b688ac62d1581">
                Laptop văn phòng
              </SelectItem>
              <SelectItem value="656d486b385b688ac62d1583">
                Laptop gaming
              </SelectItem>
              <SelectItem value="656d489d385b688ac62d1585">
                Laptop máy trạm
              </SelectItem>
            </SelectContent>
          </Select>
          {errors.product_content && <span>This field is required</span>}
        </div>
      </div>
      <div className="mb-4 ">
        <h3 className="text-xl">Thông số kỹ thuật</h3>
        <div className="mb-4">
          <label
            htmlFor="card_graphics"
            className="block text-sm font-medium text-gray-700"
          >
            Card đồ họa
          </label>
          <input
            type="text"
            id="details.card_graphics"
            {...register("details.card_graphics", { required: true })}
            className="mt-1 p-2 w-full border rounded-md"
          />
          {errors.name && (
            <span className="text-red-500">
              Card đồ họa sản phẩm không được để trống
            </span>
          )}
        </div>
        <div className="mb-4 ">
          <div>
            <label htmlFor="connector">Connectors (Separated by comma)</label>
            <input
              type="text"
              className="mt-1 p-2 w-full border rounded-md"
              onChange={(e) => setChangeCollector(e.target.value)}
            />
            <button onClick={(e: any) => handleAddCollector(e)}>Thêm</button>
            {errors.details?.connector && <span>This field is required</span>}
            <ul>
              {connectors.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mb-4">
          <label
            htmlFor="cpu"
            className="block text-sm font-medium text-gray-700"
          >
            CPU
          </label>
          <input
            type="text"
            id="details.cpu"
            {...register("details.cpu", { required: true })}
            className="mt-1 p-2 w-full border rounded-md"
          />
          {errors.name && (
            <span className="text-red-500">
              cpu sản phẩm không được để trống
            </span>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="hard_drive"
            className="block text-sm font-medium text-gray-700"
          >
            Ổ cứng
          </label>
          <input
            type="text"
            id="details.hard_drive"
            {...register("details.hard_drive", { required: true })}
            className="mt-1 p-2 w-full border rounded-md"
          />
          {errors.name && (
            <span className="text-red-500">
              Ổ cứng sản phẩm không được để trống
            </span>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="pin"
            className="block text-sm font-medium text-gray-700"
          >
            Pin
          </label>
          <input
            type="text"
            id="details.pin"
            {...register("details.pin", { required: true })}
            className="mt-1 p-2 w-full border rounded-md"
          />
          {errors.name && (
            <span className="text-red-500">
              Pin sản phẩm không được để trống
            </span>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="ram"
            className="block text-sm font-medium text-gray-700"
          >
            Ram
          </label>
          <input
            type="text"
            id="details.ram"
            {...register("details.ram", { required: true })}
            className="mt-1 p-2 w-full border rounded-md"
          />
          {errors.name && (
            <span className="text-red-500">
              Ram sản phẩm không được để trống
            </span>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="screen"
            className="block text-sm font-medium text-gray-700"
          >
            Màn hình
          </label>
          <input
            type="text"
            id="details.screen"
            {...register("details.screen", { required: true })}
            className="mt-1 p-2 w-full border rounded-md"
          />
          {errors.name && (
            <span className="text-red-500">
              Màn hình sản phẩm không được để trống
            </span>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="audio"
            className="block text-sm font-medium text-gray-700"
          >
            Âm thanh
          </label>
          <input
            type="text"
            id="details.audio"
            {...register("details.audio", { required: true })}
            className="mt-1 p-2 w-full border rounded-md"
          />
          {errors.name && (
            <span className="text-red-500">
              Màn hình sản phẩm không được để trống
            </span>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="cam"
            className="block text-sm font-medium text-gray-700"
          >
            Cam
          </label>
          <input
            type="text"
            id="details.cam"
            {...register("details.cam", { required: true })}
            className="mt-1 p-2 w-full border rounded-md"
          />
          {errors.name && (
            <span className="text-red-500">
              Cam sản phẩm không được để trống
            </span>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="keyboard"
            className="block text-sm font-medium text-gray-700"
          >
            keyboard
          </label>
          <input
            type="text"
            id="details.keyboard"
            {...register("details.keyboard", { required: true })}
            className="mt-1 p-2 w-full border rounded-md"
          />
          {errors.name && (
            <span className="text-red-500">
              keyboard sản phẩm không được để trống
            </span>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="size"
            className="block text-sm font-medium text-gray-700"
          >
            size
          </label>
          <input
            type="text"
            id="details.size"
            {...register("details.size", { required: true })}
            className="mt-1 p-2 w-full border rounded-md"
          />
          {errors.name && (
            <span className="text-red-500">
              size sản phẩm không được để trống
            </span>
          )}
        </div>{" "}
        <div className="mb-4">
          <label
            htmlFor="system"
            className="block text-sm font-medium text-gray-700"
          >
            system
          </label>
          <input
            type="text"
            id="details.system"
            {...register("details.system", { required: true })}
            className="mt-1 p-2 w-full border rounded-md"
          />
          {errors.name && (
            <span className="text-red-500">
              system sản phẩm không được để trống
            </span>
          )}
        </div>{" "}
        <div className="mb-4">
          <label
            htmlFor="weight"
            className="block text-sm font-medium text-gray-700"
          >
            weight
          </label>
          <input
            type="text"
            id="details.weight"
            {...register("details.weight", { required: true })}
            className="mt-1 p-2 w-full border rounded-md"
          />
          {errors.name && (
            <span className="text-red-500">
              weight sản phẩm không được để trống
            </span>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="wifi_bluetooth"
            className="block text-sm font-medium text-gray-700"
          >
            wifi_bluetooth
          </label>
          <input
            type="text"
            id="details.wifi_bluetooth"
            {...register("details.wifi_bluetooth", { required: true })}
            className="mt-1 p-2 w-full border rounded-md"
          />
          {errors.name && (
            <span className="text-red-500">
              wifi_bluetooth sản phẩm không được để trống
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
  );
}
