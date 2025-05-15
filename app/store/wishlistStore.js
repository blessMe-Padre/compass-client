import { create } from "zustand";
import { persist } from "zustand/middleware";

const useWishlistStore = create(
    persist(
        (set, get) => ({
            wishlist: [],
            lastAction: null,
            clearLastAction: () => set({ lastAction: null }),
            
            toggleWishlist: (product) => {
                const exists = get().wishlist.some(item => item.id === product.id);
                
                if(exists) {
                set({
                    wishlist: get().wishlist.filter(item => item.id !== product.id),
                    lastAction: 'removeWish'
                });
                } else {
                set({
                    wishlist: [...get().wishlist, product],
                    lastAction: 'addWish'
                });
                }
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