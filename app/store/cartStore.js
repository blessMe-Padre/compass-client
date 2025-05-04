import { create } from "zustand";
import { persist } from "zustand/middleware";

const useCartStore = create(
  persist(
    (set, get) => ({
      cartItems: [],
      lastAction: null,


      // не будем добавлять новый товар если он уже есть. 
      addToCart: (product) => 
        set((state) => {
          if (!product || !product.id) return state;

          const existingItem = state.cartItems.find(item => item && item.id === product.id);

          if (existingItem) {
            return {
              cartItems: state.cartItems.map(item => {
                return item && item.id === product.id
                  ? { ...item, quantity: (item.quantity || 0) + 1 }
                  : item;
              }), 
              lastAction: 'add'
            };
          }

          return {
            cartItems: [
              ...state.cartItems, 
              { 
                ...product, 
                quantity: product.quantity || 1 
              }
            ],
            lastAction: 'add'
          };
      }),

      removeFromCart: (itemId) =>
        set((state) => {
          if (!itemId) return state;
          
          return {
            cartItems: state.cartItems.filter(item => {
              if (!item) return false;
              return item.id !== itemId;
            }),
            lastAction: 'remove'
          };
        }),

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