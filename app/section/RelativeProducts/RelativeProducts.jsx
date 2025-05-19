/**
 * Получает все продукты. Продумать логику получения определенных товаров
 */

'use client'

import React, { useRef, useState, useEffect } from 'react'
import styles from './style.module.scss';
import { CardItem } from '../../components'
import { Swiper, SwiperSlide } from 'swiper/react';

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import fetchData from '@/app/utils/fetchData';

const RelativeProducts = () => {
    const [products, setProducts] = useState([]);
    const apiUrl = `${process.env.NEXT_PUBLIC_DOMAIN}/api/products?populate=*`;

    const swiperRef = useRef(null);
    const [current, setCurrent] = useState(1);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        setTotal(products.filter(p => p.hit).length);
    }, [products]);

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
        <section className={styles.section}>
            <div className="container">
                <div className={styles.section_header}>
                    <h2 className={styles.section_title}>вам может понравится</h2>
                    <div className={styles.navigation}>
                        <button
                            className={styles.button}
                            onClick={() => swiperRef.current?.slidePrev()}
                        >
                            <svg width="33" height="15" viewBox="0 0 33 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0.801987 8.20711C0.411463 7.81658 0.411463 7.18342 0.801987 6.79289L7.16595 0.428932C7.55647 0.0384078 8.18964 0.0384078 8.58016 0.428932C8.97069 0.819457 8.97069 1.45262 8.58016 1.84315L2.92331 7.5L8.58016 13.1569C8.97069 13.5474 8.97069 14.1805 8.58016 14.5711C8.18964 14.9616 7.55647 14.9616 7.16595 14.5711L0.801987 8.20711ZM32.2539 8.5H1.50909V6.5H32.2539V8.5Z" />
                            </svg>
                        </button>
                        <span className={styles.nav_counter}>
                            {String(current).padStart(2, '0')}｜{String(total).padStart(2, '0')}
                        </span>
                        <button
                            className={styles.button}
                            onClick={() => swiperRef.current?.slideNext()}
                        >
                            <svg width="32" height="15" viewBox="0 0 32 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M31.7058 8.20711C32.0963 7.81658 32.0963 7.18342 31.7058 6.79289L25.3419 0.428932C24.9513 0.0384078 24.3182 0.0384078 23.9277 0.428932C23.5371 0.819457 23.5371 1.45262 23.9277 1.84315L29.5845 7.5L23.9277 13.1569C23.5371 13.5474 23.5371 14.1805 23.9277 14.5711C24.3182 14.9616 24.9513 14.9616 25.3419 14.5711L31.7058 8.20711ZM0.253906 8.5H30.9987V6.5H0.253906V8.5Z" />
                            </svg>
                        </button>
                    </div>
                </div>

                <div className={styles.swiper_wrapper}>
                    <Swiper
                        onSwiper={(sw) => (swiperRef.current = sw)}
                        onSlideChange={(sw) => setCurrent(sw.realIndex + 1)}
                        spaceBetween={20}
                        loop={true}
                        pagination={false}
                        allowTouchMove={false}
                        breakpoints={{
                            320: { slidesPerView: 1 },
                            375: { slidesPerView: 1.5 },
                            560: { slidesPerView: 2 },
                            760: { slidesPerView: 3 },
                            920: { slidesPerView: 4 },
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
            </div>
        </section>
    )
}

export default RelativeProducts