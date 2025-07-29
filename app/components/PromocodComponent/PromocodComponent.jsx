'use client'
import { useState } from 'react';
import styles from './style.module.scss'

export default function PromocodComponent({ setCouponSales }) {
    const [message, setMessage] = useState('');
    const [color, setColor] = useState(null);

    /**
     * 
     * TODO: добавить к strapi новую запись промокод
     * тут написать через react-hook-form новую форму
     * собирает значение из инпута
     * отправляет пост запрос через service на api
     * если есть, приходит 200 и тогда применяется скидка, которая также приходит в теле ответа
     */

    const handleClick = (e) => {
        e.preventDefault();
        const promoInput = document.getElementById('promo');
        const promoCode = promoInput.value.trim();

        if (promoCode === "1111") {
            setCouponSales(3);
            setMessage("Промокод применён! Скидка 3%");
            setColor("green");
        } else {
            setCouponSales(0);
            setMessage("Неверный промокод");
            setColor("red");
        }
        promoInput.value = '';
    };

    return (
        <div className={styles.promocod_wrapper}>
            <div className={styles.promocod}>
                <input type='text' id='promo' alt='promo' />
                <label htmlFor="promo">Введите промокод</label>
                <button
                    className={styles.btn_promo}
                    onClick={handleClick}
                >Применить</button>
            </div>
            <p style={{ color: color, marginTop: '5px' }}>{message}</p>
        </div >
    )
}