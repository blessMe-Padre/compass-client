'use client'
import { useEffect, useState } from 'react';

import styles from './style.module.scss'
import { useForm, useWatch, Controller } from 'react-hook-form';
import useCartStore from '@/app/store/cartStore';
import { useCartTotals } from '@/app/hooks/useCartTotals';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

import { useImperativeHandle } from 'react';
import { format } from 'date-fns';
import getUserById from '@/app/utils/getUserById';
import { Sdek } from '@/app/components';

import useUserStore from '@/app/store/userStore';
import useCdekTokenStore from '@/app/store/cdekStore';
import useDeliveryStore from '@/app/store/deliveryStore';

const url = `${process.env.NEXT_PUBLIC_DOMAIN}/api/zakazies`;

export function getCurrentDate() {
    return format(new Date(), 'yyyy-MM-dd');
}

const documentId = useUserStore.getState().userData?.documentId ?? 'bxgol3fvr7ei2e5522yrqpp6';

export async function sendOrderService(orderData) {
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ data: { ...orderData } }),
        });

        const data = await response.json();
        return { response, data };
    } catch (error) {
        console.error("sendOrder Service Error:", error);
        throw error;
    }
}

const sendPaymentService = async (orderUniqNumber, totalSum, orderItems, user) => {
    try {
        // Формируем корректный массив items для YooKassa
        const items = orderItems.map(item => {
            const price = item?.priceSales || item?.price;
            const quantity = item?.quantity ?? 1;
            const itemTotal = (price * quantity).toFixed(2);

            return {
                description: item.title || 'Товар',
                quantity: quantity.toFixed(3),
                amount: {
                    value: itemTotal,
                    currency: 'RUB'
                },
                vat_code: 1, // НДС 20%
                payment_mode: 'full_prepayment',
                payment_subject: 'commodity'
            };
        });

        const payload = {
            amountValue: '2.00',
            currency: 'RUB',
            returnUrl: window.location.href,
            metadata: orderUniqNumber,
            sum: totalSum,
            receipt: user.email,
            items: items,
        };

        const response = await fetch('/api/payment/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        const result = await response.json();
        return result;


        if (!response.ok || !result.success) {
            throw new Error(result.error || 'Ошибка при создании платежа');
        }

    } catch (err) {
        console.log(err);

    } finally {

    }
};

function formatPhone(raw) {
    let digits = raw.replace(/\D/g, '');
    if (digits.startsWith('7')) {
        digits = digits.slice(1);
    }
    digits = digits.slice(0, 10);
    let result = '+7';

    if (digits.length > 0) {
        result += ' (' + digits.slice(0, Math.min(3, digits.length));
    }
    if (digits.length >= 3) {
        result += ') ' + digits.slice(3, Math.min(6, digits.length));
    }
    if (digits.length >= 6) {
        result += ' ' + digits.slice(6, Math.min(8, digits.length));
    }
    if (digits.length >= 8) {
        result += ' ' + digits.slice(8, 10);
    }
    return result;
}

export default function FormsCheckout({ type, ref, setSubmitted, setIsSubmit, setPaymentMessage, setOrderWasCreate }) {
    const [user, setUser] = useState({});
    const { token } = useCdekTokenStore();
    const { storeData, setDeliveryData } = useDeliveryStore();
    const [paymentData, setPaymentData] = useState(null);
    const router = useRouter();
    const [deliveryMethod, setDeliveryMethod] = useState('Самовывоз');
    const [paymentMethod, setPaymentMethod] = useState('Оплата наличными при получении');
    const { cartItems } = useCartStore();

    /**
     * true - если СДЕК нужен 
     * false - если СДЕК не нужен
     */
    const IS_NEED_CDEK = false;

    useEffect(() => {
        const loadData = async () => {
            try {
                const response = await getUserById(documentId);
                setUser(response[0]);
                const userData = response[0];
                setDeliveryData({ username: userData.username, phone: userData.phone, email: userData.email });

            } catch (error) {
                console.error('Произошла ошибка', error);
            }
        };

        loadData();
    }, []);

    const [error, setError] = useState();
    const [sending, isSending] = useState(false);

    const { totalSum } = useCartTotals();
    const { clearCart } = useCartStore();

    const { register, handleSubmit, formState: { errors }, control, reset } = useForm();

    const arrDeliveryMethod = [
        { id: 'delivery1', label: 'Самовывоз' },
        { id: 'delivery2', label: 'Доставка СДЭК' },
        { id: 'delivery3', label: 'Доставка почтой' },
        { id: 'delivery4', label: 'Курьер по Владивостоку' }
    ]

    const arrPaymentMethod = [
        { id: 'pay1', label: 'Оплата онлайн на сайте' },
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

    // следим за обновлением полей
    useEffect(() => {
        setDeliveryData({ username: name });
    }, [name]);
    useEffect(() => {
        setDeliveryData({ phone: phone });
    }, [phone]);
    useEffect(() => {
        setDeliveryData({ email: email });
    }, [email]);

    const nameOrganization = useWatch({ control, name: 'nameOrganization' });

    const fullAddress = useWatch({ control, name: 'fullAddress' });
    const entrance = useWatch({ control, name: 'entrance' });
    const floor = useWatch({ control, name: 'floor' });
    const code = useWatch({ control, name: 'code' });
    const apartment = useWatch({ control, name: 'apartment' });

    const orderText = useWatch({ control, name: 'orderText' });
    useEffect(() => {
        setDeliveryData({ comment: orderText });
    }, [orderText]);

    const deliveryMethodsWithFields = [
        'Доставка СДЭК',
        'Доставка почтой',
        'Курьер по Владивостоку'
    ];

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

    useEffect(() => {
        if (user) {
            reset({
                name: user.username || '',
                email: user.email || '',
                tel: user.phone || '',
            });
        }
    }, [user, reset]);

    // Собираем данные из формы и создаем заказ СДЭК
    // раскомментировать вызов функции
    const handleCreateCdekOrder = async () => {
        const orderData = {
            comment: storeData.comment,
            email: storeData.email,
            phone: storeData.phone,
            username: storeData.username,
            delivery_point: storeData.pvzCode,
            tariffCode: storeData.tariffCode,
        }

        const res = await fetch('/api/cdek/create_order', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token, orderData })
        })

        if (!res.ok) throw new Error(await res.text())

        const order = await res.json();
        // console.log('создан CDEK заказ:', order)
    }

    const onSubmit = async () => {
        const orderUniqNumber = crypto.randomUUID();

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

        const ts = Date.now().toString();         // "1654678234567"
        const last8 = ts.slice(-8);               // "78234567"
        const orderNumber = last8;

        const formData = {
            orderPaymentId: orderUniqNumber,
            orderNumber: `${orderNumber}`,
            UserDocumentId: user.documentId,
            orderText: orderText,
            dateOrder: getCurrentDate(),
            dateDelivery: getCurrentDate() + 10,

            // Связи
            customers: user?.id ? { connect: [user.id] } : null,
            // orderItems: { connect: [cartItems.map(item => ({ documentId	: item.documentId	 }))] },

            orderData: [{
                orderItems: {
                    connect: [cartItems.map(item => ({
                        documentId: item.documentId,
                        quantity: item.quantity
                    }))]
                },
                quantity: cartItems.map(item => ({
                    id: item.documentId,
                    id1c: item.id1c,
                    НАЗВАНИЕ_ТОВАРА: item.title,
                    КОЛИЧ_ВО: item.quantity,
                    ЦЕНА: item.price
                }))
            }],

            // Данные доставки (добавляем только если есть)
            ...(deliveryData && { address: deliveryData }),

            // Статус и цены
            orderStatus: "pending",
            priceOrder: `${totalSum}` || "0",
            priceDelivery: `${storeData?.deliveryPrice ?? "0"}`,

            // Методы оплаты и доставки
            deliveryMethod: deliveryMethod || 'Самовывоз',
            paymentMethod: paymentMethod || 'Оплата наличными при получении',
            deliveryDateMax: storeData?.deliveryDateMax || null,
            paymentstatus: 'не оплачен',

            // Контактные данные
            dataCustomer: dataCustomer,
        };

        // console.log(formData);
        isSending(true);

        try {
            // отправка заказа в страпи и в сдэк
            setIsSubmit(true);
            const { response, data } = await sendOrderService(formData);
            if (response.ok) {
                setSubmitted(true);
                setError(undefined);
                reset();
                clearCart();
                setOrderWasCreate(true);
                localStorage.setItem('orderPlaced', 'true');
                // handleCreateCdekOrder();
            } else {
                setError(data?.error?.message || 'Что-то пошло не так');
                console.error('Статус ошибки:', response.status, data);
            }

            if (paymentMethod === "Оплата онлайн на сайте") {
                setSubmitted(true);
                const paymentResult = await sendPaymentService(orderUniqNumber, storeData.totalSum, cartItems, user);
                setPaymentData(paymentResult?.data);

                // устанавливает сообщение о редирект
                setPaymentMessage(true);
                const url = paymentResult.data?.confirmation?.confirmation_url;

                if (url) {
                    setTimeout(() => {
                        // router.push(url);
                        window.location.href = url;
                    }, 2000);
                }

                if (!paymentResult.success) {
                    // throw new Error(paymentResult.error || "Оплата не прошла");
                }
            }

            setError('Ошибка запроса, попробуйте позже');
            setIsSubmit(false);

        } catch (err) {
            console.error('Общая ошибка отправки создания заказа:', err);
            setIsSubmit(false);
        }

        // ===============================
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
                                    {...register('name', {
                                        required: {
                                            value: true,
                                            message: 'Введите ФИО получателя'
                                        }
                                    })}
                                    error={errors.name}
                                    defaultValue={user?.username ?? ''}
                                />
                            </div>
                            <div className={styles.input_text_error}>{errors['name'] && errors['name'].message}</div>
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
                                    {...register('tel', {
                                        required: {
                                            value: true,
                                            message: 'Введите телефон'
                                        },
                                    })} error={errors.name}
                                    defaultValue={user?.phone ?? ''}
                                />
                            </div>
                            <div className={styles.input_text_error}>{errors['tel'] && errors['tel'].message}</div>
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
                                    {...register('email', {
                                        required: {
                                            value: true,
                                            message: 'Введите email'
                                        }
                                    })}
                                    error={errors.name}
                                    defaultValue={user?.email ?? ''}
                                />
                            </div>
                            <div className={styles.input_text_error}>{errors['email'] && errors['email'].message}</div>
                        </div>

                        {/* <div className={styles.input_wrapper}>
                            <div className={styles.wrapper}>
                                <label htmlFor="inn">ИНН*</label>
                                <input
                                    type='text'
                                    id='inn'
                                    alt='inn'
                                    placeholder='ИНН'
                                    className={`${errors.name ? styles.errors : ''}`}
                                    {...register('inn', {
                                        required: {
                                            value: true,
                                            message: 'Введите inn'
                                        }
                                    })}
                                    error={errors.name}
                                    defaultValue={user?.inn ?? ''}
                                />
                            </div>
                            <div className={styles.input_text_error}>{errors['inn'] && errors['inn'].message}</div>
                        </div> */}
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
                                    {...register('nameOrganization', { required: { value: true, message: 'Введите nameOrganization' } })}
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

                    {deliveryMethodsWithFields.includes(deliveryMethod) && deliveryMethod !== 'Доставка СДЭК' && (
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


                    {deliveryMethod === 'Доставка СДЭК' && (
                        IS_NEED_CDEK ? (
                            <div className={styles.address}>
                                <h3>Выберите пункт выдачи СДЭК</h3>
                                <motion.div
                                    variants={addressVariants}
                                    className={styles.input_wrapper}
                                >
                                    <div className={styles.wrapper}>
                                        <Sdek />
                                    </div>
                                </motion.div>
                            </div>
                        ) : (
                            <motion.p
                                variants={addressVariants}
                                className={styles.input_wrapper}
                                style={{ marginTop: '20px' }}
                            >
                                Выбран способ доставки "Доставка СДЭК"
                            </motion.p>
                        )
                    )}
                </div>

                {deliveryMethod === 'Самовывоз' &&

                    <motion.p
                        variants={addressVariants}
                        className={styles.delivery_address}
                        style={{ marginTop: '20px' }}
                    >
                        г. Владивосток, пр-кт Красного Знамени, д.91, с 9:00 до 20:00
                    </motion.p>
                }

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

                {/* {paymentMethod === "Оплата онлайн на сайте" &&
                    <p>выбран метод оплаты "Оплата онлайн на сайте"</p>
                } */}

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

        </form >
    )
}