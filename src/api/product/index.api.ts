import http from "@/utils/axios";
import all from "../../assets/image/all.jpg";
declare module "axios" {
  interface AxiosRequestConfig {
    next?: {
      revalidate: number;
    };
  }
}
export const getDataBanner = async () => {
  let res = await http.get(`/banner/`, {
    next: { revalidate: 1000 },
  });

  return res.data;
};
export const getDataTrend = async () => {
  let res = await http.get("/all-product/");
  return res.data;
};
export const getDataLaptop = async (limit: number) => {
  let res = await http.get(`/product/laptop?limit=${limit || 10}`);
  return res.data;
};
export const getDataMouse = async (limit: number) => {
  let res = await http.get(`/product/mouse?limit=${limit || 10}`);
  return res.data;
};
export const getDataKeyboard = async (limit: number) => {
  let res = await http.get(`/product/keyboard?limit=${limit || 10}`);
  return res.data;
};
export const getDataToBrands = async (
  id?: string,
  name?: string,
  // min?: string,
  // max?: string,
  limit?: number,
  page?: number
) => {
  let namePage: string = "";
  switch (name) {
    case "laptop":
      namePage = "laptop";
      break;
    case "chuot":
      namePage = "mouse";
      break;
    case "ban-phim":
      namePage = "keyboard";
      break;

    default:
      namePage = "";
      break;
  }

  let url = `/product/${namePage}`;
  if (id !== "") {
    url += `/brand/?id_brand=${id}`;
  }

  if (limit !== undefined) {
    url += `&limit=${limit}`;
  }

  if (page !== undefined) {
    url += `&page=${page}`;
  }
  // if (min !== undefined || max !== undefined) {
  //   url += `/price?min=${min}&max=${max}`;
  // }
  const res = await http.get(url);
  return res.data;
};
export const getBrand = async (name: string | unknown) => {
  let newName;
  if (name === "laptop") {
    newName = "Laptop";
  } else if (name === "ban-phim") {
    newName = "Bàn phím";
  } else if (name === "chuot") {
    newName = "Chuột";
  }
  const { data } = await http.post(`/brands/type`, { type: newName });
  data.unshift({
    _id: "all1",
    name: "Tất cả",
    description: "Tất cả",
    type: "Tất cả",
    thumbnail: all,
  });
  return data;
};
export const getAllData = async (id: string) => {
  const query = `/all-product?id=${id}`;
  let url;
  if (!query) {
    url = "/all-product";
  } else {
    url = query;
  }
  let res = await http.get(url);
  return res.data;
};
export const getOTP = async (email: string) => {
  const res = await http.post(`/account/send-otp`, { email: email });
  return res;
};
