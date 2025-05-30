'use client'

import useDeliveryStore from '@/app/store/deliveryStore';

import styles from './style.module.scss'
import { PromocodComponent, LinkButton } from '..'
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCartTotals } from '@/app/hooks/useCartTotals';

export default function CartInfo({ onSubmit, forSubmit, isSubmit, setIsSubmit }) {

    const [promocodSales, setPromocodSales] = useState(10)
    const { totalQuantity, totalSum } = useCartTotals();
    const { storeData, setDeliveryData } = useDeliveryStore();

    const sum = totalSum;
    useEffect(() => {
        setDeliveryData({ totalSum: sum });
    }, [])


    const formatPrice = (price) => {
        return new Intl.NumberFormat('ru-RU').format(price);
    };

    // Проверка на авторизацию
    const [auth, setAuth] = useState(false);

    useEffect(() => {
        const getCookie = (name) => {
            const value = `; ${document.cookie}`;
            const parts = value.split(`; ${name}=`);
            if (parts.length === 2) return parts.pop().split(';').shift();
        }

        const jwt = getCookie('jwt');
        setAuth(!!jwt);
    }, []);

    const buttonText = isSubmit ? 'Отправка...' : 'Оформить заказ';
    return (

        <div className={styles.cart_info}>
            <div className={styles.info_inner}>
                <div>
                    <p>Количество товаров:</p>
                    <p>{totalQuantity} шт.</p>
                </div>
                <div>
                    <p>Стоимость без учета доставки:</p>
                    <p>{formatPrice(totalSum)} ₽</p>
                </div>
                <div>
                    <p>Скидка постоянного клиента:</p>
                    <p title="Скидка по промокоду" style={{ color: 'red' }}>{promocodSales} %</p>
                </div>
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
                    {auth ?
                        forSubmit === true
                            ?
                            <LinkButton onClick={onSubmit} forClick={true} href={'/checkout'} text={buttonText} />
                            :
                            <LinkButton href={'/checkout'} text={buttonText} />


                        : <LinkButton href={'/dashboard'} text={'Войти в аккаунт'} />
                    }

                    <LinkButton href={'/catalog'} text={'Продолжить покупки'} style={'noBg'} />
                </div>
            </div>
        </div>
    )
}