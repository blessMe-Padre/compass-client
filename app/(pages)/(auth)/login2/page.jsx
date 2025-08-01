'use client'
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import styles from './style.module.scss';

import Link from 'next/link';
import { Timer } from '@/app/components';
import useUserStore from '@/app/store/userStore';
import { useRef } from 'react';


const PhoneStep = ({ register, errors }) => {
    const handlePhoneInput = (e) => {
        // Удаляем все нецифровые символы
        let value = e.target.value.replace(/\D/g, '');

        // Если ввод начинается не с 7, добавляем +7
        if (!value.startsWith('7') && value.length > 0) {
            value = '7' + value;
        }

        // Ограничиваем длину (1 для 7 + 10 цифр)
        if (value.length > 11) {
            value = value.substring(0, 11);
        }

        // Форматируем значение
        if (value.length > 1) {
            e.target.value = `+7${value.substring(1)}`;
        } else if (value.length === 1) {
            e.target.value = '+7';
        } else {
            e.target.value = '';
        }
    };

    return (
        <div className={styles.form_item}>
            <input
                id="phone"
                name="phone"
                type="tel"
                className={errors.phone ? styles.error : ''}
                onInput={handlePhoneInput}
                {...register('phone', {
                    required: 'Введите номер',
                    pattern: {
                        value: /^\+7\d{10}$/,
                        message: 'Формат ввода: +79991234567'
                    }
                })}
                placeholder="+79991234567"
                maxLength="12"
            />
            {errors.phone && <div className={styles.input_text_error}>{errors.phone.message}</div>}
        </div>
    );
};

const CodeStep = ({ register, errors, setValue }) => {
    const [code, setCode] = useState(['', '', '', '', '', '']);
    const inputs = useRef([]);

    const handleChange = (e, index) => {
        const value = e.target.value.replace(/\D/g, '');
        const newCode = [...code];
        newCode[index] = value;
        setCode(newCode);
        setValue('code', newCode.join(''), { shouldValidate: true });

        if (value && index < 5) {
            inputs.current[index + 1].focus();
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace' && !code[index] && index > 0) {
            inputs.current[index - 1].focus();
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
        const newCode = pasted.split('').concat(Array(6).fill('')).slice(0, 6);
        setCode(newCode);
        setValue('code', pasted, { shouldValidate: true });
    };

    return (
        <div className={styles.form_item}>
            <div className={styles.code_input_wrapper}>
                {code.map((digit, index) => (
                    <input
                        key={index}
                        type="text"
                        maxLength="1"
                        value={digit}
                        onChange={e => handleChange(e, index)}
                        onKeyDown={e => handleKeyDown(e, index)}
                        onPaste={handlePaste}
                        ref={(el) => (inputs.current[index] = el)}
                        className={`${styles.code_input}`}
                        autoFocus={index === 0}
                    />
                ))}

                {/* Скрытое поле для react-hook-form */}
                <input
                    className='visually-hidden'
                    type="text"
                    {...register('code', {
                        required: 'Введите код',
                        minLength: { value: 6, message: 'Код должен состоять из 6 цифр' }
                    })}
                />

                {errors.code && <div className={styles.input_text_error}>{errors.code.message}</div>}

            </div>
        </div>
    )
};

const PhoneForm = ({ onSubmit, register, errors, isSending, error, step, notification }) => (
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
                {error && <div className={styles.error_message}>{error}</div>}


                <div className='relative'>
                    <div className={`${styles.captcha} g-recaptcha`} data-sitekey={process.env.NEXT_PUBLIC_CAPTCHA_SITE_KEY}></div>
                    <div className={styles.input_text_error}>{notification}</div>
                </div>
            </form>
        </div>
    </>
)

const CodeForm = ({ onSubmit, register, errors, isSending, phone, setValue, handleChangePhone, testCode, step }) => (
    <>

        <h1 className={styles.title}>Введите код <mark>{testCode}</mark> из sms</h1>
        <p className={styles.sub_title}>Отправили на номер <span style={{ fontWeight: '700' }}>{phone}</span></p>

        {step === 'verify' && (
            <p
                onClick={handleChangePhone}
                style={{
                    marginBottom: '20px',
                    textAlign: 'center',
                    textDecoration: 'underline',
                    cursor: 'pointer'
                }}>
                Изменить номер
            </p>
        )}
        <div className={styles.form_wrapper}>
            <form onSubmit={onSubmit}>
                <CodeStep register={register} errors={errors} setValue={setValue} />
                <Timer
                    isRunning={!isSending}
                    onResend={() => sendCode(phone)}
                />

                <button type='submit' className={styles.form_button}>
                    Войти
                </button>
            </form>
        </div>
    </>
)

const sendCode = async (phone, setTestCode) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/auth/send-code`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ phone })
        });

        if (!res.ok) throw new Error('Ошибка отправки кода');
        const data = await res.json();
        setTestCode(data.code);
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

        res.status === 401 ? alert('Данный код уже был использован') : ''

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
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const [step, setStep] = useState('phone');
    const [phone, setPhone] = useState('');
    const [isSending, setIsSending] = useState(false);
    const [error, setError] = useState('');
    const [jwt, setJWT] = useState('');
    const [notification, setNotification] = useState("");

    const [testCode, setTestCode] = useState();

    const { userData } = useUserStore();

    const handleChangePhone = () => {
        setPhone('');
        setStep('phone');
        setError('');
        setIsSending(false);
    };

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
        setNotification('Пройдите капчу');

        // 1. Получаем токен reCAPTCHA
        const captureResponse = grecaptcha.getResponse();
        if (!captureResponse) {
            setIsSending(false);
            return;
        }

        setPhone(data.phone);

        try {
            // 2. Проверяем токен на сервере
            const res = await fetch('/api/captcha', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ captureResponse })
            });

            const result = await res.json();
            setNotification(result.message);

            if (!result.ok) {
                setIsSending(false);
                return;
            }

            // 3. reCAPTCHA пройдена — отправляем СМС-код
            await sendCode(data.phone, setTestCode);
            setStep('verify');

        } catch (err) {
            setError(err.message || 'Ошибка при отправке кода');
            setStep('verify');
        } finally {
            setIsSending(false);
        }
    };


    const handleCodeSubmit = async (data) => {
        setIsSending(true)
        try {
            const response = await verifyCode(phone, data.code);

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
                        step={step}
                        notification={notification}
                    />
                ) : (
                    <CodeForm
                        testCode={testCode}
                        onSubmit={handleSubmit(handleCodeSubmit)}
                        register={register}
                        errors={errors}
                        isSending={isSending}
                        handleChangePhone={handleChangePhone}
                        setValue={setValue}
                        error={error}
                        step={step}
                        phone={phone}
                    />
                )}
            </div>
        </div>
    )
}

export default Login;