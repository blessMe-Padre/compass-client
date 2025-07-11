
'use client';
import { useEffect, useState } from 'react';

import getReviewsByProductId from '@/app/utils/getReviewsByProductId';
import { PopupReviews, PopupText } from '@/app/components';

import Image from 'next/image';
import PhotoSwipeLightbox from 'photoswipe/lightbox';
import 'photoswipe/style.css';

import styles from './style.module.scss';

const ReviewsSection = ({ data }) => {
    const [activePopup, setActivePopup] = useState(false);
    const [activePopupText, setActivePopupText] = useState(false);
    const [reviews, setReviews] = useState([]);
    const [isExpanded, setIsExpanded] = useState(false);

    const domain = `${process.env.NEXT_PUBLIC_DOMAIN}`;
    const PREVIEW_LIMIT = 160;

    // Проверка на авторизацию
    const [auth, setAuth] = useState(false);

    useEffect(() => {
        const getCookie = (name) => {
            const value = `; ${document.cookie}`;
            const parts = value.split(`; ${name}=`);
            if (parts.length === 2) return parts.pop().split(';').shift();
        }

        const jwt = getCookie('jwt');
        setAuth(!!jwt);
    }, []);

    const id = data?.documentId;

    const handleClick = () => {
        if (auth) {
            setActivePopup(!activePopup);
        } else {
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

    useEffect(() => {
        if (!reviews) return;

        let lightbox = new PhotoSwipeLightbox({
            gallery: '.pswp-gallery',
            children: 'a',
            pswpModule: () => import('photoswipe'),
        });
        lightbox.init();

        return () => {
            lightbox.destroy();
            lightbox = null;
        };
    }, [reviews]);

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
                                    {item?.file && (
                                        <div className="pswp-gallery">
                                            <ul className={styles.gallery_list}>

                                                {item?.file?.map((image, index) => {
                                                    return (
                                                        <li key={index}>
                                                            <a
                                                                href={`${domain}${image?.url}`}
                                                                data-pswp-width={image.width}
                                                                data-pswp-height={image.height}
                                                                target='_blank'
                                                                rel="noreferrer"
                                                                key={index}
                                                                className={`${styles.img_wrapper} dsv-image`}
                                                            >
                                                                <Image
                                                                    src={`${domain}${image?.url}`}
                                                                    alt="фото отзыва"
                                                                    width={200}
                                                                    height={200}
                                                                    placeholder="blur"
                                                                    blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQ0MiIgaGVpZ2h0PSIxMTg5IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNjY2MiIC8+PC9zdmc+" priority
                                                                />

                                                            </a>
                                                        </li>
                                                    )
                                                })
                                                }
                                            </ul>
                                        </div>
                                    )}

                                    <p className={`${styles.review_text} ${isExpanded ? styles.expanded : ''}`}>
                                        {item?.fullText}
                                    </p>
                                    {

                                        item?.fullText && item?.fullText.length > PREVIEW_LIMIT && (
                                            <span
                                                className={styles.read_more_btn}
                                                onClick={() => setIsExpanded(!isExpanded)}
                                            >
                                                {isExpanded ? 'Свернуть' : 'Читать далее...'}
                                            </span>
                                        )
                                    }

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

            {/* <div className="pswp-gallery2">
                <a
                    href='/info2.png'
                    data-pswp-width={200}
                    data-pswp-height={200}
                    target="_blank"
                    rel="noreferrer"
                >
                    <Image
                        className='3333'
                        src='/info2.png'
                        alt="фото отзыва"
                        width={200}
                        height={200}
                        placeholder="blur"
                        blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQ0MiIgaGVpZ2h0PSIxMTg5IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNjY2MiIC8+PC9zdmc+" priority
                    />
                </a>
            </div> */}
        </>
    )
}

export default ReviewsSection