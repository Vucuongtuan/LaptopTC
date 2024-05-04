"use client";
import { RootState } from "@/lib/store";
import React, { ChangeEvent, memo } from "react";
import { useSelector } from "react-redux";
import ReactQuill from "react-quill";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { Button, debounce } from "@mui/material";

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
import TextEditor from "./textEditor";
import { createBlogAPI } from "@/api/admin/index.api";
import { useToast } from "@/components/ui/use-toast";
import { Description } from "@radix-ui/react-toast";
import LoadingElement from "@/components/loading";

// const modules = {
//   toolbar: [
//     [{ header: [1, 2, false] }],
//     ["bold", "italic", "underline", "strike", "blockquote", "insertTable"],
//     [
//       { list: "ordered" },
//       { list: "bullet" },
//       { indent: "-1" },
//       { indent: "+1" },
//     ],
//     ["link", "image"],
//     ["clean"],
//   ],
// };
// const formats = [
//   "header",
//   "bold",
//   "italic",
//   "underline",
//   "strike",
//   "blockquote",
//   "list",
//   "bullet",
//   "indent",
//   "link",
//   "image",
// ];

function CreateBlog() {
  const [thumbnail, setThumbnail] = React.useState<any[]>([]);
  const [search, setSearch] = React.useState<string>("");
  const [idProduct, setidProduct] = React.useState<string>("");
  const [listProduct, setListProduct] = React.useState<any[] | undefined>([]);
  const [product, setProduct] = React.useState<string>("");
  const [loading, isLoading] = React.useState<boolean>(false);
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();
  const [content, setContent] = React.useState<string>("");
  const auth = useSelector((auth: RootState) => auth.auth.adminName);
  const local = window ? localStorage.getItem("adminData") : "";
  const nameData = JSON.parse(local ?? "");
  const handleContentChange = (value: string) => {
    const idAdmin = JSON.parse(localStorage.getItem("adminData") ?? "").adminId;
    setValue("idAuthor", idAdmin);
    setValue("content", value);
  };

  React.useEffect(() => {
    const searchQuery = debounce(async () => {
      const res = await fetch("http://localhost:4000/all-product/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: search }),
      });
      const data = await res.json();
      if (res.status === 200) {
        setListProduct(data);
      } else if (res.status === 404) {
        setListProduct(undefined);
      }
    }, 1000);
    searchQuery();
  }, [search]);

  React.useEffect(() => {
    setValue("thumbnail", thumbnail);
  }, [setValue, thumbnail]);
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const files = e.target.files;
    if (files) {
      setThumbnail(Array.from(files));
    }
  };
  console.log(errors);

  const modalSelectProduct = () => (
    <AlertDialog>
      <AlertDialogTrigger className="w-full bg-black py-2 rounded-md text-white hover:bg-slate-800">
        Chọn sản phẩm
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Chọn {/*sản phẩm ?*/}</AlertDialogTitle>
          <AlertDialogDescription>
            <div className="w-full h-[350px] text-left">
              <input
                type="text"
                placeholder="Search"
                className="w-full py-2 px-2 rounded-md border-2 border-spacing-2 border-black"
                onChange={(e) => setSearch(e.target.value)}
              />
              <p className="py-2">
                <h3>Kết quả</h3>
              </p>
              <div className={` h-[280px] overflow-y-scroll`}>
                {listProduct === undefined ? (
                  <span className="text-xl">Không có sản phẩm nào</span>
                ) : (
                  listProduct.map((item) => {
                    const newTotal =
                      item.total -
                      (parseInt(item.total) * item.discount_percent) / 100;
                    return (
                      <div
                        className="w-full h-[160px] flex mb-2 rounded-md shadow-md cursor-pointer "
                        key={item._id}
                        onClick={() => {
                          setidProduct(item._id);
                          setProduct(item.name);
                        }}
                      >
                        <AlertDialogAction className="break-all w-full  h-full bg-white hover:bg-slate-100">
                          <div className="w-1/3 h-full overflow-hidden">
                            <Image
                              src={item.thumbnail[0]}
                              alt={item.description}
                              width={200}
                              height={200}
                              className="object-cover"
                            />
                          </div>
                          <div className="w-2/3 px-2 py-2 h-full text-black break-all">
                            <h4 className="break-all">{item.name}</h4>
                            <div className="flex px-2 mt-4 text-xl">
                              <span className="text-red-500">
                                {newTotal
                                  .toString()
                                  .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}{" "}
                                VND
                              </span>
                              <div className=" border-red-500 text-sm ml-5">
                                - {item.discount_percent} %
                              </div>
                            </div>
                          </div>
                        </AlertDialogAction>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
  const onSubmit = async (data: any) => {
    isLoading(true);

    try {
      const newData = {
        title: data.title,
        description: data.description,
        author: data.author,
        idAuthor: data.idAuthor,
        idProduct: idProduct.length === 0 ? null : idProduct,
        thumbnail: thumbnail,
        body: data.content,
      };

      const res = await createBlogAPI(newData);

      if (res.status === 200) {
        reset();
        toast({
          title: "Thêm mới bài viết thành cống",
        });
      } else if (res.status === 500) {
        toast({
          title: "Thêm mới thất bại",
          description: `${res.data.message}`,
        });
      } else if (res.status === 400) {
        toast({
          title: "Thêm mới thất bại",
          description: `${res.data.message}`,
        });
      }
    } catch (err) {
    } finally {
      isLoading(false);
    }
  };
  if (loading === true) {
    return (
      <>
        <LoadingElement />
      </>
    );
  }
  return (
    <form
      method="post"
      onSubmit={handleSubmit(onSubmit)}
      className="w-full px-2 text-black"
    >
      <div className="flex w-full">
        <div className=" w-1/2 ">
          <div className="px-2 py-2 text-black">
            <p>
              <label htmlFor="title">Title</label>
            </p>
            <input
              type="text"
              placeholder="title"
              {...register("title", { required: true })}
              className="w-full py-2 rounded-md px-1"
            />
          </div>{" "}
          <div className="px-2 py-2">
            <p>
              <label htmlFor="description">Description</label>
            </p>
            <input
              type="text"
              placeholder="description"
              {...register("description", { required: true })}
              className="w-full py-2 rounded-md px-1"
            />
          </div>{" "}
          <div className="px-2 py-2">
            <p>
              <label htmlFor="author">Author</label>
            </p>
            <input
              type="text"
              placeholder="author"
              {...register("author", { required: true })}
              className="w-full py-2 rounded-md px-1"
            />
          </div>
          <div className="px-2 py-4">
            <p className="pb-2">
              <label htmlFor="Sản phẩm">Sản phẩm</label>
            </p>
            {modalSelectProduct()}
            <p className="mt-2">
              <label htmlFor="Sản phẩm đã chọn">
                Sản phẩm đã chọn : {product}
              </label>
            </p>
          </div>
        </div>
        <div className="w-1/2  pb-2">
          <input
            type="file"
            {...register("thumbnail")}
            className="h-1/5"
            onChange={handleFileChange}
          />
          <div className="w-full h-4/5 bg-slate-200 flex justify-center items-center px-4 rounded-md overflow-hidden relative">
            {thumbnail ? (
              thumbnail.map((thumbnail, index) => {
                const previewThumbnail = URL.createObjectURL(thumbnail);
                return (
                  <Image
                    key={index}
                    src={previewThumbnail}
                    alt={"demo hình ảnh"}
                    width={200}
                    height={200}
                    className=" object-fill"
                  />
                );
              })
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-16 h-16"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                />
              </svg>
            )}
          </div>
        </div>
      </div>
      {/* <ReactQuill
        onChange={handleContentChange}
        value={content}
        modules={modules}
        formats={formats}
      /> */}
      <TextEditor handleContentChange={handleContentChange} />
      <Button
        variant="contained"
        type="submit"
        className="w-full mt-2 bg-slate-500 text-black"
      >
        Create Blog
      </Button>
    </form>
  );
}
export default memo(CreateBlog);
