import { createSlice } from "@reduxjs/toolkit";
interface SliceState {
  isOpenModalCart: boolean;
  checkCartLocal: boolean;
  arrayCart: any[];
}

interface PayloadAction<T> {
  payload: T;
  type: string;
}

export const checkCartLocal = createSlice({
  name: "CHECK_LOCAL_CART",
  initialState: {
    isOpenModalCart: false,
    checkCartLocal: false,
    arrayCart:
      typeof window !== "undefined" && localStorage.getItem("cartItems")
        ? JSON.parse(localStorage.getItem("cartItems")!)
        : [],
  } as SliceState,
  reducers: {
    setCheckCartLocal: (state, action: PayloadAction<boolean>) => {
      state.checkCartLocal = action.payload;
    },
    setArrayCart: (state, action: PayloadAction<any>) => {
      state.arrayCart = [...state.arrayCart, action.payload];
      localStorage.setItem("cartItems", JSON.stringify(state.arrayCart));
    },
    removeItemFromCart: (state, action: PayloadAction<string>) => {
      const updatedCart = state.arrayCart.filter(
        (item) => item._id !== action.payload
      );
      state.arrayCart = updatedCart;
      localStorage.setItem("cartItems", JSON.stringify(updatedCart));
    },
    setIsOpenModalCart: (state, action: PayloadAction<boolean>) => {
      state.isOpenModalCart = action.payload;
    },
  },
});

export const {
  setCheckCartLocal,
  setArrayCart,
  setIsOpenModalCart,
  removeItemFromCart,
} = checkCartLocal.actions;

export default checkCartLocal.reducer;
