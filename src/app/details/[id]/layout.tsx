import { getAllData } from "@/api/product/index.api";
import BreadcrumdTheme from "@/components/breadcrumbTheme";
import { Container } from "@mui/material";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Suspense } from "react";
import { array } from "zod";

const inter = Inter({ subsets: ["latin"] });

export default async function DetailsLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  const { data } = await getAllData(params.id);

  return (
    <Suspense fallback={<>asd</>}>
      <div className="bg-[#f2f2f2]">
        <Container>
          <BreadcrumdTheme nameb={data[0]?.name} />
          {children}
          <section className=" mt-2  flex flex-row  md:flex-col-reverse sm:flex-col-reverse">
            <div className="w-[60%] h-full">Post</div>
            <div className="bg-white w-[38%] p-2 md:w-full sm:w-full">
              <h2 className="text-xl font-semibold mb-2">Thông tin kỹ thuật</h2>
              <table className="table table-zebra border-1 border ">
                {data &&
                  data?.map((item: any) => {
                    return (
                      <tbody key={item._id}>
                        {item?.details && item?.details.screen && (
                          <tr>
                            <td>Màn hình</td>
                            <td>{item?.details.screen}</td>
                          </tr>
                        )}
                        {item?.details && item?.details.cpu && (
                          <tr>
                            <td>CPU</td>
                            <td>{item?.details.cpu}</td>
                          </tr>
                        )}
                        {item?.details && item?.details.ram && (
                          <tr>
                            <td>Ram</td>
                            <td>{item?.details.ram}</td>
                          </tr>
                        )}
                        {item?.details && item?.details.hard_drive && (
                          <tr>
                            <td>Ổ Cứng</td>
                            <td>{item?.details.hard_drive}</td>
                          </tr>
                        )}
                        {item?.details && item?.details.card_graphics && (
                          <tr>
                            <td>Card</td>
                            <td>{item?.details.card_graphics}</td>
                          </tr>
                        )}
                        <tr>
                          <td>Cổng Kết Nối</td>
                          <td>
                            {item?.details &&
                              item?.details.connector.map(
                                (conn: string, index: number) => (
                                  <li key={index}>{conn}</li>
                                )
                              )}
                          </td>
                        </tr>
                        {item?.details && item?.details.system && (
                          <tr>
                            <td>Hệ điều hành</td>
                            <td>{item?.details.system}</td>
                          </tr>
                        )}
                        {item?.details && item?.details.size && (
                          <tr>
                            <td>Trọng lượng</td>
                            <td>{item?.details.size}</td>
                          </tr>
                        )}

                        {item?.details &&
                        Array.isArray(item?.details.weight) ? (
                          <tr>
                            <td>Kích thước</td>
                            <td>
                              {item?.details.weight.map(
                                (item: string, index: number) => (
                                  <li key={index}>{item}</li>
                                )
                              )}
                            </td>
                          </tr>
                        ) : (
                          <tr>
                            <td>Kích thước</td>
                            <td>{item?.details && item?.details.weight}</td>
                          </tr>
                        )}
                        <tr>
                          <td>pin</td>
                          <td>{item?.details && item?.details.pin}</td>
                        </tr>
                        <tr>
                          <td>Wifi & Bluetooth</td>
                          <td>
                            {item?.details && item?.details.wifi_bluetooth}
                          </td>
                        </tr>
                        <tr>
                          <td>Cammera</td>
                          <td>{item?.details && item?.details.cam}</td>
                        </tr>
                        <tr>
                          <td>Hãng</td>
                          <td>{item?.details && item?.details.brands}</td>
                        </tr>
                        <tr>
                          <td>Âm thanh</td>
                          <td>{item?.details && item?.details.audio}</td>
                        </tr>
                      </tbody>
                    );
                  })}
              </table>
            </div>{" "}
          </section>
          <hr />
          <div className="comment">comment</div>
        </Container>
      </div>
    </Suspense>
  );
}
