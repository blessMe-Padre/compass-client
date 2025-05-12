'use client';
import { CartItem, LinkButton, CartInfo } from '@/app/components';
import styles from './style.module.scss';

import useCartStore from "@/app/store/cartStore";

export default function ContentPage() {

    const { cartItems, clearCart } = useCartStore();    

    const handleClick = () => {
        const confirmation = confirm('Вы хотите очистить корзину?');
        if (confirmation === true) {
            clearCart();
        }
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
                                
                                <CartInfo />
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