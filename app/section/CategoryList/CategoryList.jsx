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

const slides = [
    {
        image: '/remove/category-slide.jpg',
        text: 'спецодежда',
    },
    {
        image: '/remove/category-slide-1.jpg',
        text: 'зимняя одежда',
    },
    {
        image: '/remove/category-slide.jpg',
        text: 'спецодежда',
    },
    {
        image: '/remove/category-slide.jpg',
        text: 'спецодежда',
    },
    {
        image: '/remove/category-slide.jpg',
        text: 'спецодежда',
    },
    {
        image: '/remove/category-slide.jpg',
        text: 'спецодежда',
    },
    {
        image: '/remove/category-slide.jpg',
        text: 'спецодежда',
    },
]

const CategoryList = () => {
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

    return (
        <section className={`${styles.main_slider} section`}>
            <div className="container">
                {isMobile ? (
                    <Swiper
                        className={styles.slider}
                        spaceBetween={20}
                        loop={true}
                        modules={[Navigation, Pagination]}
                        breakpoints={{
                            320: { slidesPerView: 1 },
                            375: { slidesPerView: 1.5 },
                            560: { slidesPerView: 2.5 },
                        }}
                    >
                        {slides.map((slide, index) => {
                            return (
                                <SwiperSlide key={index}>
                                    <div className={styles.slide}>
                                        <div className={styles.image_wrapper}>
                                            <Image
                                                className={styles.slide}
                                                src={slide?.image}
                                                alt="logo"
                                                width={345}
                                                height={223}
                                                placeholder="blur"
                                                blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQ0MiIgaGVpZ2h0PSIxMTg5IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNjY2MiIC8+PC9zdmc+" priority
                                            />
                                        </div>
                                        <h3 className={styles.text}>{slide?.text}</h3>
                                    </div>
                                </SwiperSlide>

                            )
                        })}
                    </Swiper>
                ) : (
                    <ul className={styles.list}>
                        {slides.map((slide, index) => {
                            return (
                                <div className={styles.item} key={index}>
                                    <div className={styles.image_wrapper}>
                                        <Image
                                            className={styles.slide}
                                            src={slide?.image}
                                            alt="logo"
                                            width={345}
                                            height={223}
                                            placeholder="blur"
                                            blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQ0MiIgaGVpZ2h0PSIxMTg5IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNjY2MiIC8+PC9zdmc+" priority
                                        />
                                    </div>

                                    <h3 className={styles.text}>{slide?.text}</h3>
                                </div>
                            )
                        })}
                    </ul>
                )}
            </div>
        </section>
    );
}

export default CategoryList;