import { create } from "zustand";
import { persist } from "zustand/middleware";

const useCartStore = create(
  persist(
    (set, get) => ({
      cartItems: [],
      lastAction: null,
      clearLastAction: () => set({ lastAction: null }),

      increaseQuantity: (itemId) => 
        set((state) => ({
          cartItems: state.cartItems.map(item => 
            item?.id === itemId
            ? { ...item, quantity: (item.quantity || 0) + 1}
            : item
          )
        })),

      decreaseQuantity: (itemId) =>
        set((state) => ({
          cartItems: state.cartItems.map(item => {
            if (!item || item.id !== itemId) return item;
            const newQuantity = Math.max(1, (item.quantity || 1) - 1)
            return { ...item, quantity: newQuantity}
          })
        })),

        removeIfZero: (itemId) =>
          set((state) => ({
            cartItems: state.cartItems.filter(item => 
              item?.id !== itemId || (item.quantity || 0) > 0
            )
        })),

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
      
      addManyToCart: (products) => {
        if (!Array.isArray(products)) return;

          set((state) => {
            const updatedItems = [...state.cartItems];

            products.forEach((product) => {
              if (!product?.id) return
              
              const existingIndex = updatedItems.findIndex(
                item => item.id === product.id
              );  

              if (existingIndex > -1) {
                updatedItems[existingIndex] = {
                  ...updatedItems[existingIndex],
                  quantity: (updatedItems[existingIndex].quantity || 0) + 
                           (product.quantity || 1)
                };
              } else {
                updatedItems.push({
                  ...product,
                  quantity: product.quantity || 1
                });
              }
            })

            return {
              cartItems: updatedItems,
              lastAction: 'addMany'
            }
          })
      },

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
        })
    }
  )
);

export default useCartStore;