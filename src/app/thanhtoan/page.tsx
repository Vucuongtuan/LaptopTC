import BreadcrumdTheme from "@/components/breadcrumbTheme";
import { Container } from "@mui/material";
import StepperElement from "./stepperElement";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Thanh toán | Laptop_TC",
  description:
    "Laptop_TC | Chuyên cung cấp những sản phẩm laptop gaming , văn phòng",
};

const ThanhToan = () => {
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
