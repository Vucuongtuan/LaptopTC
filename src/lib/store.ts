import { configureStore } from "@reduxjs/toolkit";

import checkCartLocal from "./features/checkCartLocal";
import authLogin from "./features/auth";

const store = () => {
  return configureStore({
    reducer: {
      checkCartLocal: checkCartLocal,
      auth: authLogin,
    },
  });
};
export type AppStore = ReturnType<typeof store>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
export default store;
