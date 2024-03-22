"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useController, useForm } from "react-hook-form";

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
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { getOTP } from "@/api/product/index.api";
import { SignupAccount } from "@/api/user/index.api";
const formSignupSchema = z
  .object({
    email: z.string().email({ message: "Địa chỉ email không hợp lệ" }),
    password: z
      .string()
      .min(3, { message: "Mật khẩu phải có ít nhất 3 ký tự" }),
    confirmPassword: z
      .string()
      .min(3, { message: "Mật khẩu phải có ít nhất 3 ký tự" }),
    otp: z.string(),
    name: z.string(),
    address: z.string(),
    sdt: z.string().min(10, { message: "Số điện thoại không hợp lệ" }),
  })
  .strict()
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "Mật khẩu không khớp",
        path: ["confirmPassword"],
      });
    }
  });
export default function Resgiter() {
  const { toast } = useToast();
  const [messageToken, setMessageToken] = React.useState<string>("");

  const form = useForm({
    resolver: zodResolver(formSignupSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      otp: "",
      name: "",
      address: "",
      sdt: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSignupSchema>) => {
    try {
      const dataform = {
        name: values.name,
        email: values.email,
        password: values.password,
        otp: values.otp,
        phone: values.sdt,
        address: values.address,
      };
      const result = await SignupAccount(dataform);
      toast({
        title: `${result} :${values.email} `,
        description: Date.now(),
      });
    } catch (error) {
      toast({
        title: `Đăng ký thất bại !!! (${error})`,
        description: Date.now(),
        variant: "destructive",
      });
    }
  };
  const handleGetOTP = async () => {
    const { email } = form.getValues();
    const res = await getOTP(email);
    setMessageToken(res.data.message);
  };
  const otpField = useController({
    name: "otp",
    control: form.control,
    defaultValue: "",
  });
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-2 text-left sm:space-y-0"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="text-left text-2xl">
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="sdt"
          render={({ field }) => (
            <FormItem className="text-left text-2xl">
              <FormLabel>Số điện thoại</FormLabel>
              <FormControl>
                <Input placeholder="Số điện thoại" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
          name="address"
          render={({ field }) => (
            <FormItem className="text-left text-2xl">
              <FormLabel>Địa chỉ</FormLabel>
              <FormControl>
                <Input placeholder="Địa chỉ" {...field} />
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
                <Input placeholder="Password" type="password" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem className="text-left text-2xl">
              <FormLabel>Nhập lại mật khẩu</FormLabel>
              <FormControl>
                <Input
                  placeholder="Nhập lại mật khẩu"
                  type="password"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <label className="text-left ">Mã OTP</label>
        <div className=" flex">
          <InputOTP
            maxLength={6}
            onChange={(value: any) => otpField.field.onChange(value)}
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
          <Button type="button" onClick={handleGetOTP}>
            Lấy OTP
          </Button>
        </div>
        {messageToken ? (
          <p>
            <b>{messageToken}</b>
          </p>
        ) : null}

        <Button type="submit" className="mt-4">
          Đăng ký
        </Button>
      </form>
    </Form>
  );
}
