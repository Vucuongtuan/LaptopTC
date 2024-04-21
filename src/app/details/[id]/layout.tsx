import { getAllData, getAllDataByID } from "@/api/product/index.api";
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
  const { data } = await getAllDataByID(params.id);

  return (
    <Suspense fallback={<>asd</>}>
      <div className="bg-[#f2f2f2]">
        <Container>
          <BreadcrumdTheme nameb={data[0]?.name} />
          {children}
          <section className=" mt-2  flex flex-row  md:flex-col-reverse sm:flex-col-reverse">
            <div className="w-[60%] h-full">Post</div>
            <div className="bg-white w-[40%] p-2 md:w-full sm:w-full">
              <h2 className="text-xl font-semibold mb-2">Thông tin kỹ thuật</h2>
              <table className="table table-zebra border-1 border w-full">
                {data &&
                  data?.map((item: any) => {
                    return (
                      <tbody key={item._id} className=" p-1">
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
                        {item?.details && item?.details.connector && (
                          <tr>
                            <td>Cổng Kết Nối</td>
                            <td>
                              {item?.details &&
                                item?.details.connector.map(
                                  (conn: string, index: number) => (
                                    <li key={index}>{conn}</li>
                                  )
                                ) && (
                                  <td>{item?.details.wireless_technology}</td>
                                )}
                            </td>
                          </tr>
                        )}

                        {item?.details && item?.details.system && (
                          <tr>
                            <td>Hệ điều hành</td>
                            <td>{item?.details.system}</td>
                          </tr>
                        )}

                        {item?.details && item?.details?.polling_rate && (
                          <tr>
                            <td>Polling rate</td>
                            <td>{item?.details?.polling_rate}</td>
                          </tr>
                        )}
                        {item?.details && item?.details.size && (
                          <tr>
                            <td>Trọng lượng</td>
                            <td>{item?.details.size}</td>
                          </tr>
                        )}
                        {item?.details && item?.details.similar && (
                          <tr>
                            <td>Similar</td>
                            <td>{item?.details.similar}</td>
                          </tr>
                        )}
                        {item?.details && item?.details.guarantee && (
                          <tr>
                            <td>Bảo hành</td>
                            <td>{item?.details.guarantee}</td>
                          </tr>
                        )}
                        {item?.details && item?.details.battery && (
                          <tr>
                            <td>Thời lượng pin</td>
                            <td>{item?.details.battery}</td>
                          </tr>
                        )}
                        {item?.details && item?.details.max_acceleration && (
                          <tr>
                            <td>Tăng tốc tối đa</td>
                            <td>{item?.details.max_acceleration}</td>
                          </tr>
                        )}
                        {item?.details && item?.details.max_speed && (
                          <tr>
                            <td>Tăng tốc</td>
                            <td>{item?.details.max_speed}</td>
                          </tr>
                        )}
                        {item?.details && item?.details.sensor && (
                          <tr>
                            <td>Cảm biến</td>
                            <td>{item?.details.sensor}</td>
                          </tr>
                        )}
                        {item && item?.brands && (
                          <tr>
                            <td>Hãng</td>
                            <td>{item?.brands}</td>
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
                        {item?.details &&
                          item?.details?.pin &&
                          item?.details?.battery && (
                            <tr>
                              <td>pin</td>
                              <td>
                                {item?.details?.pin || item?.details?.battery}
                              </td>
                            </tr>
                          )}
                        {item?.details && item?.details?.wifi_bluetooth && (
                          <tr>
                            <td>Wifi & Bluetooth</td>
                            <td>
                              {item?.details && item?.details.wifi_bluetooth}
                            </td>
                          </tr>
                        )}
                        {item?.details && item?.details?.cam && (
                          <tr>
                            <td>Cammera</td>
                            <td>{item?.details && item?.details.cam}</td>
                          </tr>
                        )}
                        {item?.details && item?.details?.brands && (
                          <tr>
                            <td>Hãng</td>
                            <td>{item?.brands && item?.details.brands}</td>
                          </tr>
                        )}
                        {item?.details && item?.details?.audio && (
                          <tr>
                            <td>Âm thanh</td>
                            <td>{item?.details && item?.details.audio}</td>
                          </tr>
                        )}
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
