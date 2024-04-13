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
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import React from "react";

export default function PaginationProduct({ data }: { data: number }) {
  const navigation = useRouter();

  const pathName = usePathname();

  const handlePagination = (page: number) => {
    navigation.push(`${pathName}?page=${page}`);
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
