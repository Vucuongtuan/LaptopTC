"use client";
import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";

export default function BreadcrumdTheme({ nameb }: { nameb?: string }) {
  const [pathName, setPathName] = React.useState<string>("");
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

  return (
    <Breadcrumb className="py-3 ">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          {nameb ? (
            <span>{nameb}</span>
          ) : (
            <BreadcrumbLink href={`/product/` + pathName}>
              <span>{pathName}</span>
            </BreadcrumbLink>
          )}
        </BreadcrumbItem>
        {/* <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem> */}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
