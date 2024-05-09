"use client";
import BreadcrumdTheme from "@/components/breadcrumbTheme";
import { Container } from "@mui/material";
import React, { useEffect, useState } from "react";
import SideBarProfile from "./sideBar";
import { useRouter } from "next/navigation";
import LoadingPage from "@/components/loadingElement";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const id =
      typeof window !== "undefined"
        ? localStorage.getItem("userID") ?? "null"
        : "null";
    if (id !== "null") {
      router.push(`/profile?id=${id}`);
    }
    setLoading(false);
  }, [router]);
  if (loading) {
    return (
      <>
        <LoadingPage />
      </>
    );
  }
  return (
    <main className="h-auto min-h-[100vh] bg-[#eff1f5]">
      <Container>
        <BreadcrumdTheme nameb={"profile"} />
        <section className="w-full h-full flex bg-white rounded-md">
          <SideBarProfile />
          <div className="flex-grow px-2">{children}</div>
        </section>
      </Container>
    </main>
  );
}
