import styles from './style.module.scss'; import React from 'react'
import updateUserDateService from '@/app/utils/updateUserDateService';
// Перебираем и выводим каждую пару ключ-значение
// for (let [key, value] of formData.entries()) {
//     console.log(`${key}: ${value}`);
// }

const userInitialFields = [
    {
        label: 'Номер телефона*',
        type: 'text',
        name: 'phone',
        id: 'phone',
        placeholder: '+7 (999) 999-99-99',
    },
    {
        label: 'Ваше имя*',
        type: 'text',
        name: 'username',
        id: 'username',
        placeholder: 'Введите ваше имя',
    },
    {
        label: 'Электронная почта',
        type: 'email',
        name: 'email',
        id: 'email',
        placeholder: 'Введите ваш email',
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
    },
]

const UserForm = ({ user }) => {
    // console.log(user);
    const url = 'http://90.156.134.142:1337/api/users';

    const updateUserDateService = async (userId, data, url) => {
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzQ1NDczMDYxLCJleHAiOjE3NDgwNjUwNjF9.6bTH2moCytFgkt3u8Va1PZbAvz5D-jgVXFdH1kI_V7M';  // убедитесь, что в строке только ASCII-символы

        // Создаём пустой Headers-объект и добавляем строго ASCII-строки:
        const headers = new Headers();
        headers.append('Content-Type', 'application/json;charset=UTF-8');
        // headers.append('Authorization', `Bearer ${token}`);

        const response = await fetch(`${url}/${userId}`, {
            method: 'PUT',
            headers,
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData?.error?.message || 'Ошибка при обновлении пользователя');
        }

        return await response.json();
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const formDataObj = Object.fromEntries(formData.entries());
        console.log("Данные, отправляемые на сервер:", formDataObj);

        try {

            response = await updateUserDateService(
                2,
                formDataObj,
                url
            );
            console.log('Данные обновлены:', response, formData);


        } catch (error) {
            console.log('Ошибка запроса, попробуйте позже', error);
        }
    };


    return (
        <div>
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.form_wrapper}>
                    <div className={styles.form_item}>
                        <h2>Ваши данные</h2>
                        {userInitialFields.map(field => (
                            <div key={field.id} className={styles.form_item_wrapper}>
                                <label>{field.label}</label>
                                <input type={field.type} name={field.name} id={field.id} placeholder={field.placeholder}
                                    defaultValue={user?.[field.name] || ''} />

                            </div>
                        ))}
                    </div>
                    <div className={styles.form_item}>
                        <h2>Адрес доставки</h2>
                        {addressInitialFields.map(field => (
                            <div key={field.id} className={styles.form_item_wrapper}>
                                <label>{field.label}</label>
                                <input type={field.type} name={field.name} id={field.id} placeholder={field.placeholder}
                                    defaultValue={user?.[field.name] || ''} />
                            </div>
                        ))}
                    </div>

                </div>

                <button type="submit">Сохранить</button>
            </form>
        </div>
    )
}

export default UserForm