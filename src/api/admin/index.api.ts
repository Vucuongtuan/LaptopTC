import http from "@/utils/axios";

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
