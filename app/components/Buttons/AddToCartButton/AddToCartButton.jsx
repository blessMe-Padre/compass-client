'use client';
import { useState } from 'react';
import styles from './style.module.scss';
import useCartStore from "@/app/store/cartStore";


const AddToCartButton = ({ href = '/', text, items, many, item, afterCounter }) => {

    const addManyToCart = useCartStore(state => state.addManyToCart);
    const addToCart = useCartStore(state => state.addToCart);
    const [isLoading, setIsLoading] = useState(false);


    const prepareProduct = afterCounter
        ? (item) => ({
            id: item?.id ?? '55',
            documentId: item?.documentId ?? '',
            mainImg: item?.imgs?.[0]?.url ?? '',
            sku: item?.sku ?? '',
            size: item?.size ?? '',
            title: item?.title ?? '',
            height: item?.height ?? '',
            priceSales: item?.priceSales ?? 0,
            price: item?.price ?? 0,
            quantity: item?.amount > 0 ? item.amount : 1,
        })
        : (item) => ({
            id: item?.id ?? '55',
            documentId: item?.documentId ?? '',
            mainImg: item?.imgs?.[0]?.url ?? '',
            sku: item?.sku ?? '',
            size: item?.size ?? '',
            title: item?.title ?? '',
            height: item?.height ?? '',
            priceSales: item?.priceSales ?? 0,
            price: item?.price ?? 0,
            quantity: item?.amount !== 0 || item?.amount !== null ? 1 : 0,
        });

    const handleClick = async () => {
        setIsLoading(true);
        localStorage.setItem('orderPlaced', false);
        
        try {
            // Добавляем минимальную задержку для видимости loading состояния
            await new Promise(resolve => setTimeout(resolve, 500));
            
            if (many && items.length > 0) {
                const products = items.map(prepareProduct);
                addManyToCart(products);
            } else if (item) {
                addToCart(prepareProduct(item));
            }
        } catch (error) {
            console.error('Error adding to cart:', error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <>
            <button
                className={`${styles.btn} ${isLoading ? styles.loading : ''}`}
                onClick={handleClick}
                disabled={isLoading}
            >
                {isLoading ? (
                    <div className={styles.spinner}>
                        <div className={styles.spinnerInner}></div>
                    </div>
                ) : (
                    <svg width="25" height="26" viewBox="0 0 25 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_2026_3376)">
                            <path fillRule="evenodd" clipRule="evenodd" d="M7.76995 7.61142H6.26193C5.75957 7.61144 5.27586 7.79676 4.90822 8.13007C4.54058 8.46338 4.31631 8.91991 4.28057 9.40775L3.30777 22.6689C3.28836 22.9338 3.3252 23.1997 3.41598 23.4501C3.50676 23.7005 3.64954 23.9301 3.83543 24.1244C4.02131 24.3188 4.24631 24.4737 4.49642 24.5797C4.74652 24.6857 5.01636 24.7404 5.28913 24.7404H21.0129C21.2856 24.7402 21.5554 24.6854 21.8054 24.5794C22.0554 24.4734 22.2804 24.3184 22.4662 24.1241C22.6521 23.9298 22.7948 23.7003 22.8857 23.45C22.9765 23.1996 23.0135 22.9337 22.9943 22.6689L22.0215 9.40775C21.9857 8.91991 21.7614 8.46338 21.3938 8.13007C21.0262 7.79676 20.5425 7.61144 20.0401 7.61142H18.5429V7.33514C18.5429 5.94297 17.9748 4.60781 16.9636 3.62339C15.9525 2.63898 14.581 2.08594 13.151 2.08594C10.282 2.08594 7.63033 4.3105 7.75916 7.33514L7.76995 7.61142ZM18.5429 9.26906V13.4132C18.5429 13.633 18.4532 13.8438 18.2935 13.9992C18.1339 14.1547 17.9173 14.242 17.6915 14.242C17.4657 14.242 17.2492 14.1547 17.0895 13.9992C16.9299 13.8438 16.8402 13.633 16.8402 13.4132V9.26906H9.46185V13.4132C9.46185 13.633 9.37216 13.8438 9.2125 13.9992C9.05284 14.1547 8.8363 14.242 8.61051 14.242C8.38472 14.242 8.16817 14.1547 8.00852 13.9992C7.84886 13.8438 7.75916 13.633 7.75916 13.4132C7.75916 13.4132 7.83295 11.4765 7.80854 9.26906H6.26193C6.19028 9.26916 6.12131 9.29565 6.06888 9.3432C6.01645 9.39076 5.98445 9.45586 5.97929 9.52545L5.00592 22.7866C5.00311 22.8245 5.00835 22.8625 5.02131 22.8983C5.03427 22.9341 5.05468 22.967 5.08126 22.9947C5.10783 23.0225 5.14001 23.0447 5.17577 23.0598C5.21154 23.075 5.25013 23.0828 5.28913 23.0828H21.0129C21.0518 23.0826 21.0904 23.0747 21.126 23.0595C21.1617 23.0443 21.1938 23.0221 21.2204 22.9944C21.2469 22.9666 21.2673 22.9339 21.2804 22.8981C21.2934 22.8624 21.2987 22.8244 21.2961 22.7866L20.3227 9.52545C20.3176 9.45586 20.2856 9.39076 20.2331 9.3432C20.1807 9.29565 20.1117 9.26916 20.0401 9.26906H18.5429ZM16.8402 7.61142V7.33514C16.8402 6.3826 16.4515 5.46907 15.7596 4.79553C15.0678 4.12198 14.1294 3.74358 13.151 3.74358C12.1726 3.74358 11.2342 4.12198 10.5424 4.79553C9.85053 5.46907 9.46185 6.3826 9.46185 7.33514V7.61142H16.8402Z" fill="white" />
                        </g>
                        <defs>
                            <clipPath id="clip0_2026_3376">
                                <rect width="21" height="23" fill="white" transform="translate(2 1.5)" />
                            </clipPath>
                        </defs>
                    </svg>
                )}

                {isLoading ? 'Добавление...' : text}
            </button>
        </>
    )
}

export default AddToCartButton