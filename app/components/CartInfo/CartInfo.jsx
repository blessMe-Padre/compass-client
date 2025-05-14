'use client'
import styles from './style.module.scss'
import { PromocodComponent, LinkButton } from '..'
import { useState } from 'react'
import Link from 'next/link'
import { useCartTotals } from '@/app/hooks/useCartTotals'

export default function CartInfo({ onSubmit, forSubmit }) {
    const [promocodSales, setPromocodSales] = useState(10)

    const { totalQuantity, totalSum } = useCartTotals();

    const formatPrice = (price) => {
        return new Intl.NumberFormat('ru-RU').format(price);
    };


    return (
        
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
                    {
                        forSubmit === true ? <LinkButton onClick={onSubmit} forClick={true} href={'/checkout'} text={'Оформить заказ'} /> : <LinkButton href={'/checkout'} text={'Оформить заказ'} />
                    }
                    <LinkButton href={'/catalog'} text={'Продолжить покупки'} style={'noBg'} />
                </div>
            </div>
        </div>
    )
}