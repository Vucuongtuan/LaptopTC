import { MetadataRoute } from "next";
// import { BASE_URL } from "@/app/lib/constants";
import { getAllData } from "@/api/product/index.api";
import http from "@/utils/axios";

export default async function sitemap({
  id,
}: {
  id: number;
}): Promise<MetadataRoute.Sitemap> {
  const { data } = await getAllData();
  return data.map((product: any) => ({
    url: `${process.env.BASE_URL_SERVER}/details/${product._id}`,
    lastModified: product.create_product,
    priority: 0.8,
  }));
}
