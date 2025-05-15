import { create } from "zustand";
import { persist } from "zustand/middleware";

const useWishlistStore = create(
    persist(
        (set, get) => ({
            wishlist: [],
            lastAction: null,
            clearLastAction: () => set({ lastAction: null }),
            
            addToWishlist: (product) => {
                set((state) => {
                    if (!product || !product.id) return state;

                    const existingItem = state.wishlist.find(item => item && item.id === product.id);

                    if (existingItem) {
                        return {
                            wishlist: state.wishlist.map(item => {
                                return item && item.id === product.id
                                    ? { ...item }
                                    : item
                            }),
                            lastAction: 'addWish'
                        }
                    }

                    return {
                        wishlist: [
                            ...state.wishlist,
                            {
                                ...product
                            }
                        ],
                        lastAction: 'addWish'
                    }
                })
            },

            removeFromWishlist: (productId) =>
                set((state) => {
                    if (productId) return state;

                    return {
                        wishlist: state.wishlist.filter(item => {
                            if (!item) return false;
                            return item.id !== productId
                        }),
                        lastAction: 'removeWish'
                    }
                }),
        
            clearWishList: () => set({
                wishlist: [],
                lastAction: 'clearWish'
            }),

            getTotalItems: () => get().wishlist.length,
        }),

        {
            name: "wishlist-storage",
            getStorage: () => localStorage,
            partialize: (state) => ({
                wishlist: state.wishlist
            })
        }
        
    
    )
)


export default useWishlistStore;