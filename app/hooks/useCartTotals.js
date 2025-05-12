'use client'
import useCartStore from "../store/cartStore";

export const useCartTotals = () => {
    const cartItems = useCartStore(state => state.cartItems);

    const totalSum = cartItems.reduce((sum, item) => {
        const price = item?.priceSales ?? item?.price;
        const quantity = item?.quantity ?? 1;
        return sum + (price * quantity);
    }, 0);

    const totalQuantity = cartItems.reduce((sum, item) => {
        const quantity = item?.quantity ?? 1;
        return sum + quantity
    }, 0);


    return {
        totalSum,
        totalQuantity
    }
}