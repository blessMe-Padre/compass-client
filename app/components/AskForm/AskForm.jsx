'use client';
import styles from './style.module.scss';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { useState } from 'react';
import { Preloader } from '..';

import { Controller } from 'react-hook-form';

const url = 'http://90.156.134.142:1337/api/zayavki-na-obratnuyu-svyazs'

export async function sendNewQuestion(orderData) {
    // console.log('orderData', orderData)
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ data: { ...orderData } }),
        });

        // console.log(response)

        const data = await response.json();

        return { response, data };
    } catch (error) {
        console.error("sendOrder Service Error:", error);
        throw error;
    }
}

export default function FilterForm() {

    const { register, handleSubmit, formState: { errors }, control, reset, setValue, watch } = useForm();

    const [error, setError] = useState();
    const [sending, isSending] = useState(false);

    const onSubmit = async (formData) => {
        isSending(true);

        try {
            const { response, data } = await sendNewQuestion(formData);
            if (response.ok) {
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

    // function formatPhone(raw) {
    //     const matrix = '+7 (___) ___ __ __';
    //     let i = 0;
    //     const digits = raw.replace(/\D/g, '').slice(0, 11);
    //     return matrix.replace(/./g, (a) => {
    //         if (/[_\d]/.test(a) && i < digits.length) {
    //             return digits.charAt(i++);
    //         }
    //         return i >= digits.length ? '' : a;
    //     });
    // }

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

    return (
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.form_content}>

                <div className={styles.input_wrapper}>
                    <div className={styles.wrapper}>
                        <label htmlFor="name">Ваше имя*</label>
                        <input
                            type='text'
                            id='name'
                            alt='name'
                            placeholder='Ваше имя*'
                            className={`${errors.name ? styles.errors : ''}`}
                            {...register('name', {
                                required: {
                                    value: true,
                                    message: 'Ваше имя'
                                }
                            })}
                            error={errors.name}
                        />
                    </div>

                    <div className={styles.wrapper}>
                        <label htmlFor="phone">Телефон*</label>
                        <Controller
                            name="phone"
                            control={control}
                            defaultValue=""
                            rules={{ required: 'Телефон обязателен' }}
                            render={({ field: { value, onChange, onBlur, ref } }) => (
                                <input
                                    type="tel"
                                    id="phone"
                                    placeholder="Телефон*"
                                    ref={ref}
                                    value={value}
                                    onChange={(e) => {
                                        const formatted = formatPhone(e.target.value);
                                        onChange(formatted);
                                    }}
                                    onBlur={onBlur}
                                />
                            )}
                        />
                    </div>
                </div>


                <button className={styles.button}>
                    Отправить
                    {!isSending && <Preloader />}

                    {isSending && <svg width="25" height="25" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><radialGradient id="a9" cx=".66" fx=".66" cy=".3125" fy=".3125" gradientTransform="scale(1.5)"><stop offset="0" stopColor="#000000"></stop><stop offset=".3" stopColor="#000000" stopOpacity=".9"></stop><stop offset=".6" stopColor="#000000" stopOpacity=".6"></stop><stop offset=".8" stopColor="#000000" stopOpacity=".3"></stop><stop offset="1" stopColor="#000000" stopOpacity="0"></stop></radialGradient><circle transformOrigin="center" fill="none" stroke="url(#a9)" strokeWidth="15" strokeLinecap="round" strokeDasharray="200 1000" strokeDashoffset="0" cx="100" cy="100" r="70"><animateTransform type="rotate" attributeName="transform" calcMode="spline" dur="2" values="360;0" keyTimes="0;1" keySplines="0 0 1 1" repeatCount="indefinite"></animateTransform></circle><circle transformOrigin="center" fill="none" opacity=".2" stroke="#000000" strokeWidth="15" strokeLinecap="round" cx="100" cy="100" r="70"></circle></svg>}
                </button>

                {error && <div className={styles.error_message}>{error}</div>}

                <div className={styles.form_item_checkbox}>
                    <div className={styles.checkbox_wrapper}>
                        <div>
                            Нажимая кнопку, даю согласие на <Link href='/policy'>обработку персональных данных</Link>
                        </div>
                    </div>

                    <div className={styles.input_text_error}>{errors['checkbox'] && errors['checkbox'].message}</div>
                </div>
            </div>
        </form>
    )
}