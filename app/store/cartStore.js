import { create } from "zustand";

const useCartStore = create((set) => ({
    cartData: [],
    setCartData: (v) => set(() => ({ cartData: v })),
    removeCartData: () => set(() => ({ cartData: -1})),
    clearCartData: () => set(() => ({ cartData: ''}))
}))

export default useCartStore;