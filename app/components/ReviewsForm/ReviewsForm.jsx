'use client'
import { useState, useEffect } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import getUserById from '@/app/utils/getUserById';
import { StarRating } from '@/app/components';
import styles from './style.module.scss';

// fg9woxmrul9wtf4rofpvnkh4 id товара

// получение отзывов по id товара 
//http://90.156.134.142:1337/api/products?filters[documentId][$containsi]=fg9woxmrul9wtf4rofpvnkh4&populate[otzyvy_tovaries][populate]=*

// запрос на получение полных отзывов
// http://90.156.134.142:1337/api/otzyvy-tovaries?populate=*  

const uploadUrl = 'http://90.156.134.142:1337/api/upload/';
const url = 'http://90.156.134.142:1337/api/otzyvy-tovaries';

export async function uploadFiles(files) {
    const formData = new FormData();

    files.forEach((file) => {
        if (file) formData.append('files', file);
    });

    const response = await fetch(uploadUrl, {
        method: 'POST',
        body: formData,
    });
    if (!response.ok) {
        throw new Error(`Upload failed: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
}
export async function sendReviewsService(reviewsData) {
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                data: { ...reviewsData }
            })
        });
        const data = await response.json();
        console.log('отправка');

        return { response, data };
    } catch (error) {
        console.error("sendReviewsService Error:", error);
        throw error;
    }
}

const ReviewsForm = ({ data }) => {
    const [rating, setRating] = useState(5);
    const [user, setUser] = useState({});

    const productDocumentId = data.documentId;
    const { register, handleSubmit, formState: { errors }, control, reset, getValues } = useForm();
    const [submitting, setSubmitting] = useState(false);

    // получаем юзера
    const documentId = 'f9bh8d19a9ij1gg5zegvposx';
    useEffect(() => {
        const loadData = async () => {
            try {
                const response = await getUserById(documentId);
                setUser(response[0]);

            } catch (error) {
                console.error('Произошла ошибка', error);
            }
        };

        loadData();
    }, []);

    // Собираем данные
    const name = user?.username;
    const fullText = useWatch({ control, name: 'textarea' });
    const userName = user?.documentId;

    const onSubmit = async (formData) => {
        try {
            const files = [
                formData.file1?.[0],
                formData.file2?.[0],
                formData.file3?.[0]
            ].filter(Boolean);

            let uploaded = [];
            if (files.length > 0) {
                uploaded = await uploadFiles(files);
            }

            const fileIds = uploaded.map((file) => file.id);

            const reviewsData = {
                name,
                fullText,
                starsRating: rating,
                product: productDocumentId,
                customers: userName,
                file: fileIds
            };

            const { response } = await sendReviewsService(reviewsData);
            if (response.ok) {
                reset();
            } else {
                console.error('API Error:', response.status);
            }
        } catch (err) {
            console.error('Fetch error:', err);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <div className={styles.formInner}>
                <StarRating setRating={setRating} rating={rating} />
                <div>
                    <label htmlFor="textarea">Ваш отзыв</label>
                    <textarea
                        id="textarea"
                        {...register('textarea', { required: 'Пожалуйста, введите отзыв' })}
                        placeholder="Напишите ваш отзыв"
                    />
                    {errors.textarea && <p className={styles.inputError}>{errors.textarea.message}</p>}
                </div>
                <div className={styles.fileInputs}>
                    <input type="file" {...register('file1')} />
                    <input type="file" {...register('file2')} />
                    <input type="file" {...register('file3')} />
                </div>
            </div>

            <button type="submit" className={styles.submitButton}>
                {submitting ? 'Отправка...' : 'Оставить отзыв'}
            </button>
        </form>
    );
}

export default ReviewsForm