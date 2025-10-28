'use client'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

import Image from "next/image";
import { useState, useEffect } from "react";

import styles from './style.module.scss';
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { LinkButton } from '@/app/components';

import fetchData from '@/app/utils/fetchData';

const slides = [
    {
        image: '/remove/slide.webp',
        text: 'Скидки 40% на зимнюю коллекцию',
    },
    {
        image: '/remove/slide.webp',
        text: 'Скидки 50% на зимнюю коллекцию',
    },
]

const url = `${process.env.NEXT_PUBLIC_DOMAIN}/api/glavnyj-slajder?populate[slide][populate]=*`
const domain = `${process.env.NEXT_PUBLIC_DOMAIN}`;

const MainSlider = () => {
    const [headerHeight, setHeaderHeight] = useState(0);
    const [slides, setSlides] = useState([]);

    useEffect(() => {
        // Получаем высоту хедера после монтирования компонента
        const header = document.querySelector('header');
        if (header) {
            setHeaderHeight(header.offsetHeight);
        }

        // Добавляем обработчик ресайза для обновления высоты
        const handleResize = () => {
            if (header) {
                setHeaderHeight(header.offsetHeight);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        try {
            const getCategories = async () => {
                const response = await fetchData(url);
                const data = response.data;
                setSlides(data?.slide);
            }
            getCategories();
        }
        catch (error) {
            console.error(error)
        }
    }, [])

    return (
        <section className={styles.main_slider} style={{ marginTop: `-${headerHeight}px` }}>
            <Swiper
                spaceBetween={20}
                loop={true}
                modules={[Navigation, Pagination]}
                navigation={{
                    nextEl: '.custom-navigation .swiper-button-next',
                    prevEl: '.custom-navigation .swiper-button-prev',
                }}
                pagination={{
                    clickable: true,
                    el: '.custom-pagination',
                }}
                breakpoints={{
                    320: { slidesPerView: 1 },
                }}
            >
                {slides.map((slide, index) => {
                    return (
                        <SwiperSlide key={index}>
                            <div className={styles.slide}>
                                <div className={styles.image_wrapper}>
                                    <Image
                                        className={styles.slide}
                                        src={`${domain}${slide?.image?.url}`}
                                        alt="logo"
                                        width={1920}
                                        height={910}
                                        placeholder="blur"
                                        blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQ0MiIgaGVpZ2h0PSIxMTg5IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNjY2MiIC8+PC9zdmc+" priority
                                    />
                                </div>
                                <div className={styles.slide_content}>
                                    <h2 className={styles.slide_text}>{slide?.text}</h2>
                                    <p style={{ fontSize: '20px', fontWeight: 'bold' }}>
                                      Уважаемые гости! <br />
                                    </p>
                                    <p style={{ color: 'red', fontSize: '20px', fontWeight: 'bold' }}>
                                        Сайт работает в тестовом режиме! <br />
                                        Страницы находятся в стадии наполнения!
                                    </p>
                                    <LinkButton
                                        href="/catalog"
                                        text="В каталог"
                                    />
                                </div>
                            </div>
                        </SwiperSlide>
                    )
                })}
                <div className={`custom-pagination ${styles.custom_pagination}`} />

                <div className={`custom-navigation ${styles.custom_navigation}`}>
                    <button className="swiper-button-next" />
                    <button className="swiper-button-prev" />
                </div>
            </Swiper>
        </section>
    );
}

export default MainSlider;