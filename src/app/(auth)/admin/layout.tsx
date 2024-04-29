"use client";

import SidebarAdmin from "@/components/sideBarADmin";
import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { usePathname, useRouter } from "next/navigation";
import { useMediaQuery } from "@mui/material";

export default function AdminDashboardLayout({
  children,
  window,
}: Readonly<{ children: React.ReactNode; window: () => Window }>) {
  const router = useRouter();
  const pathname = usePathname();
  const [closeSidebar, setCloseSidebar] = useState<boolean>(false);
  const auth = useSelector((auth: RootState) => auth.auth.authAdmin);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const isMobile = useMediaQuery("(max-width: 768px)");

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
  if (isMobile) {
    return (
      <div className="w-full py-6 text-center text-xl">
        <span>Trang không hỗ trợ cho thiết bị di động</span>
      </div>
    );
  }
  return (
    <>
      {pathname === "/admin/login" ? (
        children
      ) : isLoading ? (
        <div className="flex items-center justify-center h-full w-full bg-gray-500 opacity-75">
          <div className="spinner-border animate-spin"></div>
        </div>
      ) : (
        <div className="m-0 flex  w-full font-sans  text-base antialiased font-normal leading-default bg-gray-50 text-slate-500">
          <SidebarAdmin
            closeSidebar={closeSidebar}
            setCloseSidebar={setCloseSidebar}
          />
          <div
            className={`grow transition-all duration-500   ${
              closeSidebar ? "ml-0" : "ml-[270px] sm:ml-0"
            }  px-1`}
          >
            {children}
          </div>
        </div>
      )}
    </>
  );
}
