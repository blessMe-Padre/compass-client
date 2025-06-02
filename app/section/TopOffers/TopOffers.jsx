'use client'
import React, { useState, useEffect } from 'react'
import styles from './styles.module.scss';
import { CardItem } from '../../components'
import { Swiper, SwiperSlide } from 'swiper/react';

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import fetchData from '@/app/utils/fetchData';

function TopOffers() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkIsMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        checkIsMobile();
        window.addEventListener('resize', checkIsMobile);

        return () => {
            window.removeEventListener('resize', checkIsMobile);
        };
    }, []);

    const [products, setProducts] = useState([]);

    const apiUrl = `${process.env.NEXT_PUBLIC_DOMAIN}/api/products?populate=*`;

    useEffect(() => {

        const loadData = async () => {
            try {
                const response = await fetchData(apiUrl);
                setProducts(response.data);

            } catch (error) {
                console.error('Произошла ошибка', error);
            }
        };

        loadData();
    }, []);


    return (
        <section className={styles.section_top_offers}>
            <div className='container'>
                <div className={styles.top}>
                    <h2 className={styles.title_top_offers}>
                        Лучшие предложения
                    </h2>

                    <div className={styles.link_to_catalog}>
                        <a href='/catalog'>Перейти в каталог</a>
                        <svg width="15" height="9" viewBox="0 0 15 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14.3542 4.85355C14.5495 4.65829 14.5495 4.34171 14.3542 4.14645L11.1722 0.964466C10.977 0.769204 10.6604 0.769204 10.4651 0.964466C10.2699 1.15973 10.2699 1.47631 10.4651 1.67157L13.2935 4.5L10.4651 7.32843C10.2699 7.52369 10.2699 7.84027 10.4651 8.03553C10.6604 8.2308 10.977 8.2308 11.1722 8.03553L14.3542 4.85355ZM0.910156 5H14.0007V4H0.910156V5Z" fill="#007CC2" />
                        </svg>
                    </div>
                </div>

                {isMobile
                    ? (
                        <div className={styles.swiper_wrapper}>
                            <Swiper
                                spaceBetween={20}
                                loop={true}
                                pagination={{
                                    clickable: true,
                                    el: '.custom-pagination',
                                }}

                                breakpoints={{
                                    320: { slidesPerView: 1 },
                                    375: { slidesPerView: 1.2 },
                                    560: { slidesPerView: 2.5 },
                                }}

                                // отправляем кастомное событие при клике на слайдер
                                onTouchEnd={(swiper, event) => {
                                    document.dispatchEvent(new CustomEvent("sliderClick"));
                                }}
                            >

                                {

                                    products.map((el, idx) => {
                                        if (el.hit === true) {

                                            return (
                                                <SwiperSlide key={idx}>
                                                    <CardItem element={el} />
                                                </SwiperSlide>
                                            )
                                        }
                                    }
                                    )
                                }
                            </Swiper>
                        </div>

                    )
                    : (
                        <ul className={styles.top_items}>


                            {products.map((el, idx) => {
                                if (el?.hit === true) {
                                    return (
                                        <CardItem key={idx} element={el} />

                                    )
                                } else {
                                    <div>
                                        Данных нет
                                    </div>
                                }
                            })}

                        </ul>


                    )
                }
            </div>
        </section>
    )
}

export default TopOffers