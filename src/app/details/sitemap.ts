import { MetadataRoute } from "next";
// import { BASE_URL } from "@/app/lib/constants";
import { getAllData } from "@/api/product/index.api";
import http from "@/utils/axios";

export default async function sitemap({
  id,
}: {
  id: number;
}): Promise<MetadataRoute.Sitemap> {
  const products = await getAllData();
  return products.map((product: any) => ({
    url: `${process.env.BASE_URL_SERVER}/product/${product._id}`,
    lastModified: product.create_date,
  }));
}
