"use client";
import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import { removeItemFromCart } from "@/lib/features/checkCartLocal";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { set, useForm } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
import Cookies from "js-cookie";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { AddToCart } from "@/api/user/index.api";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { CircularProgress } from "@mui/material";
import { Terminal } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const steps = [
  "Giỏ hàng",
  "Thông tin đặt hàng",
  "Phương thức thanh toán",
  "Hoàn thành",
];
const formSchema = z.object({
  email: z
    .string()
    .email({ message: "Email không hợp lệ" })
    .max(50, { message: "Tối đa 50 ký tự" })
    .refine((value) => /^[a-zA-Z0-9@._-]*$/.test(value), {
      message:
        "Chỉ chấp nhận ký tự không dấu không khoảng trắng và các ký tự đặc biệt của email",
    }),
  name: z.string().min(3).max(20, { message: "Tên không quá 20 ký tự" }),
  phone: z
    .string()
    .min(8)
    .max(100, { message: "Số điện thoại không quá 13 ký tự" }),
  address: z
    .string()
    .min(3)
    .max(13, { message: "địa chỉ không quá 100 ký tự" }),
});
interface FormValues {
  email: string;
  name: string;
  phone: string;
  address: string;
}

export default function StepperElement() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState<{
    [k: number]: boolean;
  }>({});
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [isError, setIsError] = React.useState<boolean>(false);
  const [dataValue, setDataValue] = React.useState<FormValues>();
  const dispatch = useDispatch();
  const cartData = useSelector((state: any) => state.checkCartLocal.arrayCart);
  const router = useRouter();
  useEffect(() => {
    const tokenCheck = Cookies.get("userToken");
    if (!tokenCheck) {
      router.push("/checkLogin");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      name: "",
      phone: "",
      address: "",
    },
  });
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    handleComplete();
    setDataValue(values);
  };

  const handleAddCart = async () => {
    setIsLoading(true);
    const userId =
      (typeof window !== "undefined" && localStorage.getItem("userID")) ?? "";
    const subTotal = cartData.reduce(
      (accumulator: any, product: any) => {
        if (product && typeof product.total === "number") {
          accumulator.acc += product.total;
        }
        return accumulator;
      },
      { acc: 0 }
    );

    const stringSubTotal = subTotal.acc.toString();
    const data = {
      userId: userId,
      name: dataValue?.name,
      email: dataValue?.email,
      address: dataValue?.address,
      phone: dataValue?.phone,
      total: stringSubTotal,
      listProduct: cartData,
    } as any;

    try {
      await AddToCart(data);

      setIsLoading(false);
      setIsError(false);
      handleComplete();
    } catch (err) {
      setIsLoading(false);
      setIsError(true);
      handleComplete();
    }
  };
  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (label: string, step: number) => () => {
    if (step === 0) {
      setActiveStep(step);
    } else {
      if (completed[step - 1]) {
        setActiveStep(step);
      }
    }
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };
  const handleRemoveItemCart = (id: string) => {
    dispatch(removeItemFromCart(id));
  };
  const subTotal = cartData.reduce(
    (accumulator: any, product: any) => {
      if (product && typeof product.total === "number") {
        accumulator.acc += product.total;
      }
      return accumulator;
    },
    { acc: 0 }
  );

  const stringSubTotal = subTotal.acc.toString();
  const layoutStep = () => {
    if (activeStep === 1) {
      return (
        <section>
          <h2 className="text-2xl font-semibold text-[#1b1b1bc9]">
            Thông tin đặt hàng
          </h2>
          <div className="mt-8">
            <div className="flow-root">
              {cartData.length > 0 ? (
                <>
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="space-y-2"
                    >
                      <div className=" flex">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem className="text-left text-2xl w-2/4 px-2">
                              <FormLabel>Họ và tên</FormLabel>
                              <FormControl>
                                <Input placeholder="Họ và tên" {...field} />
                              </FormControl>

                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem className="text-left text-2xl w-2/4 px-2">
                              <FormLabel>Số điện thoại</FormLabel>
                              <FormControl>
                                <Input placeholder="Số điện thoại" {...field} />
                              </FormControl>

                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem className="text-left text-2xl ">
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
                      <Button
                        type="submit"
                        color="success"
                        className="float-right h-14 rounded-sm font-medium bg-black hover:bg-slate-800 text-white"
                      >
                        Chuyển tiếp
                      </Button>
                    </form>
                  </Form>
                </>
              ) : (
                <div className="text-center py-6">
                  <span>Không có sản phẩm nào trong giỏ hàng </span>
                </div>
              )}
            </div>
          </div>
        </section>
      );
    } else if (activeStep === 2) {
      return (
        <section>
          <h2 className="text-2xl font-semibold text-[#1b1b1bc9] mb-8">
            Phương thức thanh toán
          </h2>
          <HoverCard>
            <HoverCardTrigger>
              <div className="flex items-center">
                <Checkbox id="terms1" disabled />

                <div className="pl-2 grid gap-1.5 leading-none">
                  <label
                    htmlFor="terms1"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Thanh toán Online
                  </label>
                  <p className="text-sm text-muted-foreground">
                    Thanh toán bằng phương thức banking
                  </p>
                </div>
              </div>
            </HoverCardTrigger>
            <HoverCardContent>
              Chưa áp dụng phương thức thanh toán Online vui lòng thử lại sau
            </HoverCardContent>
          </HoverCard>
          <div className="flex items-center">
            <Checkbox id="terms1" />

            <div className="pl-2 grid gap-1.5 leading-none mt-4">
              <label
                htmlFor="terms1"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Thanh toán trực tiếp
              </label>
              <p className="text-sm text-muted-foreground">
                Thanh toán khi nhân viên giao đến nhà bạn
              </p>
            </div>
          </div>
          <Button
            color="success"
            className="float-right h-14 rounded-sm font-medium bg-black hover:bg-slate-800 text-white"
            onClick={handleAddCart}
          >
            Chuyển tiếp
          </Button>
        </section>
      );
    } else if (activeStep === 3) {
      if (isError === true) {
        return (
          <div className="flex flex-col justify-center items-center text-center  h-[300px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-16 h-16 text-red-400"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
              />
            </svg>

            <span className="text-xl text-red-400">Đặt hàng thất bại</span>
            <p className="text-lg">
              Vui lòng liên hệ với chúng tôi để giải quyết lỗi qua hotline hoặc
              email{" "}
              <Link href="mailto:vucuongtuan03@gmail.com">
                <b>
                  <i>vucuongtuan03@gmail.com</i>
                </b>
              </Link>
            </p>
          </div>
        );
      }
      return (
        <div className="flex flex-col justify-center items-center text-2xl  h-[300px]">
          {isLoading === true ? (
            <>
              <CircularProgress color="success" />
              <span>Đang xử lý ...</span>
            </>
          ) : (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-16 h-16 text-green-500"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m4.5 12.75 6 6 9-13.5"
                />
              </svg>
              <span>Đặt hàng thành công</span>
            </>
          )}
        </div>
      );
    }
    return (
      <section>
        <div className="mt-8">
          <div className="flow-root">
            {cartData.length > 0 ? (
              <>
                <div
                  role="list"
                  className={`my-1 px-4 rounded-md shadow-md h-[300px] divide-y divide-gray-200 ${
                    cartData.length >= 3 ? "overflow-y-scroll" : ""
                  }`}
                >
                  {cartData.map((product: any) => {
                    const price = product.total.toString();

                    return (
                      <div key={product._id} className="flex py-6">
                        <div className="h-24 w-24 relative flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                          <Image
                            height={200}
                            width={200}
                            src={product.thumbnail}
                            alt={product.description}
                            className="h-full w-full object-contain object-center"
                          />
                        </div>

                        <div className="ml-4 flex flex-1 flex-col">
                          <div>
                            <div className="flex justify-between text-base font-medium text-gray-900">
                              <h3>{product.name}</h3>
                            </div>
                            <p className="mt-1 text-sm text-gray-500">
                              {product.color}
                            </p>
                          </div>
                          <div className="flex flex-1 items-end justify-between text-sm">
                            <p className="text-gray-500">
                              Giá {price.replace(/\B(?=(\d{3})+(?!\d))/g, ".")}đ
                            </p>

                            <div className="flex">
                              <button
                                type="button"
                                className="font-medium text-indigo-600 hover:text-indigo-500"
                                onClick={() =>
                                  handleRemoveItemCart(product._id)
                                }
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="border-t  w-full  flex justify-between items-center  h-[100px] shadow-lg border-gray-200 px-4 py-6 sm:px-6">
                  <div className="float-left ">
                    <div className=" text-base font-medium text-gray-900 ">
                      <p>Tổng giá Sản phẩm</p>
                    </div>
                    <p className="mt-0.5 text-xl text-gray-500 float-left ">
                      {stringSubTotal.replace(/\B(?=(\d{3})+(?!\d))/g, ".")} đ
                    </p>
                  </div>
                  <Button
                    color="success"
                    className="float-right h-14 rounded-sm font-medium bg-black hover:bg-slate-800 text-white"
                    onClick={handleComplete}
                  >
                    Chuyển tiếp
                  </Button>
                </div>
              </>
            ) : (
              <div className="text-center py-6">
                <span>Không có sản phẩm nào trong giỏ hàng </span>
              </div>
            )}
          </div>
        </div>
      </section>
    );
  };
  return (
    <Box sx={{ width: "70%", margin: "auto" }}>
      <Stepper nonLinear activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step key={label} completed={completed[index]}>
            <StepButton color="inherit" onClick={handleStep(label, index)}>
              {label}
            </StepButton>
          </Step>
        ))}
      </Stepper>
      <div>{layoutStep()}</div>
    </Box>
  );
}
