"use client";

import SidebarAdmin from "@/components/sideBarADmin";
import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { usePathname, useRouter } from "next/navigation";

export default function AdminDashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const auth = useSelector((auth: RootState) => auth.auth.authAdmin);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!auth && pathname !== "/admin/login") {
      setIsLoading(false);
      router.push("/admin/login");
    } else if (auth === true && pathname === "/admin/login") {
      router.push("/admin");
    } else {
      setIsLoading(true);
      setTimeout(() => setIsLoading(false), 500);
    }
  }, [auth, pathname, router]);

  return (
    <>
      {pathname === "/admin/login" ? (
        children
      ) : isLoading ? (
        <div className="flex items-center justify-center h-full w-full bg-gray-500 opacity-75">
          <div className="spinner-border animate-spin"></div>
        </div>
      ) : (
        <div className="m-0 flex justify-end w-full font-sans text-base antialiased font-normal leading-default bg-gray-50 text-slate-500">
          <SidebarAdmin
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
          />
          <div className=" w-[79%] my-2 px-1">{children}</div>
        </div>
      )}
    </>
  );
}
