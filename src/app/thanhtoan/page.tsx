"use client";
import BreadcrumdTheme from "@/components/breadcrumbTheme";
import { Container } from "@mui/material";
import StepperElement from "./stepperElement";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
const ThanhToan = () => {
  const tokenCheck = Cookies.get("userToken");
  const router = useRouter();
  if (!tokenCheck) {
    router.push("/checkLogin");
  }
  return (
    <main className="h-[560px] ">
      <Container>
        <BreadcrumdTheme nameb={"thanh toán"} />
        <section className="h-full w-full relative">
          <div className="">
            <StepperElement />
          </div>
        </section>
      </Container>
    </main>
  );
};

export default ThanhToan;
