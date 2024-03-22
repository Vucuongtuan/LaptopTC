"use client";
import BreadcrumdTheme from "@/components/breadcrumbTheme";
import { Container } from "@mui/material";
import { SideBar } from "./sideBar";
import { getBrand, getDataToBrands } from "@/api/product/index.api";
import { IBrand } from "@/types/data/index.types";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

export default function ProductLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [pathName, setPathName] = React.useState<string>("");
  const [brands, setBrands] = useState<IBrand[]>([]);
  const pathname = usePathname();
  React.useEffect(() => {
    if (pathname === "/product/laptop") {
      setPathName("laptop");
    } else if (pathname === "/product/chuot") {
      setPathName("chuot");
    } else if (pathname === "/product/ban-phim") {
      setPathName("ban-phim");
    } else {
      return setPathName("/");
    }
  }, [pathname]);
  const { data } = useQuery({
    queryKey: [],
    queryFn: () => getBrand(pathName),
    enabled: !!pathName,
  });

  return (
    <Container>
      <BreadcrumdTheme />
      <div className="h-auto w-full flex md:flex-col sm:flex-col  mt-2 ">
        <SideBar brand={data} params={pathName} />
        {children}
      </div>
    </Container>
  );
}
