import http from "@/utils/axios";
import axios from "axios";

interface ILoginAdmin {
  email: string;
  password: string;
}

export const LoginAdmin = async (data: ILoginAdmin) => {
  try {
    const res = await http.post("/admin/login", data);
    return res;
  } catch (error: any) {
    return error;
  }
};
export const checkTokenADmin = async (token: string | undefined) => {
  try {
    if (typeof token === "undefined") {
      return { auth: false };
    }
    const res = await http.post("/token", token);
    return res;
  } catch (error: any) {
    return error;
  }
};
export const getAllBlog = async (page: string) => {
  const res = await http.get(`/blog/all?page=${page || 1}`);
  return res;
};
export const createBlogAPI = async (data: any) => {
  const formBlog = new FormData();
  formBlog.append("description", data.description);
  formBlog.append("thumbnail", data.thumbnail[0]);
  formBlog.append("idAuthor", data.idAuthor);
  formBlog.append("author", data.author);
  formBlog.append("idProduct", data.idProduct);
  formBlog.append("title", data.title);
  formBlog.append("body", data.body);
  const res = await http.post("/blog/create", formBlog);
  return res;
};
export const getProfileByID = async (id: string) => {
  const res = await http.post(`/admin/q?id=${id}`);
  return res;
};
export const updateProfile = async (data: any) => {
  const res = await http.put(`/admin/update`, data);
  return res;
};
export const getOnlineAdmin = async () => {
  try {
    const res = await http.get(`/admin/online`);

    return res;
  } catch (err) {
    console.log(err);
    return null;
  }
};
export const getBlogNew = async (page?: number, limit?: number) => {
  let query = "";
  if (page !== undefined) {
    query = `?page=${page}`;
  } else if (limit !== undefined) {
    query = `?limit=${limit}`;
  }
  const res = await http.get(`/blog/new${query}`);
  return res;
};
