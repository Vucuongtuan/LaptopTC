import { CircularProgress } from "@mui/material";
import React from "react";

export default function LoadingPage() {
  return (
    <div className="w-full h-auto text-center">
      <div className="m-auto">
        <CircularProgress />
      </div>
      <h3>Đang xử lý ,vui long dợi chút ... 😊</h3>
    </div>
  );
}
