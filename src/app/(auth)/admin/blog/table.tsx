"use client";
import React from "react";
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
import Link from "next/link";
import { useToast } from "@/components/ui/use-toast";
interface IBlogProps {
  data: [
    {
      _id: string;
      thumbnail: string;
      title: string;
      description: string;
      body: string;
      author: string;
      idAuthor: string;
      idProduct: string;
    }
  ];
}
export default function TableBlogAll({ data }: IBlogProps) {
  const { toast } = useToast();
  const handleDeleteProduct = async (id: string) => {
    toast({
      title: "Xóa thành công",
      description: `Sản phẩm có ID : ${id}`,
    });
  };

  return (
    <table className="w-full h-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" className="px-6 py-3">
            title
          </th>
          <th scope="col" className="px-6 py-3">
            description
          </th>

          <th scope="col" className="px-6 py-3 text-center">
            author
          </th>
          <th scope="col" className="px-6 py-3">
            ID Product
          </th>
          <th scope="col" className="px-6 py-3">
            Action
          </th>
        </tr>
      </thead>
      <tbody>
        {data?.map((blog) => {
          return (
            <tr
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              key={blog._id}
            >
              <th
                scope="row"
                className="px-1 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                <Link
                  href={`/details/${blog.idProduct}`}
                  className="hover:text-red-300"
                >
                  {blog.title}
                </Link>
              </th>
              <td className="px-6 py-4"> {blog.description}</td>
              <td className="px-6 py-4 text-center">{blog.author}</td>
              <td className="px-6 py-4 text-center">{blog.idProduct}</td>
              <td className="px-6 py-4">
                <AlertDialog>
                  <AlertDialogTrigger className="px-4 py-2 mr-2 bg-yellow-300 hover:bg-yellow-400 rounded-md text-black">
                    Sửa
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle className="text-left">
                        <h3 className="text-2xl">Sửa sản phẩm</h3>
                        <p className="text-sm">{blog.title}</p>
                      </AlertDialogTitle>
                    </AlertDialogHeader>
                    <AlertDialogDescription></AlertDialogDescription>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Thoát</AlertDialogCancel>
                      <AlertDialogAction>
                        <Link
                          href={`/admin/blog/update?id=${blog._id}`}
                          className="w-full h-full text-center"
                        >
                          {" "}
                          Sửa
                        </Link>
                      </AlertDialogAction>
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
                        <p>{blog.title}</p>
                      </AlertDialogTitle>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Thoát</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleDeleteProduct(blog._id)}
                      >
                        Xóa
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
