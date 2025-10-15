"use client";
import { deleteBanner, getAllData } from "@/api/product/index.api";
import { Button } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import * as React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/components/ui/use-toast";
import {
  IApiBanner,
  IApiKeyboard,
  IApiMouse,
  IApiProduct,
} from "@/types/data/index.types";

type DataTableProps = {
  data: IApiBanner[];
};
export default function DataTable({ data }: DataTableProps) {
  const { toast } = useToast();

  const handleDeleteProduct = async (id: string, name: string) => {
    try {
      const res = await deleteBanner(id);
      console.log("====================================");
      console.log(res);
      console.log("====================================");
      //  if(res?.response?.status === 200){

      //  }
      toast({
        title: "Xóa thành công",
        description: `${name}(${id}) đã được xóa thành công`,
      });
    } catch (err) {
      toast({
        title: "Xóa thất bại",
        description: `Xóa sản phẩm ${name} thất bại vui lòng thử lại sau`,
      });
    }
  };

  return (
    <div className="relative overflow-x-auto h-full">
      <table className="w-full h-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              id
            </th>
            <th scope="col" className="px-6 py-3">
              description
            </th>
            <th scope="col" className="px-6 py-3 text-center">
              thumbnail
            </th>
            <th scope="col" className="px-6 py-3 text-center">
              Id sản phẩm
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {data?.map((product: any) => (
            <tr
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              key={product._id}
            >
              <td className="px-6 py-4"> {product._id}</td>
              <th
                scope="row"
                className="px-1 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                <Link
                  href={`/details/${product.id}`}
                  className="hover:text-red-300"
                >
                  {product.description}
                </Link>
              </th>
              <td className="px-6 py-4">
                {" "}
                <Image
                  src={product.thumbnail}
                  alt={product.description}
                  width={150}
                  height={150}
                  className="w-full h-full"
                />
              </td>

              <td className="px-6 py-4">
                <Link
                  href={`/details/${product.id}`}
                  className="hover:text-red-300"
                >
                  {product.id}
                </Link>
              </td>
              <td className="px-6 py-4">
                <AlertDialog>
                  <AlertDialogTrigger className="px-4 py-2 mr-2 bg-yellow-300 hover:bg-yellow-400 rounded-md text-black">
                    Sửa
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle className="text-left">
                        <h3 className="text-2xl">Sửa sản phẩm</h3>
                        <p className="text-sm">{product.name}</p>
                      </AlertDialogTitle>
                    </AlertDialogHeader>
                    <AlertDialogDescription></AlertDialogDescription>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Thoát</AlertDialogCancel>
                      <AlertDialogAction>Sửa</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
                <AlertDialog>
                  <AlertDialogTrigger className="px-4 py-2 bg-red-300 hover:bg-red-400 rounded-md text-black">
                    Xóa
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        <h3 className="text-red-500">Bạn muốn xóa</h3>
                        <p>{product.name}</p>
                      </AlertDialogTitle>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Thoát</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() =>
                          handleDeleteProduct(product._id, product.name)
                        }
                      >
                        Xóa
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
