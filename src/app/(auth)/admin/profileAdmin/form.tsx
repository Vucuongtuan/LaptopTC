"use client";
import { getProfileByID, updateProfile } from "@/api/admin/index.api";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
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
import { useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import { CircularProgress } from "@mui/material";

export default function FormProfile() {
  const [idProfile, setidProfile] = useState<string>("");
  const { data, isLoading } = useQuery({
    queryKey: ["/profile"],
    queryFn: () => getProfileByID(idProfile),
  });
  const { toast } = useToast();
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();
  useEffect(() => {
    if (typeof window !== "undefined") {
      const { adminId } = JSON.parse(localStorage.getItem("adminData") ?? "");
      setidProfile(adminId);
    }
  }, []);
  const onSubmit = async (data: any) => {
    const res = await updateProfile({
      id: idProfile,
      email: data.email,
      password: data.password,
      phone: data.phone,
      dateOfBirth: data.dateOfBirth,
      name: data.name,
      gender: data.gender,
      address: data.address,
      position: data.position,
    });
    if (res.status === 200) {
      toast({
        title: "Cập nhật thành công",
      });
      reset();
    } else {
      toast({
        title: "Cập nhật thất bại , vui lòng thử lại sau",
      });
    }
  };
  if (isLoading === true) {
    <div className="p-16">
      <CircularProgress />
    </div>;
  }
  return (
    <>
      <div className="p-16">
        <div className="p-8 bg-white shadow mt-24">
          <div className="grid grid-cols-1 md:grid-cols-3">
            <div className="relative ">
              <div className="w-48 h-48 text-[5rem] bg-indigo-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500">
                {data?.data.name.charAt(0).toLocaleUpperCase()}
              </div>
            </div>
          </div>
          <div className=" mt-32 text-center border-b pb-12">
            <h1 className="text-4xl font-medium text-gray-700">
              {data?.data.name} ({data?.data.position})
            </h1>
            <p className="font-light text-gray-600 mt-3">
              {data?.data.address} | {data?.data.phone} | Birth{" "}
              {data?.data.dateOfBirth}
            </p>
            <div className="grid grid-cols-3 text-center order-last md:order-first mt-20 md:mt-0">
              <div>
                <p className="font-bold text-gray-700 text-xl">
                  {data?.data.email}
                </p>
                <p className="text-gray-400">Email</p>
              </div>
              <div>
                <p className="font-bold text-gray-700 text-xl">
                  {data?.data.create_date}
                </p>
                <p className="text-gray-400">Ngày tạo</p>
              </div>
              <div>
                <p className="font-bold text-gray-700 text-xl">
                  {" "}
                  {data?.data.update_date}
                </p>
                <p className="text-gray-400">Cập nhật gần nhất</p>
              </div>
            </div>
          </div>
          <div className="mt-12 flex flex-col justify-center">
            <AlertDialog>
              <AlertDialogTrigger>Chỉnh sửa</AlertDialogTrigger>
              <AlertDialogContent>
                <form action="" onSubmit={handleSubmit(onSubmit)}>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Form chỉnh sửa thông tín
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      <input
                        type="text"
                        className="mt-1 p-2 w-full border rounded-md"
                        {...register("name", { required: true })}
                        defaultValue={data?.data.name}
                      />
                      <input
                        type="text"
                        className="mt-1 p-2 w-full border rounded-md"
                        {...register("email", { required: true })}
                        defaultValue={data?.data.email}
                      />
                      <input
                        type="text"
                        className="mt-1 p-2 w-full border rounded-md"
                        {...register("password", { required: true })}
                        defaultValue={data?.data.password}
                      />
                      <input
                        type="text"
                        className="mt-1 p-2 w-full border rounded-md"
                        {...register("phone", { required: true })}
                        defaultValue={data?.data.phone}
                      />
                      <input
                        type="text"
                        className="mt-1 p-2 w-full border rounded-md"
                        {...register("dateOfBirth", { required: true })}
                        defaultValue={data?.data.dateOfBirth}
                      />
                      <input
                        type="text"
                        className="mt-1 p-2 w-full border rounded-md"
                        {...register("gender", { required: true })}
                        defaultValue={data?.data.gender}
                      />
                      <input
                        type="text"
                        className="mt-1 p-2 w-full border rounded-md"
                        {...register("address", { required: true })}
                        defaultValue={data?.data.address}
                      />
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction type="submit">
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </form>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </div>
    </>
  );
}
