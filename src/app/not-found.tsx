import { Container } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="w-full h-[500px]">
      <Container>
        <section className="flex justify-center items-center">
          <div className="py-12 px-12">
            <Image
              src="/notfound.svg"
              alt="404 Not Found"
              width={300}
              height={300}
            />
            <h2>Trang không tồn tại</h2>
            <p>Could not find requested resource</p>
            <Link href="/">Về trang chủ</Link>
          </div>
        </section>
      </Container>
    </main>
  );
}
