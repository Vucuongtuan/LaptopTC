"use client";
import React, { useCallback } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useRouter, useSearchParams } from "next/navigation";
export default function PaginationHoaDon({
  totalPages,
}: {
  totalPages: number;
}) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    router.push(
      "/admin/don-hang?" + createQueryString("page", value.toString())
    );
  };
  return (
    <Stack spacing={2}>
      <Pagination count={totalPages} onChange={handleChange} />
    </Stack>
  );
}
