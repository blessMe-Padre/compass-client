'use client'
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import styles from './style.module.scss';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Timer } from '@/app/components';
import useUserStore from '@/app/store/userStore';

const url = `${process.env.NEXT_PUBLIC_DOMAIN}/api/auth/local/`;
// Иван
// zarodiny@yandex.ru
// 123456789

// https://sms.targetsms.ru/sendsms.php


/**
const api = https://sms.targetsms.ru/sendsms.php?user=root&pwd=password&name_delivery=nameDelivery&sadr=???&dadr=${phone}&text=текст SMS


response = 1179038981
*/

const PhoneStep = ({ register, errors }) => (
    <div className={styles.form_item}>
      <input
        id="phone"
        name="phone"
        type="tel"
        className={errors.phone ? styles.error : ''}
        {...register('phone', {
          required: 'Введите номер',
          pattern: {
            value: /^\+7\d{10}$/,
            message: 'Формат: +79991234567'
          }
        })}
        placeholder="+79991234567"
      />
      {/* {errors.phone && <div className={styles.input_text_error}>{errors.phone.message}</div>} */}
    </div>
)
  
const CodeStep = ({ register, errors }) => (
    <div className={styles.form_item}>
      <input
        id="code"
        name="code"
        type="text"
        inputMode="numeric" 
        // pattern="[0-9]"
        className={errors.code ? styles.error : ''}
        {...register('code', {
          required: 'Введите код',
          minLength: { value: 6, message: 'Код должен содержать 6 цифр' },
          maxLength: { value: 6, message: 'Код должен содержать 6 цифр' }
        })}
        placeholder="123456"
      />
     
      {/* {errors.code && <div className={styles.input_text_error}>{errors.code.message}</div>} */}
    </div>
  )

const PhoneForm = ({ onSubmit, register, errors, isSending, error }) => (
    <>
        <h1 className={styles.title}>Авторизация</h1>
        <p className={styles.sub_title}>Для входа на сайт введите ваш номер телефона</p>

        <div className={styles.form_wrapper}>

            <form onSubmit={(data) => onSubmit(data)}>
                <PhoneStep register={register} errors={errors} />

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
                {/* {error && <div className={styles.error_message}>{error}</div>} */}

            </form>
        </div>
    </>
)
  
const CodeForm = ({ onSubmit, register, errors, isSending, error, phone  }) => (
    <>
        <h1 className={styles.title}>Введите код из sms</h1>
        <p className={styles.sub_title}>Отправили на номер {phone}</p>

        <div className={styles.form_wrapper}>
            <form onSubmit={onSubmit}>
                <CodeStep register={register} errors={error} />
                
                <p>Запросить новый код через <Timer isRunning={true} /></p>

                <button type='submit' className={styles.form_button}>
                    Войти
        {/* 
                    {!isSending &&
                        <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4.05507 1.43907L17.1536 1.43888M17.1536 1.43888L17.1536 14.3511M17.1536 1.43888L1.93782 16.6546" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    }

                    {isSending &&
                        <svg width="25" height="25" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><radialGradient id="a9" cx=".66" fx=".66" cy=".3125" fy=".3125" gradientTransform="scale(1.5)"><stop offset="0" stopColor="#000000"></stop><stop offset=".3" stopColor="#000000" stopOpacity=".9"></stop><stop offset=".6" stopColor="#000000" stopOpacity=".6"></stop><stop offset=".8" stopColor="#000000" stopOpacity=".3"></stop><stop offset="1" stopColor="#000000" stopOpacity="0"></stop></radialGradient><circle transformOrigin="center" fill="none" stroke="url(#a9)" strokeWidth="15" strokeLinecap="round" strokeDasharray="200 1000" strokeDashoffset="0" cx="100" cy="100" r="70"><animateTransform type="rotate" attributeName="transform" calcMode="spline" dur="2" values="360;0" keyTimes="0;1" keySplines="0 0 1 1" repeatCount="indefinite"></animateTransform></circle><circle transformOrigin="center" fill="none" opacity=".2" stroke="#000000" strokeWidth="15" strokeLinecap="round" cx="100" cy="100" r="70"></circle></svg>
                    }
                        */}
                </button>
                {/* {errors && <div className={styles.error_message}>{errors}</div>} */}
            </form>
        </div>
  </>
)

const sendCode = async (phone) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/auth/send-code`, {
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

const verifyCode = async (phone, code) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/auth/verify-code`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ phone, code })
        });

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || 'Ошибка проверки кода');
        }

        return await res.json();
    } catch (err) {
        throw err; // Пробрасываем ошибку для обработки в компоненте
    }
};


const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [step, setStep] = useState('phone');
    const [phone, setPhone] = useState('');
    const [isSending, setIsSending] = useState(false);
    const [error, setError] = useState('');
    const [jwt, setJWT] = useState('');

    const { setUserDocumentId, userData } = useUserStore();


    console.log(userData)

    useEffect(() => {
        if (jwt) {
            setStep('authSuccess')
            setAuthCookie(jwt);

            alert('Вы успешно авторизовались')
            setTimeout(() => {
                redirectToDashboard();
            }, 2000)
        }
    }, [jwt]);

    const setAuthCookie = (token) => {
        document.cookie = `jwt=${token}; path=/; max-age=${60 * 60 * 24 * 7}; Secure; SameSite=Strict`;
    };

    const redirectToDashboard = () => {
        window.location.href = '/dashboard';
    };

    const handlePhoneSubmit = async (data) => {
        setIsSending(true);
        setError('');

        try {
            await sendCode(data.phone);
            setPhone(data.phone);
            setStep('verify');
        } catch (err) {
            setError(err.message || 'Ошибка при отправке кода');
                setStep('verify')

        } finally {
            setIsSending(false);
        }
    };
    
    const handleCodeSubmit = async (data) => {
        setIsSending(true)
        setPhone(data.phone)
        try {
            const response = await verifyCode(data.phone, data.code);
            
            useUserStore.getState().setUserDocumentId(response.user.documentId);
            setJWT(response.jwt);
            
            await new Promise(resolve => setTimeout(resolve, 50));
            
            window.location.href = '/dashboard';
            
        } catch (err) {
            setError(err.message);
        } finally {
            setIsSending(false);
        }
    }

   return (
        <div className={styles.page_wrapper}>
            <div className="container">
                {step === 'phone' ? (
                    <PhoneForm
                        onSubmit={handleSubmit(handlePhoneSubmit)}
                        register={register}
                        errors={errors}
                        isSending={isSending}
                        error={error}
                    />
                ) : (
                    <CodeForm
                        onSubmit={handleSubmit(handleCodeSubmit)}
                        register={register}
                        errors={errors}
                        isSending={isSending}
                        error={error}
                        phone={phone}
                    />
                )}
            </div>
        </div>
    ) 
}

export default Login;