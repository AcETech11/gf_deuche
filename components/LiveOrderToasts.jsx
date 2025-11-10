"use client";
import { Toaster } from "react-hot-toast";
import { useLiveOrders } from "../app/hooks/useLiveOrders";

export default function LiveOrderToasts() {
  useLiveOrders();

  return (
    <Toaster
      toastOptions={{
        style: {
          background: "transparent",
          boxShadow: "none",
        },
      }}
    />
  );
}
