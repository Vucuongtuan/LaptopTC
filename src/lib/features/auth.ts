import { createSlice } from "@reduxjs/toolkit";

interface SliceState {
  authUser: boolean;
  userName: string;
}

export const authLogin = createSlice({
  name: "AuthModal",
  initialState: {
    authUser: false,
    userName: "",
  } as SliceState,
  reducers: {
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
