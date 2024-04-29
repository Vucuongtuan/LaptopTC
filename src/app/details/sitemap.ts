import { MetadataRoute } from "next";
// import { BASE_URL } from "@/app/lib/constants";
import { getAllData } from "@/api/product/index.api";
import http from "@/utils/axios";

export async function generateSitemaps() {
  return [{ id: 0 }, { id: 1 }, { id: 2 }, { id: 3 }];
}

export default async function sitemap({
  id,
}: {
  id: number;
}): Promise<MetadataRoute.Sitemap> {
  const start = id * 50000;
  const end = start + 50000;
  const products = await getAllData();
  return products.map((product: any) => ({
    url: `${http}/product/${product._id}`,
    lastModified: product.create_date,
  }));
}
