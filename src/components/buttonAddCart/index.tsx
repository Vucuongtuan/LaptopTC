"use client";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setArrayCart, setCheckCartLocal } from "@/lib/features/checkCartLocal";
import { TButtonAddToCart } from "@/types/data/index.types";

interface ButtonAddToCartProps {
  data: TButtonAddToCart;
}

export const ButtonAddToCart: React.FC<ButtonAddToCartProps> = ({ data }) => {
  const dispatch = useDispatch();
  const dataCart = useSelector((state: any) => state.checkCartLocal.arrayCart);
  const handleAddToCart = () => {
    if (dataCart && dataCart._id === data._id) {
      alert("Đã có sản phẩm trong giỏ hàng");
    } else if (dataCart && dataCart._id !== data._id) {
      dispatch(setArrayCart(data));
      dispatch(setCheckCartLocal(true));
    } else if (dataCart === null) {
      dispatch(setArrayCart(data));

      dispatch(setCheckCartLocal(true));
    }
  };

  return (
    <button
      className="bg-red-500 hover:bg-red-700 transition-all text-[#fff] text-xl font-semibold py-5 px-40 rounded sm:px-20 sm:py-2"
      onClick={handleAddToCart}
    >
      Mua ngay
    </button>
  );
};
