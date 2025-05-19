'use client';
import styles from './style.module.scss';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { useState } from 'react';
import { Preloader } from '..';

const url = 'http://90.156.134.142:1337/api/zayavki-na-obratnuyu-svyazs'

export async function sendNewQuestion(orderData) {
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


export default function FilterForm() {    
    
    const { register, handleSubmit, formState: { errors }, control, reset } = useForm();

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
                        <input
                            type='tel'
                            id='phone'
                            alt='phone'
                            placeholder='Телефон*'
                            className={`${errors.phone ? styles.errors : ''}`}
                            {...register('phone', {
                                required: {
                                    value: true,
                                    message: 'Телефон'
                                }
                            })}
                            error={errors.name}
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