'use client'
import { useEffect, useState } from 'react';

import styles from './style.module.scss'
import { useForm, useWatch } from 'react-hook-form';
import useCartStore from '@/app/store/cartStore';
import { useCartTotals } from '@/app/hooks/useCartTotals';
import { LinkButton } from '..';
import { motion } from 'framer-motion';
import { info } from 'sass';

import { forwardRef, useImperativeHandle } from 'react';

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

export default function FormsCheckout({ type, ref }) {

    const [deliveryMethod, setDeliveryMethod] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');
    const { cartItems } = useCartStore();
    const [formValues, setFormValues] = useState({})

    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState();
    const [sending, isSending] = useState(false);

    const { totalSum } = useCartTotals();
    const { clearCart } = useCartStore();

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

    const arrAddress = [
        { id: 'arrAddress1', label: 'Город, улица и дом*', name: 'fullAddress' },
        { id: 'arrAddress2', label: 'Подъезд*', name: 'entrance' },
        { id: 'arrAddress3', label: 'Код на двери', name: 'floor' },
        { id: 'arrAddress4', label: 'Этаж*', name: 'code' },
        { id: 'arrAddress5', label: 'Квартира*', name: 'apartment' }
    ]
    
    const name = useWatch({ control, name: 'name' });
    const phone = useWatch({ control, name: 'tel' });
    const email = useWatch({ control, name: 'email' });
    const inn = useWatch({ control, name: 'inn' }); 

    const nameOrganization = useWatch({ control, name: 'nameOrganization' });
 
    const fullAddress = useWatch({ control, name: 'fullAddress' });
    const entrance = useWatch({ control, name: 'entrance' });
    const floor = useWatch({ control, name: 'floor' });
    const code = useWatch({ control, name: 'code' });
    const apartment = useWatch({ control, name: 'apartment' });


    const orderText = useWatch({ control, name: 'orderText'})

    const deliveryMethodsWithFields = [
        'Доставка СДЭК',
        'Доставка почтой',
        'Курьер по Владивостоку'
    ];

    const currentUser = {
        id: 1,
        name: 'Kirill',
        email: 'test@mail.ru',
        phone: '89620000000'
    }

    console.log(deliveryMethodsWithFields.includes(deliveryMethod))

    const addressVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: { 
          opacity: 1, 
          y: 0,
          transition: { duration: 0.3, ease: "easeOut" }
        },
        exit: { 
          opacity: 0, 
          y: -10,
          transition: { duration: 0.2, ease: "easeIn" }
        }
    }; 

    useEffect(() => {
        // Тут будет заполнение настоящими данных из useWatch() при указании names
    }, [])

    useImperativeHandle(ref, () => ({
        submit: () => {
            handleSubmit(onSubmit)();
        }
    }))

    /**
     * 
     * TODO: нужно сделать получение documentID пользователя, заказа
     * сделать проверку на то не существует ли данный заказ уже
     * сделать динамическое получение данных из полей
     * 
     */

    const onSubmit = async () => {
        // Собираем данные доставки только если нужно
        const deliveryData = deliveryMethodsWithFields.includes(deliveryMethod) 
            ? [
                {
                        "fullAddress": fullAddress,
                        "entrance": entrance,
                        "floor": floor,
                        "code": code,
                        "apartment": apartment
                }
                ]
            : null;
        
        // Тут проверка статуса покупателя
        const dataCustomer = type === 'physical'
            ?
               [{   
                    statusCustomer: type,
                    infoCustomerPhysical: {
                        name: name,
                        email: email,
                        phone: phone,
                        inn: inn,                            
                    }
                }]
            :
               [{   
                    statusCustomer: type,
                    infoCustomerLegal: {
                        nameOrganization: nameOrganization
                    }
                }]
        
        const formData = {
            orderNumber: `Заказ №${crypto.randomUUID()}`,
            orderText: orderText,
            dateOrder: "2024-01-15",
            dateDelivery: "2024-01-20",
            
            // Связи
            customers: currentUser?.id ? { connect: [currentUser.id] } : null,
            orderItems: { connect: cartItems.map(item => ({ id: item.id })) },
            
            // Данные доставки (добавляем только если есть)
            ...(deliveryData && { address: deliveryData }),
            
            // Статус и цены
            orderStatus: "pending",
            priceOrder: `${totalSum}` || "0",
            priceDelivery: `${deliveryData}` ? "500" : "0",
            
            // Методы оплаты и доставки
            deliveryMethod: deliveryMethod || 'Самовывоз',
            paymentMethod: paymentMethod || 'Оплата наличными при получении',
            
            // Контактные данные
            dataCustomer: dataCustomer
        };

        isSending(true);
    
        try {
            const { response, data } = await sendOrderService(formData);
            if (response.ok) {
                setIsSuccess(true);
                setError(undefined);
                reset();
                clearCart();
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
        (cartItems.length > 0
            ?
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
                                                <input
                                                    type='text'
                                                    id='nameOrganization'
                                                    alt='nameOrganization'
                                                    placeholder='Название организации'
                                                    className={`${errors.name ? styles.errors : ''}`}
                                                    {...register('nameOrganization', { required: {value: true, message: 'Введите nameOrganization'}})}
                                                    
                                                />
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
                                                checked={deliveryMethod === method.label}
                                                onChange={() => setDeliveryMethod(method.label)}
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
                        
                                {deliveryMethodsWithFields.includes(deliveryMethod) && (
                                    <div className={styles.address}>
                                        <h3>Адрес доставки</h3>

                                        {arrAddress.map((address, idx) => (
                                            <motion.div
                                                variants={addressVariants}
                                                key={idx}
                                                className={styles.input_wrapper}
                                            >
                                                <div className={styles.wrapper}>
                                                    
                                                    <label 
                                                        htmlFor={address.id}
                                                        className={`${styles.address_label}`}
                                                        >
                                                        {address.label}
                                                    </label>
                                                    <input 
                                                        type="text" 
                                                        id={address.id} 
                                                        name={address.name} 
                                                        className={styles.address_input}
                                                        placeholder={address.label}
                                                        {...register(`${address.name}`)}
                                                        />
                                                </div>
                                            </motion.div>
                                    ))}
                                    </div>
                                )}
                                
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
                                            <div className={styles.wrapper}>
                                                <input 
                                                    type="radio" 
                                                    id={method.id} 
                                                    name="payment" 
                                                    checked={paymentMethod === method.label}
                                                    onChange={() => setPaymentMethod(method.label)}
                                                    className={styles.payment_input}
                                                    />
                                                <label 
                                                    htmlFor={method.id}
                                                    className={`${styles.payment_label} ${paymentMethod === method.id ? styles.active : ''}`}
                                                    >
                                                    {method.label}
                                                </label>
                                            </div>
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
                                    
                                    <textarea name="" id="" {...register('orderText')}></textarea>
                                </div>
                            </div>
                        </div> 
                
                </form>
            
            :
                <div>
                    Ваша корзина пуста
                    <LinkButton text={'В каталог'} href='/catalog'/>
                </div>
        )
      
    )
}