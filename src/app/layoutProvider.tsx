"use client";
import React, { ReactNode, useEffect, useState } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { usePathname } from "next/navigation";
export default function LayoutProvider({ children }: { children: ReactNode }) {
  const pathName = usePathname();
  const isAdminPage = pathName.startsWith("/admin");

  if (isAdminPage) {
    return <>{children}</>;
  } else {
    return (
      <>
        <Header />
        {children}
        <Footer />
      </>
    );
  }
}
