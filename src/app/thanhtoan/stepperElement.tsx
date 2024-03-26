"use client";
import React from "react";
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

const steps = [
  "Giỏ hàng",
  "Thông tin đặt hàng",
  "Phương thức thanh toán",
  "Hoàn thành",
];
export default function StepperElement() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState<{
    [k: number]: boolean;
  }>({});
  const dispatch = useDispatch();
  const cartData = useSelector((state: any) => state.checkCartLocal.arrayCart);
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
    setActiveStep(step);
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
                  <div
                    role="list"
                    className={`my-1 px-4 rounded-md shadow-md h-[300px] divide-y divide-gray-200 ${
                      cartData.length >= 3 ? "overflow-y-scroll" : ""
                    }`}
                  >
                    <p className="flex">
                      <div className="w-2/4 px-2">
                        <label htmlFor="Tên khách hàng">
                          Tên khách hàng :{" "}
                        </label>
                        <Input type="text" />
                      </div>
                      <div className="w-2/4 px-2">
                        <label htmlFor="Số điện thoại">Số điện thoại : </label>
                        <Input type="text" />
                      </div>
                    </p>
                  </div>
                  <div className="border-t  w-full items-center  h-[100px] shadow-lg border-gray-200 px-4 py-6 sm:px-6">
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
    } else if (activeStep === 2) {
      return <h1>2</h1>;
    } else if (activeStep === 3) {
      return <h1>3</h1>;
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
      <div>
        <React.Fragment>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={handleNext} sx={{ mr: 1 }}>
              Next
            </Button>
            {activeStep !== steps.length &&
              (completed[activeStep] ? (
                <>
                  <Typography
                    variant="caption"
                    sx={{ display: "inline-block" }}
                  >
                    Step {activeStep + 1} already completed
                  </Typography>
                </>
              ) : (
                <Button onClick={handleComplete}>
                  {completedSteps() === totalSteps() - 1
                    ? "Finish"
                    : "Complete Step"}
                </Button>
              ))}
          </Box>
        </React.Fragment>
        {layoutStep()}
      </div>
    </Box>
  );
}
