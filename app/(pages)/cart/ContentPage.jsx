'use client';
import { Breadcrumbs, CartItem, ContentRenderer, LinkButton, PromocodComponent } from '@/app/components';
import Image from 'next/image';
import styles from './style.module.scss';

import Link from 'next/link';
import useCartStore from "@/app/store/cartStore";
import { useState } from 'react';


export default function ContentPage() {

    const { cartItems, clearCart } = useCartStore();
    const [ promocodSales, setPromocodSales ] = useState(10)
    
    const handleClick = () => {
        const confirmation = confirm('Вы хотите очистить корзину?');
        if (confirmation === true) {
            clearCart();
        }
    };

    const totalSum = cartItems.reduce((sum, item) => {
        const price = item?.priceSales ?? item?.price;
        const quantity = item?.quantity ?? 1;
        return sum + (price * quantity);
    }, 0);

    const totalQuantity = cartItems.reduce((sum, item) => {
        const quantity = item?.quantity ?? 1;
        return sum + quantity
    }, 0);


    const formatPrice = (price) => {
        return new Intl.NumberFormat('ru-RU').format(price);
    };

    /**
     * 
     * 
     * TODO:
     * тут будет форма, которая будет сохраняться в стор под конкретного пользователя
     * через react-hook-form
     */

    return (
        <section>
            <div className='container'>
                <h2 className='page_title'>Корзина</h2>

                <div className={styles.cart_wrapper}>
                    {cartItems.length > 0
                        ? (
                            <>
                                <div className={styles.cart_item_wrapper}>
                                    {cartItems.map((el, idx) => (
                                        <CartItem el={el} idx={idx} key={idx} location={'cartPage'} />
                                    ))}

                                    <div>
                                        <button 
                                        onClick={() => handleClick()} className={styles.btn_reset}>Очистить корзину</button>
                                    </div>
                                </div>
                                

                                <div className={styles.cart_info}>
                                    <div className={styles.info_inner}>
                                        <div>
                                            <p>Количество товаров:</p>
                                            <p>{totalQuantity}</p>
                                        </div>
                                        <div>
                                            <p>Стоимость без учета доставки::</p>
                                            <p>{formatPrice(totalSum)} ₽</p>
                                        </div>
                                        <div>
                                            <p>Скидка постоянного клиента::</p>
                                            <p title="Скидка по промокоду" style={{ color: 'red'}}>{promocodSales} %</p>                                        </div>
                                    </div>

                                    <PromocodComponent />

                                    <div className={styles.total_sum_order_wrapper}>
                                        <div>
                                            <p>ИТОГО:</p> <p className={styles.total_sum_order}>{formatPrice(totalSum - (totalSum * promocodSales / 100))} ₽ </p>
                                        </div>


                                        <div className={styles.more_about_delivery}>
                                            <Link href={'/delivery'}>Подробнее о доставке</Link>
                                        </div>

                                        <div className={styles.btn_nav}>
                                            <LinkButton href={'/checkout'} text={'Оформить заказ'} />
                                            <LinkButton href={'/catalog'} text={'Продолжить покупки'} style={'noBg'} />
                                        </div>
                                    </div>
                                </div>
                            </>

                        )
                        : (
                            <div>
                                <p style={{ fontWeight: 'bold', marginBottom: '5px'}}>Здесь еще ничего нет. </p>
                                <p style={{ marginBottom: '10px'}}>Выберите товары в каталоге</p>
                                <LinkButton text={'Перейти в каталог'} href='/catalog' />
                            </div>
                            )
                        }
                </div>
            </div>
        </section>
    );
}