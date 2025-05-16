
'use client';
import { useEffect, useState } from 'react';

import getReviewsByProductId from '@/app/utils/getReviewsByProductId';
import { PopupReviews, PopupText } from '@/app/components';
import styles from './style.module.scss';

const ReviewsSection = ({ data }) => {
    const [activePopup, setActivePopup] = useState(false);
    const [activePopupText, setActivePopupText] = useState(false);
    const [reviews, setReviews] = useState([]);

    // Проверка на авторизацию
    const [auth, setAuth] = useState(false);

    useEffect(() => {
        const getCookie = (name) => {
            const value = `; ${document.cookie}`;
            const parts = value.split(`; ${name}=`);
            if (parts.length === 2) return parts.pop().split(';').shift();
        }

        const jwt = getCookie('jwt');
        console.log('VALUE ===', jwt);
        setAuth(!!jwt);
    }, []);

    const id = data?.documentId;

    const handleClick = () => {

        if (auth) {
            setActivePopup(!activePopup);
        } else {
            // alert('зарегистрируйтесь');
            setActivePopupText(!activePopupText);
        }
    }

    useEffect(() => {
        const loadData = async () => {
            try {
                const response = await getReviewsByProductId(id);
                setReviews(response?.otzyvy_tovaries);

            } catch (error) {
                console.error('Произошла ошибка', error);
            }
        };

        loadData();
    }, []);

    function getInitials(fullName) {
        const parts = fullName.trim().split(/\s+/);
        const [firstName, lastName] = parts;
        if (!lastName) {
            return firstName[0].toUpperCase();
        }
        return firstName[0].toUpperCase() + lastName[0].toUpperCase();
    }

    return (

        <>
            <section className={styles.section}>
                <button
                    className={styles.button}
                    onClick={handleClick}
                >
                    Оставить отзыв
                </button>

                <ul className={styles.list}>

                    {
                        reviews.filter(item => item.approved).map((item, index) => {
                            const date = new Date(item.publishedAt);

                            return (
                                <li key={index} className={styles.review_item}>
                                    <div className={styles.review_header}>
                                        <div className={styles.review_ava}>{getInitials(item?.name)}</div>
                                        <div className={styles.review_name}>{item?.name}</div>
                                    </div>
                                    <p className={styles.review_text}>{item?.fullText}</p>
                                    <div className={styles.review_footer}>
                                        <div>
                                            {
                                                date.toLocaleDateString('ru-RU', {
                                                    day: 'numeric',
                                                    month: 'long',
                                                    year: 'numeric'
                                                })
                                            }
                                        </div>
                                        <div>
                                            {[...Array(item?.starsRating)].map((_, index) => {
                                                return (
                                                    < svg key={index} width="25" height="23" viewBox="0 0 25 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M12.5 0L15.3064 8.63729H24.3882L17.0409 13.9754L19.8473 22.6127L12.5 17.2746L5.15268 22.6127L7.95911 13.9754L0.611794 8.63729H9.69357L12.5 0Z" fill="#F79410" />
                                                    </svg>
                                                )
                                            })}
                                        </div>
                                    </div>
                                </li>
                            )
                        })
                    }

                </ul>
            </section >

            <PopupReviews
                data={data}
                activePopup={activePopup}
                setActivePopup={setActivePopup}
            />

            <PopupText
                title='Оцените товар'
                activePopupText={activePopupText}
                setActivePopupText={setActivePopupText}
            />
        </>
    )
}

export default ReviewsSection