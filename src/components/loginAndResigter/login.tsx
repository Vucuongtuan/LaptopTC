"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";

import { useToast } from "@/components/ui/use-toast";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { Button } from "../ui/button";
import { SigninAccount } from "@/api/user/index.api";

const formSchema = z.object({
  email: z
    .string()
    .email({ message: "Email không hợp lệ" })
    .max(50, { message: "Tối đa 50 ký tự" })
    .refine((value) => /^[a-zA-Z0-9@._-]*$/.test(value), {
      message:
        "Chỉ chấp nhận ký tự không dấu không khoảng trắng và các ký tự đặc biệt của email",
    }),
  password: z
    .string()
    .min(3)
    .max(20, { message: "password không quá 20 ký tự" }),
});
export default function Login() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    await SigninAccount(values.email, values.password).then((res: any) => {
      Cookies.set("userToken", res.token);
      localStorage.setItem(
        "userData",
        JSON.stringify({
          userName: res.username,
          userId: res.userId,
        })
      );
      toast({
        title: "Đăng nhập thành công",
        description: Date.now(),
      });
    });
    setTimeout(() => {
      window.location.reload();
    }, 3000);
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="text-left text-2xl">
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="text-left text-2xl">
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="Password" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Đăng nhập</Button>
      </form>
    </Form>
  );
}
