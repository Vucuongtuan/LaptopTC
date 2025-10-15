import { GetIdAll } from "@/api/user/index.api";
import { MetadataRoute } from "next";

const siteMap = [
  {
    url: "https://laptop-tc-rho.vercel.app/",
    lastModified: new Date(),
    changeFrequency: "yearly",
    priority: 1,
  },
  {
    url: "https://laptop-tc-rho.vercel.app/product/laptop",
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    url: "https://laptop-tc-rho.vercel.app/product/chuot",
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  },
  {
    url: "https://laptop-tc-rho.vercel.app/product/banphim",
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  },
];

export default function sitemap(): MetadataRoute.Sitemap {
  //   const res = await GetIdAll();
  //   const dynamisite = res?.map((product: any) => ({
  //     url: `https://laptop-tc-rho.vercel.app/details/${product._id}`,
  //     lastModified: product.date,
  //     priority: 0.5,
  //   }));
  return [
    {
      url: "https://laptop-tc-rho.vercel.app/",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: "https://laptop-tc-rho.vercel.app/product/laptop",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://laptop-tc-rho.vercel.app/product/chuot",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: "https://laptop-tc-rho.vercel.app/product/banphim",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];
}
