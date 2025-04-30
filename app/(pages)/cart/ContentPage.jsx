'use client';
import { Breadcrumbs, ContentRenderer } from '@/app/components';
import Image from 'next/image';
import styles from './style.module.scss';

const domain = 'http://90.156.134.142:1337';
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
                            <div>
                                {cartItems.map((el) => 
                                    <>
                                        <p>{el?.name}</p>
                                        <p>{el?.price}</p>
                                    </>
                                )}
                            </div>
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