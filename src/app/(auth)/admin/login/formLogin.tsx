"use client";
import { LoginAdmin } from "@/api/admin/index.api";
import { toast, useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircularProgress, IconButton } from "@mui/material";
import { headers } from "next/headers";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  email: z.string().email("Email không hợp lệ").min(1, "Email là bắt buộc"),
  password: z.string().min(1, "Password là bắt buộc"),
});

type FormValues = z.infer<typeof schema>;

const AdminLoginForm: React.FC = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setLoading(true);
    const res = await LoginAdmin(data);
    setLoading(false);
    if (res?.response?.status === 500) {
      toast({
        variant: "destructive",
        title: "Đăng nhập thất bại",
        description: "Kiểm tra lại email và password hoặc thử lại sau",
      });
    } else {
      toast({
        title: "Đăng nhập thành công",
        description: `Xin chào , ${res?.username}`,
      });
      setTimeout(() => {
        router.push("/admin");
      }, 3000);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="h-[300px] w-[400px] rounded-lg shadow-lg bg-white"
      noValidate
    >
      <h1 className="text-center text-2xl font-semibold py-2">
        Đăng nhập quản trị
      </h1>

      <div className="h-1/4 px-8 mb-4">
        <label
          htmlFor="email"
          className={`mr-2 mb-2 ${errors.email && "text-red"}`}
        >
          Email :
        </label>
        <input
          type="email"
          id="email"
          {...register("email")}
          className={`w-full  rounded-md px-2 py-2 border-2 border-black${
            errors.email && "border-red-500 border-2"
          }`}
        />
        {errors.email && (
          <span className="text-red-500 text-[0.8rem]">
            {errors.email.message}
          </span>
        )}
      </div>
      <div className="h-1/4  px-8 mb-4">
        <label htmlFor="password" className="mr-2 mb-2">
          Password :
        </label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            {...register("password")}
            className={`w-full  rounded-md px-2 py-2 border-2 border-black${
              errors.password && "border-red-500"
            }`}
          />{" "}
          {showPassword ? (
            <IconButton
              onClick={() => setShowPassword(false)}
              className="absolute top-0 right-0"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>
            </IconButton>
          ) : (
            <IconButton
              onClick={() => setShowPassword(true)}
              className="absolute top-0 right-0"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                />
              </svg>
            </IconButton>
          )}
          {errors.password && (
            <span className="text-red-500 text-[0.8rem]">
              {errors.password.message}
            </span>
          )}
        </div>
      </div>
      <div className="py-2 px-8 flex justify-center items-center">
        <button
          type="submit"
          className={`bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold py-2  rounded w-[100px] h-[40px] ${
            loading ? "cursor-no-drop" : ""
          }`}
          disabled={loading}
        >
          {loading ? (
            <CircularProgress size={20} color="inherit" />
          ) : (
            " Đăng nhập"
          )}
        </button>
      </div>
    </form>
  );
};

export default AdminLoginForm;
