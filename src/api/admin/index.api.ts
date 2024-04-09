import http from "@/utils/axios";

interface ILoginAdmin {
  email: string;
  password: string;
}

export const LoginAdmin = async (data: ILoginAdmin) => {
  try {
    const res = await http.post("/admin/login", data);
    return res.data;
  } catch (error: any) {
    return error;
  }
};
