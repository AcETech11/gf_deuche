import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useStore = create(
  persist(
    (set, get) => ({
      // 🛍 CART STATE
      cart: [],
      favorites: [],

      // ➕ Add item (or increase quantity if it already exists)
      addToCart: (item) =>
        set((state) => {
          const existing = state.cart.find((p) => p._id === item._id);
          if (existing) {
            return {
              cart: state.cart.map((p) =>
                p._id === item._id ? { ...p, quantity: p.quantity + 1 } : p
              ),
            };
          }
          return { cart: [...state.cart, { ...item, quantity: 1 }] };
        }),

      // ➕ Increase item quantity
      increaseQty: (id) =>
        set((state) => ({
          cart: state.cart.map((p) =>
            p._id === id ? { ...p, quantity: p.quantity + 1 } : p
          ),
        })),

      // ➖ Decrease item quantity (stops at 1)
      decreaseQty: (id) =>
        set((state) => ({
          cart: state.cart.map((p) =>
            p._id === id
              ? { ...p, quantity: Math.max(p.quantity - 1, 1) }
              : p
          ),
        })),

      // ❌ Remove item completely
      removeFromCart: (id) =>
        set((state) => ({
          cart: state.cart.filter((p) => p._id !== id),
        })),

      // 🧹 Clear cart
      clearCart: () => set({ cart: [] }),

      // 💰 Get total price
      getTotal: () =>
        get().cart.reduce(
          (sum, item) => sum + item.price * (item.quantity || 1),
          0
        ),

      // ❤️ FAVORITES (fixed slug issue)
      toggleFavorite: (item) =>
        set((state) => {
          const exists = state.favorites.some((f) => f._id === item._id);

          if (exists) {
            return {
              favorites: state.favorites.filter((f) => f._id !== item._id),
            };
          } else {
            // ✅ Normalize slug before saving
            const normalizedItem = {
              ...item,
              slug:
                typeof item.slug === "object"
                  ? item.slug?.current
                  : item.slug || "",
            };

            return {
              favorites: [...state.favorites, normalizedItem],
            };
          }
        }),

      // 🩷 Check if item is favorite
      isFavorite: (id) => get().favorites.some((f) => f._id === id),
    }),
    {
      name: "app-store", // persisted key in localStorage
    }
  )
);

