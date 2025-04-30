import { create } from "zustand";
import { persist } from "zustand/middleware";

const useCartStore = create(
  persist(
    (set, get) => ({
      cartItems: [],
      lastAction: null,

      addToCart: (item) => 
        set((state) => ({
          cartItems: [...state.cartItems, item],
          lastAction: 'add'
        })),

      removeFromCart: (itemId) =>
        set((state) => ({
          cartItems: state.cartItems.filter(item => item.id !== itemId),
          lastAction: 'remove'
        })),

      clearCart: () => set({
        cartItems: [],
        lastAction: 'clear'
      }),

      getTotalItems: () => get().cartItems.length,
      
    }),


    // TODO: Вобщем если человек не будет зареган, то храним в localeStorage, иначе будем синхронизировать данные

    {
      name: "cart-storage", 
      getStorage: () => localStorage, 
      partialize: (state) => 
        ({ 
          cartItems: state.cartItems,
          lastAction: state.lastAction 
        })
    }
  )
);

export default useCartStore;