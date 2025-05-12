'use client'
import { useEffect, useState } from 'react';

import styles from './style.module.scss'
import { useForm, useWatch } from 'react-hook-form';
import useCartStore from '@/app/store/cartStore';
import { useCartTotals } from '@/app/hooks/useCartTotals';

const url = 'http://90.156.134.142:1337/api/zakazies'

export async function sendOrderService(orderData) {
    console.log('orderData', orderData)
   try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
           body: JSON.stringify({ data: { ...orderData } }),
        });
       
       console.log(response)

       const data = await response.json();
       console.log('data', data)

        return { response, data };
    } catch (error) {
        console.error("sendOrder Service Error:", error);
        throw error;
    }
}

export default function FormsCheckout({ type }) {

    const [deliveryMethod, setDeliveryMethod] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');
    const { cartItems } = useCartStore();
    const [formValues, setFormValues] = useState({})

    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState();
    const [sending, isSending] = useState(false);

    const { totalSum } = useCartTotals();

    const { register, handleSubmit, formState: { errors }, control,  reset } = useForm();

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
 
    const name = useWatch({ control, name: 'name' });
    const phone = useWatch({ control, name: 'tel' });
    const email = useWatch({ control, name: 'email' });

    const currentUser = {
        id: 1,
        name: 'Kirill',
        email: 'test@mail.ru',
        phone: '89620000000'
    }

    useEffect(() => {
        // Тут будет заполнение настоящими данных из useWatch() при указании names
    }, [])

    /**
     * 
     * TODO: нужно сделать получение documentID пользователя, заказа
     * сделать проверку на то не существует ли данный заказ уже
     * сделать динамическое получение данных из полей
     * 
     */
    const onSubmit = async () => {
        let formData = {};

        formData = {
            orderNumber: `TEST-1`,
            orderText: "Тестовый заказ",
            dateOrder: "2024-01-15",
            dateDelivery: "2024-01-20",
            address: "ул. Тестовая, 123",
            
            // Если будет авторизован, то будет связь, иначе - нет
            customers: {
                connect: null ?? currentUser?.id
            },

            // Ссылки на товары
            orderItems: {
                connect: cartItems.map((item) => item.id)
            },

            // Статус заказа
            orderStatus: "pending",

            // Стоимость заказа с доставкой
            priceOrder: `${totalSum}` ?? null,
            priceDelivery: '500' ?? null,
            
            // Выбранные способы доставки оплаты
            deliveryMethod: deliveryMethod.label ?? 'Самовывоз',
            paymentMethod: paymentMethod.label ?? 'Наличные',

            phone: phone,
            name: name,
            email: email
        }

        isSending(true);
    
        try {
            const { response, data } = await sendOrderService(formData);
            if (response.ok) {
                setIsSuccess(true);
                setError(undefined);
                reset();
            } else {
                setError(data?.error?.message || 'Что-то пошло не так');
                console.error('Статус ошибки:', response.status, data);
            }
        } catch (err) {
            setError('Ошибка запроса, попробуйте позже');
            console.error('Fetch error:', err);
        } finally {
            isSending(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h3>Контактные данные</h3>
            <div className={styles.form_content}>
                {type === 'physical' 
                    ?
                        <>             
                            <div className={styles.input_wrapper}>
                                <div className={styles.wrapper}>
                                    <label htmlFor="name">ФИО получателя*</label>
                                    <input 
                                        type='text'
                                        id='name' 
                                        alt='name' 
                                        placeholder='ФИО получателя*' 
                                        className={`${errors.name ? styles.errors : ''}`}
                                        {...register('name', { required: {value: true, message: 'Введите name'}})}
                                        error={errors.name}
                                    />
                                </div>
                            </div>

                            <div className={styles.input_wrapper}>
                                <div className={styles.wrapper}>
                                    <label htmlFor="tel">Телефон контактного лица*</label>
                                    <input 
                                        type='tel' 
                                        id='tel' 
                                        alt='tel' 
                                        placeholder='Телефон' 
                                        className={`${errors.name ? styles.errors : ''}`}
                                        {...register('tel', { required: {value: true, message: 'Введите tel'}})}
                                        error={errors.name}
                                    />
                                </div>
                            </div>
                        
                            <div className={styles.input_wrapper}>
                                <div className={styles.wrapper}>
                                    <label htmlFor="tel">Электронная почта</label>
                                    <input 
                                        type='text' 
                                        id='email' 
                                        alt='email' 
                                        placeholder='Электронная почта' 
                                        className={`${errors.name ? styles.errors : ''}`}
                                        {...register('email', { required: {value: true, message: 'Введите email'}})}
                                        error={errors.name}
                                    />
                                </div>
                            </div>

                            <div className={styles.input_wrapper}>
                                <div className={styles.wrapper}>
                                    <label htmlFor="inn">ИНН*</label>
                                    <input 
                                        type='text' 
                                        id='inn' 
                                        alt='inn' 
                                        placeholder='ИНН' 
                                        className={`${errors.name ? styles.errors : ''}`}
                                        {...register('inn', { required: {value: true, message: 'Введите inn'}})}
                                        error={errors.name}
                                    />
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
                                    name="delivery" 
                                    checked={deliveryMethod === method.id}
                                    onChange={() => setDeliveryMethod(method.id)}
                                    className={styles.delivery_input}
                                    />
                                <label 
                                    htmlFor={method.id}
                                    className={`${styles.delivery_label} ${deliveryMethod === method.id ? styles.active : ''}`}
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
                <button>Отрпавить</button>
            </div> 
        
        </form>
    )
}