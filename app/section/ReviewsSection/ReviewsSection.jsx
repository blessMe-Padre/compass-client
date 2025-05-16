
'use client';
import { useEffect, useState } from 'react';

import getReviewsByProductId from '@/app/utils/getReviewsByProductId';
import { PopupReviews } from '@/app/components';
import styles from './style.module.scss';

const ReviewsSection = ({ data }) => {
    const [activePopup, setActivePopup] = useState(false);
    const [reviews, setReviews] = useState([]);

    const id = data?.documentId;

    console.log(reviews);

    const handleClick = () => {
        setActivePopup(!activePopup);
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
                                        <div className={styles.review_ava}>ГГ</div>
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
        </>
    )
}

export default ReviewsSection