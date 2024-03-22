import http from "@/utils/axios";

type TSignupAccountData = {
  name: string;
  email: string;
  otp: string;
  password: string;
  phone: string;
  address: string;
};
export const SigninAccount = async (
  email: string,
  password: string | number
) => {
  const res = await http.post("/account/signin", { email, password });
  return res.data;
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
