import React from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";
import { Container } from "@mui/material";

export default function Checklogin() {
  return (
    <section className="w-full h-[500px]">
      <Container>
        <Alert>
          <Terminal className="h-4 w-4" />
          <AlertTitle>Bạn chưa đăng nhập </AlertTitle>
          <AlertDescription>
            Vui lòng đăng nhập để trải nghiệm mua hàng
          </AlertDescription>
        </Alert>
      </Container>
    </section>
  );
}
