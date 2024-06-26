import http from "@/utils/axios";
import all from "../../assets/image/all.jpg";
import axios from "axios";
import { IApiBanner, IComment } from "@/types/data/index.types";
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
export const getDataLaptop = async (limit?: number, page?: number) => {
  let url = "/product/laptop";
  if (limit) url += "?limit=" + limit;
  else if (limit && page) url += `?page=${page}&limit=${limit}`;
  let res = await http.get(url);
  // let res = await axios.get("/product/laptop");
  return res.data;
};
export const getDataMouse = async (limit?: number, page?: number) => {
  let url = "/product/mouse";
  if (limit) url += "?limit=" + limit;
  else if (limit && page) url += `?page=${page}&limit=${limit}`;
  let res = await http.get(url);
  return res.data;
};
export const getDataKeyboard = async (limit?: number, page?: number) => {
  let url = "/product/keyboard";
  if (limit) url += "?limit=" + limit;
  else if (limit && page) url += `?page=${page}&limit=${limit}`;
  let res = await http.get(url);
  return res.data;
};
export const getBrandAll = async () => {
  const res = await http.get(`/brands`);
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
  } else if (name === "banphim") {
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
export const getAllData = async (page?: string) => {
  let url = "/all-product";
  if (page) {
    url = `/all-product?page=${page}`;
  }
  let res = await http.get(url);
  return res.data;
};
export const getAllDataByID = async (id?: string) => {
  const query = `/all-product?id=${id}`;
  let url;
  if (!id) {
    url = "/all-product";
  } else {
    url = query;
  }
  let res = await http.get(url);
  return res.data;
};
export const getRevenue = async () => {
  const res = await http.get(`/all-product/total-revenue`);
  return res;
};
export const getOTP = async (email: string) => {
  const res = await http.post(`/account/send-otp`, { email: email });
  return res;
};
export const postThumbnails = async (thumbnail: any) => {
  const formData = new FormData();
  thumbnail.forEach((thumbnail: any, index: number) => {
    formData.append("image", thumbnail);
  });
  const res = await http.post(`/upload`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res;
};
export const postProductLaptop = async (data: any) => {
  const formData = new FormData();
  formData.append("name", data.name);
  formData.append("brands", data.brands);
  formData.append("total", data.total);
  formData.append("description", data.description);
  formData.append("totalPurchases", data.totalPurchases);
  formData.append("discount_percent", data.discount_percent);
  formData.append("inventory", data.inventory);
  formData.append("details", JSON.stringify(data.details));
  formData.append("product_brand", data.product_brand);
  formData.append("product_category", data.product_category);
  formData.append("product_content", data.product_content);
  data.thumbnails.forEach((thumbnail: any, index: number) => {
    formData.append("thumbnail", thumbnail);
  });
  const res = await axios.post(`/product/laptop`, formData);
  return res;
};
export const postProductMouse = async (data: any) => {
  const formData = new FormData();
  formData.append("name", data.name);
  formData.append("brands", data.brands);
  formData.append("total", data.total);
  formData.append("description", data.description);
  formData.append("totalPurchases", data.totalPurchases || "0");
  formData.append("discount_percent", data.discount_percent);
  formData.append("inventory", data.inventory);
  formData.append("details", JSON.stringify(data.details));
  formData.append("product_brand", data.product_brand);
  formData.append("product_category", data.product_category);
  // formData.append("product_content", data.product_content);
  data.thumbnails.forEach((thumbnail: any, index: number) => {
    formData.append("thumbnail", thumbnail);
  });
  const res = await http.post(`/product/mouse`, formData);
  return res;
};
export const postBanner = async (data: any) => {
  const formBanner = new FormData();
  formBanner.append("description", data.description);
  formBanner.append("thumbnail", data.thumbnail);
  formBanner.append("id", data.id);

  let res = await http.post(`/banner`, formBanner);
  return res;
};

export const postKeyboard = async (data: any) => {
  const num = "0" as string;
  const formKeyboard = new FormData();
  formKeyboard.append("description", data.description);
  formKeyboard.append("name", data.name);
  formKeyboard.append("thumbnail", data.thumbnail);
  formKeyboard.append("total", data.total);
  formKeyboard.append("layout", data.layout);
  formKeyboard.append("switch_key", data.switch_key);
  formKeyboard.append("pin", data.pin);
  formKeyboard.append("personal", data.personal);
  formKeyboard.append("foam", data.foam);
  formKeyboard.append("weight", data.weight);
  formKeyboard.append("size", data.size);
  formKeyboard.append("connector", data.connector);
  formKeyboard.append("configuration", data.configuration);
  formKeyboard.append("keycap", data.keycap);
  formKeyboard.append("support", data.support);
  formKeyboard.append("totalPurchases", num);
  formKeyboard.append("accessory", data.accessory);
  formKeyboard.append("software", data.software);
  formKeyboard.append("compatibility", data.compatibility);
  formKeyboard.append("discount_percent", data.discount_percent);
  formKeyboard.append("inventory", data.inventory);
  formKeyboard.append("product_type_keybourd", data.product_type_keybourd);
  formKeyboard.append("product_brand", data.product_brand);
  formKeyboard.append("brands", data.brands);

  let res = await http.post(`/product/keyboard`, formKeyboard);
  return res;
};
export const getAllPost = async () => {};
export const getMouseType = async () => {
  const res = await http.get(`/product_type/mouse`);
  return res;
};
export const getKeyboardType = async () => {
  const res = await http.get(`/product_type/keyboard`);
  return res;
};
export const deleteBanner = async (id: string) => {
  const res = await http.delete(`/banner/${id}`);
  return res;
};
export const getComment = async (id: string) => {
  const res = await http.post("/comment", {
    idProduct: id,
  });
  return res;
};
export const insertComment = async (data: IComment) => {
  const res = await http.post("/comment/insert", data);
  return res;
};
export const getBlogByIdProduct = async (id: string) => {
  try {
    const res = await http.post(`/blog/product/${id}`);

    return res;
  } catch (error) {
    return "";
  }
};
export const likeComment = async (
  idUser: string | null,
  idComment: string,
  idProduct: string
) => {
  const res = await http.post(`/comment/${idComment}/likes`, {
    userId: idUser,
    idProduct,
  });
  return res;
};
export const replyComment = async (
  idComment: string,
  comment: string,
  name: string,
  idProduct: string,
  idUser?: string | null,
  idAdmin?: string | null
) => {
  if (idAdmin) {
    const res = await http.post(`/comment/${idComment}/reply`, {
      idAdmin: idAdmin,
      idProduct,
      comment,
      name,
    });
    return res;
  }
  const res = await http.post(`/comment/${idComment}/reply`, {
    userId: idUser,
    idProduct,
    comment,
    name,
  });
  return res;
};
export const updateItem = async (id: string, data: any, type: string) => {
  const res = await http.put(`/product/${type}/id?id=${id}`, data);
  return res;
};
export const deleteItem = async (idProduct: string, type: string) => {
  const res = await http.delete(`/product/${type}/id?id=${idProduct}`);
  return res;
};
export const getBlogByName = async (name: string) => {
  try {
    const res = await http.post("/blog/query", {
      name: name,
    });
    return res;
  } catch (err) {
    return err;
  }
};
export const getBlogById = async (id: string) => {
  const res = await http.post(`/blog/${id}`);
  return res;
};
