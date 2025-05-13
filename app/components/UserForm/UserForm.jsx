'use client'

import Image from "next/image";
import { useState, useRef } from 'react';
import styles from './style.module.scss'; import React from 'react'
import updateUserDateService from '@/app/utils/updateUserDateService';

const userInitialFields = [
    {
        label: 'Номер телефона*',
        type: 'text',
        name: 'phone',
        id: 'phone',
        placeholder: '+7 (999) 999-99-99',
        required: true
    },
    {
        label: 'Ваше имя*',
        type: 'text',
        name: 'username',
        id: 'username',
        placeholder: 'Введите ваше имя',
        required: true
    },
    {
        label: 'Электронная почта*',
        type: 'email',
        name: 'email',
        id: 'email',
        placeholder: 'Введите ваш email',
        required: true
    },
    {
        label: 'Дата рождения',
        type: 'text',
        name: 'dateOfBirth',
        id: 'dateOfBirth',
        placeholder: 'Введите вашу дату рождения',
    },
]
const addressInitialFields = [
    {
        label: 'Город, улица и дом',
        type: 'text',
        name: 'address',
        id: 'address',
        placeholder: 'Введите адрес',
        required: true
    },
    {
        label: 'Подъезд',
        type: 'text',
        name: 'entrance',
        id: 'entrance',
        placeholder: 'Подъезд',
    },
    {
        label: 'Код на двери',
        type: 'text',
        name: 'code',
        id: 'code',
        placeholder: '',
    },
    {
        label: 'Этаж',
        type: 'text',
        name: 'floor',
        id: 'floor',
        placeholder: '',
    },
    {
        label: 'Квартира',
        type: 'text',
        name: 'apartment',
        id: 'apartment',
        placeholder: '',
        required: true
    },
]

const UserForm = ({ user }) => {
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [pending, setPending] = useState(false);

    const userId = user?.id
    const url = 'http://90.156.134.142:1337/api/users';

    const handleSubmit = async (event) => {
        event.preventDefault();
        setSuccess(false);
        setError(false);

        const formData = new FormData(event.target);
        const formDataObj = Object.fromEntries(formData.entries());

        console.log(formDataObj);

        try {
            setPending(true);
            const response = await updateUserDateService(
                userId,
                formDataObj,
                url
            );

            // console.log('Данные обновлены:', response, formData);
            setSuccess(true);
            setPending(false);

        } catch (error) {
            console.log('Ошибка запроса, попробуйте позже', error);
            setError(true);
        } finally {
            setPending(false);
        }

    };

    // состояние, в котором для каждого поля (по id) хранится true/false
    const [editingFields, setEditingFields] = useState(
        // сразу создаём объект с ключами из полей и значением false
        userInitialFields.reduce((acc, field) => {
            acc[field.id] = false
            return acc
        }, {})
    )

    // создаём объект ref-ов для всех полей
    const inputRefs = useRef({});

    const editButtonClick = (e, fieldId) => {
        e.preventDefault()
        setEditingFields(prev => {
            const next = { ...prev, [fieldId]: true }
            return next
        })
        // даём React обновиться, а потом фокусируем
        setTimeout(() => {
            const input = inputRefs.current[fieldId]
            if (input) input.focus()
        }, 0)
    }

    return (
        <div>
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.form_wrapper}>
                    <div className={styles.form_item}>
                        <h2 className={styles.form_title}>Ваши данные</h2>
                        {userInitialFields.map(field => (
                            <div key={field.id} className={styles.form_item_wrapper}>
                                <label className={styles.form_item_label}>{field.label}</label>
                                <div className={styles.input_wrapper}>
                                    <input
                                        type={field.type}
                                        name={field.name}
                                        id={field.id}
                                        placeholder={field.placeholder}
                                        defaultValue={user?.[field.name] || ''}
                                        className={styles.input}
                                        required={field.required}
                                        disabled={!editingFields[field.id]}
                                        ref={el => {
                                            inputRefs.current[field.id] = el
                                        }}
                                    />
                                    <button
                                        className={styles.edit_button}
                                        onClick={e => editButtonClick(e, field.id)}
                                    >
                                        <Image
                                            src="/icons/edit.svg"
                                            alt="edit"
                                            width={20}
                                            height={20}
                                        />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className={styles.form_item}>
                        <h2 className={styles.form_title}>Адрес доставки</h2>
                        {addressInitialFields.map(field => (
                            <div key={field.id} className={styles.form_item_wrapper}>
                                <label className={styles.form_item_label}>{field.label}</label>
                                <div className={styles.input_wrapper}>
                                    <input
                                        type={field.type}
                                        name={field.name}
                                        id={field.id}
                                        placeholder={field.placeholder}
                                        defaultValue={user?.[field.name] || ''}
                                        className={styles.input}
                                        required={field.required}
                                        disabled={!editingFields[field.id]}
                                        ref={el => {
                                            inputRefs.current[field.id] = el
                                        }}
                                    />
                                    <button
                                        className={styles.edit_button}
                                        onClick={e => editButtonClick(e, field.id)}
                                    >
                                        <Image
                                            src="/icons/edit.svg"
                                            alt="edit"
                                            width={20}
                                            height={20}
                                        />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>

                {success && <p className={styles.success_text}>Данные успешно сохранены</p>}
                {error && <p className={styles.error_text}>Ошибка сохранения данных</p>}

                <button className={styles.link} type="submit">
                    {pending ? 'Отправка' : 'Сохранить'}
                </button>
            </form>
        </div>
    )
}

export default UserForm