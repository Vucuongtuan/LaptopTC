"use client";
import { Pagination, PaginationItem } from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
export default function PaginationBlog({
  totalPage,
  query,
}: {
  totalPage: number;
  query: any;
}) {
  const router = useRouter();
  const handleChangePageBlog = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    router.push("/blog?page=" + value);
  };
  return <Pagination count={10} page={query} onChange={handleChangePageBlog} />;
}
