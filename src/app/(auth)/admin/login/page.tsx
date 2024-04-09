import React from "react";
import AdminLoginForm from "./formLogin";

export default function LoginAdmin() {
  return (
    <main className="bg-[#ececec]">
      <section className=" absolute inset-0 flex mt-[130px] sm:mt-[100px] justify-center">
        <AdminLoginForm />
      </section>
    </main>
  );
}
