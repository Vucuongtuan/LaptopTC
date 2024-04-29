import http from "@/utils/axios";
import axios from "axios";

type TSignupAccountData = {
  name: string;
  email: string;
  otp: string;
  password: string;
  phone: string;
  address: string;
};
type TAddToCartData = {
  name: string;
  email: string;
  phone: string;
  address: string;
  userId: string;
  total: number;
  listProduct: any[];
};
export const SigninAccount = async (
  email: string,
  password: string | number
) => {
  const res = await http.post("/account/login", { email, password });
  return res;
};

export const SignupAccount = async (data: TSignupAccountData) => {
  const res = await http.post("/account", {
    email: data.email,
    password: data.password,
    otp: data.otp,
    name: data.name,
    phone: data.phone,
    address: data.address,
  });
  return res.data;
};
export const AddToCart = async (data: TAddToCartData) => {
  const dataList = {
    name: data.name,
    phone: data.phone,
    address: data.address,
    email: data.email,
    userId: data.userId,
    total: data.total,
    listProduct: data.listProduct,
  };
  const res = await axios.post("http://localhost:4000/cart", dataList);

  return res.data;
};
export const GetIdAll = async () => {
  const res = await http.post("/all-product/allID");
  return res.data;
};
