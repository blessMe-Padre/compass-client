'use client'
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import styles from './style.module.scss';

import { useRouter } from 'next/navigation';
import Link from 'next/link';

const url = `${process.env.NEXT_PUBLIC_DOMAIN}/api/auth/local/`;
// Иван
// zarodiny@yandex.ru
// 123456789

// https://sms.targetsms.ru/sendsms.php


/**
const api = https://sms.targetsms.ru/sendsms.php?user=root&pwd=password&name_delivery=nameDelivery&sadr=???&dadr=${phone}&text=текст SMS


response = 1179038981
*/

const sendCode = async (phone) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/auth/send-code`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ phone })
        });

        if (!res.ok) throw new Error('Ошибка отправки кода');
        setStep('code');
    } catch (err) {
        setError(err.message);
    }
}

const verifyCode = async (code) => {

};
    
// async function loginUserService(userData) {
//     const response = await fetch(url, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(userData),
//     });

//     const data = await response.json();
//     return { response, data };
// }

const Login = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    //const [isSuccess, setIsSuccess] = useState(false); если response.ok
    const [error, setError] = useState();
    const [isSending, setIsSending] = useState(false);
    const [step, setStep] = useState('phone');

    const router = useRouter();

    // const onSubmit = async (formData) => {
    //     setIsSending(true);
    //     setError(null);

    //     try {
    //         const { response, data } = await loginUserService(formData);
    //         if (response.ok) {
    //             document.cookie = `jwt=${data.jwt}; path=/; max-age=${60 * 60 * 24 * 7}; Secure; SameSite=Strict`;
    //             console.log('Успешный вход', data?.user?.username);
    //             console.log('Данные пользователя', data);
    //             router.push('/dashboard');
    //         } else {
    //             setError('Ошибка входа: неверный логин/пароль');
    //         }
    //     } catch (error) {
    //         setError('Ошибка запроса, попробуйте позже');
    //     } finally {
    //         setIsSending(false);
    //     }
    // };

    return (
        <div className={styles.page_wrapper}>
            <div className="container">
                <div>
                    <h1 className={styles.title}>Авторизация</h1>
                    <p className={styles.sub_title}>Для входа на сайт введите ваш номер телефона</p>
                    <div className={styles.form_wrapper}>
                        <form onSubmit={handleSubmit(step === 'phone' ?
                            (data) => sendCode(data.phone) :
                            (data) => verifyCode(data.code))}
                        >
                            <div className={styles.form_item}>
                                <input
                                 id="phone"
                                 name="phone"
                                 type="text"
                                 className={`${errors.phone ? styles.error : ''}`}
                                    {...register('phone', {
                                    required: 'Введите номер',
                                    pattern: {
                                        value: /^\+7\d{10}$/,
                                        message: 'Формат: +79991234567'
                                    }
                                    })}
                                    placeholder="+79991234567"
                                />

                                <div className={styles.input_text_error}>{errors['email'] && errors['email'].message}</div>
                            </div>

                            <div className={styles.form_item_checkbox}>
                                <div className={styles.checkbox_wrapper}>
                                    <input
                                        id="checkbox"
                                        name="checkbox"
                                        type="checkbox"
                                        className={`${styles.checkbox} ${errors.checkbox ? styles.error : ''}`}
                                        {...register('checkbox', { required: { value: true, message: 'Подтвердите согласие' } })}
                                        error={errors.name}
                                    />
                                    <div>
                                        Нажимая кнопку, даю согласие на <Link href='/policy'>обработку персональных данных</Link>
                                    </div>
                                </div>

                                <div className={styles.input_text_error}>{errors['checkbox'] && errors['checkbox'].message}</div>
                            </div>


                            <button type='submit' className={styles.form_button}>
                                Получить код
                                {!isSending &&
                                    <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M4.05507 1.43907L17.1536 1.43888M17.1536 1.43888L17.1536 14.3511M17.1536 1.43888L1.93782 16.6546" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                }

                                {isSending &&
                                    <svg width="25" height="25" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><radialGradient id="a9" cx=".66" fx=".66" cy=".3125" fy=".3125" gradientTransform="scale(1.5)"><stop offset="0" stopColor="#000000"></stop><stop offset=".3" stopColor="#000000" stopOpacity=".9"></stop><stop offset=".6" stopColor="#000000" stopOpacity=".6"></stop><stop offset=".8" stopColor="#000000" stopOpacity=".3"></stop><stop offset="1" stopColor="#000000" stopOpacity="0"></stop></radialGradient><circle transformOrigin="center" fill="none" stroke="url(#a9)" strokeWidth="15" strokeLinecap="round" strokeDasharray="200 1000" strokeDashoffset="0" cx="100" cy="100" r="70"><animateTransform type="rotate" attributeName="transform" calcMode="spline" dur="2" values="360;0" keyTimes="0;1" keySplines="0 0 1 1" repeatCount="indefinite"></animateTransform></circle><circle transformOrigin="center" fill="none" opacity=".2" stroke="#000000" strokeWidth="15" strokeLinecap="round" cx="100" cy="100" r="70"></circle></svg>
                                }
                            </button>
                            {error && <div className={styles.error_message}>{error}</div>}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;