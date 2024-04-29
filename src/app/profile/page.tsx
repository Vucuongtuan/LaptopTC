import BreadcrumdTheme from "@/components/breadcrumbTheme";
import { Container } from "@mui/material";
import React from "react";
import SideBarProfile from "./sideBar";

export default function ProfileUserPage() {
  return (
    <main className="h-auto min-h-[100vh] bg-[#eff1f5]">
      <Container>
        <BreadcrumdTheme nameb={"profile"} />
        <section className="w-full h-full flex bg-white rounded-md">
          <SideBarProfile />
        </section>
      </Container>
    </main>
  );
}
