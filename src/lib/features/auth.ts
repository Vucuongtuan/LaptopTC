import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
interface SliceState {
  authAdmin: boolean;
  adminName: string;
  authUser: boolean;
  userName: string;
}
export const authLogin = createSlice({
  name: "AuthModal",
  initialState: {
    authAdmin: false,
    adminName: "",
    authUser:
      typeof window !== "undefined" ? Cookies.get("userToken") && true : false,
    userName:
      typeof window !== "undefined"
        ? JSON.parse(localStorage.getItem("userData") ?? "").userName
        : "",
  } as SliceState,
  reducers: {
    setAuthAdmin: (state, action) => {
      state.authAdmin = action.payload;
    },
    setAdminName: (state, action) => {
      state.adminName = action.payload;
    },
    setAuthUser: (state, action) => {
      state.authUser = action.payload;
    },
    setUserName: (state, action) => {
      state.userName = action.payload;
    },
  },
});

export const { setAuthUser, setUserName } = authLogin.actions;

export default authLogin.reducer;
