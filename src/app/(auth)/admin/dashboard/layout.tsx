"use client";

import SidebarAdmin from "@/components/sideBarADmin";
import { useState } from "react";

export default function AdminDashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  return (
    <div className="m-0  flex justify-end w-full font-sans text-base antialiased font-normal leading-default bg-gray-50 text-slate-500">
      <SidebarAdmin sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className=" w-[79%] my-2 px-1">{children}</div>
    </div>
  );
}
