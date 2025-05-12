'use client'
import { useState } from 'react';

import styles from './style.module.scss'

export default function FormsCheckout({ type }) {

    const [deliveryMethod, setDeliveryMethod] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');


    const arrDeliveryMethod = [
        { id: 'delivery1', label: 'Самовывоз' },
        { id: 'delivery2', label: 'Доставка СДЭК' },
        { id: 'delivery3', label: 'Доставка почтой' },
        { id: 'delivery4', label: 'Курьер по Владивостоку' }
    ]

    const arrPaymentMethod = [
        { id: 'pay1', label: 'Оплата онлайн банковской картой' },
        { id: 'pay2', label: 'СБП' },
        { id: 'pay3', label: 'Оплата наличными при получении' }
    ]

    return (
        <form action="">
            <h3>Контактные данные</h3>
            <div className={styles.form_content}>
                {type === 'physical' 
                    ?
                        <>             
                            <div className={styles.input_wrapper}>
                                <div className={styles.wrapper}>
                                    <label htmlFor="name">ФИО получателя*</label>
                                    <input type='text' id='name' alt='name' placeholder='ФИО получателя*' />
                                </div>
                            </div>

                            <div className={styles.input_wrapper}>
                                <div className={styles.wrapper}>
                                    <label htmlFor="tel">Телефон контактного лица*</label>
                                    <input type='tel' id='tel' alt='tel' placeholder='Телефон' />
                                </div>
                            </div>

                            <div className={styles.input_wrapper}>
                                <div className={styles.wrapper}>
                                    <label htmlFor="inn">ИНН*</label>
                                    <input type='text' id='inn' alt='inn' placeholder='ИНН' />
                                </div>
                            </div>
                        </>
                            
                        
                    :
                        <>        
                             <div className={styles.input_wrapper}>
                                <div className={styles.wrapper}>
                                    <label htmlFor="name">Название организации*</label>
                                    <input type='text' id='name' alt='name' placeholder='Название' />
                                </div>
                            </div>
                        </>
                }

                <div className={styles.delivery}>
                    <h3>Способ доставки</h3>
                    <div className={styles.delivery_wrapper}>

                        {arrDeliveryMethod.map((method) => (
                            <div
                            key={method.id}
                            className={styles.payment_wrapper}
                            >
                                <input 
                                    type="radio" 
                                    id={method.id} 
                                    name="payment" 
                                    checked={paymentMethod === method.id}
                                    onChange={() => setPaymentMethod(method.id)}
                                    className={styles.payment_input}
                                    />
                                <label 
                                    htmlFor={method.id}
                                    className={`${styles.payment_label} ${paymentMethod === method.id ? styles.active : ''}`}
                                    >
                                    {method.label}
                                </label>
                            </div>
                        ))}
                    </div>

                       
                    </div>
                    <p className={styles.delivery_address}>
                        г. Владивосток, пр-кт Красного Знамени, д.91, с 9:00 до 20:00
                    </p>

                <div className={styles.payment}>
                    <h3>Способ оплаты</h3>
                    <div className={styles.payment_wrapper}>
                        {arrPaymentMethod.map((method) => (
                            <div
                            key={method.id}
                            className={styles.payment_wrapper}
                            >
                                    <input 
                                        type="radio" 
                                        id={method.id} 
                                        name="payment" 
                                        checked={paymentMethod === method.id}
                                        onChange={() => setPaymentMethod(method.id)}
                                        className={styles.payment_input}
                                        />
                                    <label 
                                        htmlFor={method.id}
                                        className={`${styles.payment_label} ${paymentMethod === method.id ? styles.active : ''}`}
                                        >
                                        {method.label}
                                    </label>
                                </div>
                            ))}
                    </div>
                </div>

                <div className={styles.comment}>
                    <h3>Комментарий к заказу</h3>
                    <div className={styles.comment_wrapper}>
                        <p>
                            Введите комментарий
                        </p>
                        
                        <textarea name="" id=""></textarea>
                    </div>
                </div>
                
            </div> 
        
        </form>
    )
}