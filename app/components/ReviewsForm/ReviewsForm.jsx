'use client'
import { useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { StarRating } from '@/app/components';
import styles from './style.module.scss';

// fg9woxmrul9wtf4rofpvnkh4 id товара

// запрос на получение товара и его полных отзывов
// http://90.156.134.142:1337/api/products?filters[documentId][$containsi]=fg9woxmrul9wtf4rofpvnkh4&populate[otzyvy_tovaries][populate]=*  

// запрос на получение полных отзывов
// http://90.156.134.142:1337/api/otzyvy-tovaries?populate=*  

const url = 'http://90.156.134.142:1337/api/otzyvy-tovaries';

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
        return { response, data };
    } catch (error) {
        console.error("sendReviewsService Error:", error);
        throw error;
    }
}

const ReviewsForm = ({ data }) => {
    const productDocumentId = data.documentId;
    const [rating, setRating] = useState(5);
    const { register, handleSubmit, formState: { errors }, control, reset } = useForm();
    const [submitting, setSubmitting] = useState(false);


    // Собираем данные
    const name = 'Андрей';
    const fullText = useWatch({ control, name: 'textarea' });

    const onSubmit = async () => {
        setSubmitting(true);
        try {
            const reviewsData = {
                name,
                fullText,
                starsRating: rating,
                product: productDocumentId
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