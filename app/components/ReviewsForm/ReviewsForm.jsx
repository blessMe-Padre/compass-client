'use client'
import { useState, useEffect } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import getUserById from '@/app/utils/getUserById';
import { StarRating, Clipboard } from '@/app/components';
import useUserStore from '@/app/store/userStore';
import Image from "next/image";
import styles from './style.module.scss';

// fg9woxmrul9wtf4rofpvnkh4 id товара

// запрос на получение полных отзывов
// http://90.156.134.142:1337/api/otzyvy-tovaries?populate=*  

const uploadUrl = `${process.env.NEXT_PUBLIC_DOMAIN}/api/upload/`;
const url = `${process.env.NEXT_PUBLIC_DOMAIN}/api/otzyvy-tovaries`;

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
    const { register, watch, handleSubmit, formState: { errors }, control, reset, getValues } = useForm();
    const [sending, setSending] = useState(false); // отправка формы
    const [isSuccessSend, setIsSuccessSend] = useState(false); // успешная отправка формы
    const [submitError, setSubmitErrors] = useState(false); // ошибка при отправке формы

    const documentId = useUserStore.getState().userData?.documentId ?? '';

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
            setSending(true);
            const { response } = await sendReviewsService(reviewsData);
            if (response.ok) {
                setSending(false);
                reset();
                setIsSuccessSend(true);
            } else {
                console.error('API Error:', response.status);
                setSubmitErrors(true);
            }
        } catch (err) {
            setSubmitErrors(true);
            console.error('Fetch error:', err);
        } finally {
            setSending(false);
        }
    };

    // Работа с миниатюрами
    /**
     * тут прям нужно отрефакторить 
     */
    const [preview, setPreview] = useState(null);
    const [preview2, setPreview2] = useState(null);
    const [preview3, setPreview3] = useState(null);

    const fileList = watch('file1');
    const fileList2 = watch('file2');
    const fileList3 = watch('file3');

    useEffect(() => {
        if (fileList && fileList.length > 0) {
            const file = fileList[0];
            const objectUrl = URL.createObjectURL(file);
            setPreview(objectUrl);

            // обязательно освобождать URL при размонтировании/смене файла
            return () => URL.revokeObjectURL(objectUrl);
        } else {
            setPreview(null);
        }
    }, [fileList]);
    useEffect(() => {
        if (fileList2 && fileList2.length > 0) {
            const file = fileList2[0];
            const objectUrl = URL.createObjectURL(file);
            setPreview2(objectUrl);

            // обязательно освобождать URL при размонтировании/смене файла
            return () => URL.revokeObjectURL(objectUrl);
        } else {
            setPreview2(null);
        }
    }, [fileList2]);
    useEffect(() => {
        if (fileList3 && fileList3.length > 0) {
            const file = fileList3[0];
            const objectUrl = URL.createObjectURL(file);
            setPreview3(objectUrl);

            // обязательно освобождать URL при размонтировании/смене файла
            return () => URL.revokeObjectURL(objectUrl);
        } else {
            setPreview3(null);
        }
    }, [fileList3]);

    return (

        <>
            {!isSuccessSend ?
                <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                    <div className={styles.formInner}>
                        <h2 className={styles.title}>Оцените товар</h2>
                        <StarRating setRating={setRating} rating={rating} />
                        <div className={styles.form_item}>
                            <label htmlFor="textarea">Напишите отзыв</label>
                            <textarea
                                id="textarea"
                                {...register('textarea', { required: 'Пожалуйста, введите отзыв' })}
                                placeholder="Напишите ваш отзыв"
                            />
                            {errors.textarea && <p className={styles.inputError}>{errors.textarea.message}</p>}
                        </div>
                        <div className={styles.fileInputs}>
                            <label>
                                <input
                                    type="file"
                                    {...register('file1', {
                                        validate: {
                                            // Проверка размера — < 2 МБ
                                            lessThan2MB: files =>
                                                (files[0]?.size ?? 0) < 2 * 1024 * 1024 ||
                                                'Максимальный размер файла — 2 МБ'
                                        }
                                    })}
                                />
                                <Image
                                    className={styles.slide}
                                    src={`${preview ? preview : "/icons/upload.svg"}`}
                                    alt="upload"
                                    width={50}
                                    height={50}
                                />
                            </label>
                            <label>
                                <input
                                    type="file"
                                    {...register('file2', {
                                        validate: {
                                            // Проверка размера — < 2 МБ
                                            lessThan2MB: files =>
                                                (files[0]?.size ?? 0) < 2 * 1024 * 1024 ||
                                                'Максимальный размер файла — 2 МБ'
                                        }
                                    })}
                                />
                                <Image
                                    className={styles.slide}
                                    src={`${preview2 ? preview2 : "/icons/upload.svg"}`}
                                    alt="upload"
                                    width={50}
                                    height={50}
                                />
                            </label>
                            <label>
                                <input
                                    type="file"
                                    {...register('file3', {
                                        validate: {
                                            // Проверка размера — < 2 МБ
                                            lessThan2MB: files =>
                                                (files[0]?.size ?? 0) < 2 * 1024 * 1024 ||
                                                'Максимальный размер файла — 2 МБ'
                                        }
                                    })}
                                />
                                <Image
                                    className={styles.slide}
                                    src={`${preview3 ? preview3 : "/icons/upload.svg"}`}
                                    alt="upload"
                                    width={50}
                                    height={50}
                                />
                            </label>
                            {errors.file1 && (
                                <p className={styles.errors}>
                                    {errors.file1.message}||
                                </p>
                            )}
                            {errors.file2 && (
                                <p className={styles.errors}>
                                    {errors.file2.message}||
                                </p>
                            )}
                            {errors.file3 && (
                                <p className={styles.errors}>
                                    {errors.file3.message}||
                                </p>
                            )}
                        </div>
                    </div>

                    <button type="submit" className={styles.button} disabled={sending}>
                        {sending ? 'Отправка...' : 'Оставить отзыв'}
                    </button>

                    {submitError && (
                        <p className={styles.errors_submit}>При отправке отзыва произошла ошибка, попробуйте позже или напишите нам на почту</p>
                    )}

                    <p>Оставьте отзыв, заполнив все поля
                        и получите промокод на скидку 3%</p>
                </form>
                :
                <Clipboard />
            }
        </>

    );
}

export default ReviewsForm