import React from "react";
import styles from './style.module.scss';
import { CartItem } from "..";
import Link from "next/link";

export default function MiniCart({ cartItems }) {

    const totalSum = cartItems.reduce((sum, item) => {
        const price = item?.priceSales ?? item?.price;
        const quantity = item?.quantity ?? 1;
        return sum + (price * quantity);
    }, 0);

    const formatPrice = (price) => {
        return new Intl.NumberFormat('ru-RU').format(price);
    };

   
    console.log('totalSum',totalSum)

    return (
         <div>
            {cartItems.map((el, idx) => (
                <CartItem key={idx} el={el} idx={idx} />
            ))}
            
            <div className={styles.total_info}>
                <div className={styles.total_sum}>
                    <p className={styles.total_p}>Итого:</p>
                    <p className={styles.total_price}>{formatPrice(totalSum)}</p>
                </div>

                <div className={styles.btn_link_wrapper}>

                    <Link href={'/cart'} className={styles.btn_link_cart}>Перейти в  корзину</Link>
                    <Link href={'/checkout'} className={styles.btn_link_checkout}> Оформить заказ</Link>
                </div>
            </div>

            <div className={styles.more_about_delivery}>
                <Link href={'/delivery'}>Подробнее о доставке</Link>
            </div>
        </div>
    )
}