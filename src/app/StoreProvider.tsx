"use client";
import { setGlobalLoading } from "@/lib/features/globalLoadingSlice";
import store, { AppStore, RootState } from "@/lib/store";
import { useEffect, useRef } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore>(store());

  return <Provider store={storeRef.current}>{children}</Provider>;
}
