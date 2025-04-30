'use client';
import { Breadcrumbs, CartItem, ContentRenderer } from '@/app/components';
import Image from 'next/image';
import styles from './style.module.scss';

import Link from 'next/link';
import useCartStore from "@/app/store/cartStore";


export default function ContentPage() {

    const { cartItems } = useCartStore();

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
                                        <CartItem el={el} idx={idx} key={idx} />
                                    ))}
                                    
                                    {/* <div className={styles.total_info}>
                                        <div className={styles.total_sum}>
                                            <p className={styles.total_p}>Итого:</p>
                                            <p className={styles.total_price}></p>
                                        </div>

                                        <div className={styles.btn_link_wrapper}>

                                            <Link href={'/cart'} className={styles.btn_link_cart}>Перейти в  корзину</Link>
                                            <Link href={'/checkout'} className={styles.btn_link_checkout}> Оформить заказ</Link>
                                        </div>
                                    </div>

                                    <div className={styles.more_about_delivery}>
                                        <Link href={'/delivery'}>Подробнее о доставке</Link>
                                    </div> */}
                                </div>
                                

                                <div className={styles.cart_info}>
                                    <div className={styles.info_inner}>
                                        <div>
                                            <p>Количество товаров:</p>
                                            <p>1</p>
                                        </div>
                                        <div>
                                            <p>Стоимость без учета доставки::</p>
                                            <p>18 193 ₽</p>
                                        </div>
                                        <div>
                                            <p>Скидка постоянного клиента::</p>
                                            <p>1</p>
                                        </div>
                                    </div>
                                    <div className={styles.promocod}>
                                        Введите промокод
                                    </div>
                                </div>
                            </>

                        )
                        : (
                            <div>
                                <p>Здесь еще ничего нет. Выберите товары в каталоге</p>
                                <Link href={'/catalog'}>Перейти в каталог</Link>
                            </div>
                            )
                        }
                </div>
            </div>
        </section>
    );
}