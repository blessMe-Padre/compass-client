'use client';
import { Breadcrumbs, CartItem, ContentRenderer, LinkButton, PromocodComponent } from '@/app/components';
import Image from 'next/image';
import styles from './style.module.scss';

import Link from 'next/link';
import useCartStore from "@/app/store/cartStore";


export default function ContentPage() {

    const { cartItems, clearCart } = useCartStore();
    
    const handleClick = () => {
        const confirmation = confirm('Вы хотите очистить корзину?');
        if (confirmation === true) {
            clearCart();
        }
    };

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

                                    <PromocodComponent />
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