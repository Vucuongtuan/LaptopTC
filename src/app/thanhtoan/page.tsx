import BreadcrumdTheme from "@/components/breadcrumbTheme";
import { Container } from "@mui/material";
import StepperElement from "./stepperElement";
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
