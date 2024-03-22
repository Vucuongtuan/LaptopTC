import { configureStore } from "@reduxjs/toolkit";

import globalLoadingSlice, {
  setGlobalLoading,
} from "./features/globalLoadingSlice";
import checkCartLocal from "./features/checkCartLocal";

const store = () => {
  return configureStore({
    reducer: {
      globalLoading: globalLoadingSlice,
      checkCartLocal: checkCartLocal,
    },
  });
};
export type AppStore = ReturnType<typeof store>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
export default store;
