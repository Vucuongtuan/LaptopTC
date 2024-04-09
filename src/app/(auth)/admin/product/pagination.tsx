"use client";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useRouter } from "next/navigation";

import React from "react";

export default function PaginationProduct({ data }: { data: number }) {
  const navigation = useRouter();
  const handlePagination = (page: number) => {
    if (page !== 1) navigation.push(`/admin/product?page=${page}`);
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" />
        </PaginationItem>
        <PaginationItem className={`cursor-pointer `}>
          {Array.from({ length: data }, (_, index) => (
            <PaginationLink
              key={index}
              onClick={() => handlePagination(index + 1)}
            >
              {" "}
              {index + 1}
            </PaginationLink>
          ))}
        </PaginationItem>
        {/* {data?.map((number: number, index: number) => (
      <PaginationItem key={index}>{number}</PaginationItem>
    ))} */}

        <PaginationItem></PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
