'use client'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

import Image from "next/image";
import { useState, useEffect } from "react";

import styles from './style.module.scss';
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const MainSlider = () => {
    const [headerHeight, setHeaderHeight] = useState(0);

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

    return (
        <section className={styles.main_slider} style={{ marginTop: `-${headerHeight}px` }}>
            <h2 className="visually-hidden">магазин Компас СП</h2>

            <Swiper
                spaceBetween={20}
                loop={true}
                modules={[Navigation, Pagination]}
                pagination={{
                    clickable: true,
                    el: '.custom-pagination',
                }}
                breakpoints={{
                    320: { slidesPerView: 1 },
                }}
                // отправляем кастомное событие при клике на слайдер
                onTouchEnd={(swiper, event) => {
                    document.dispatchEvent(new CustomEvent("sliderClick"));
                }}
            >
                <SwiperSlide>
                    <Image
                        className={styles.slide}
                        src="/remove/slide.webp"
                        alt="logo"
                        width={1920}
                        height={910}
                        placeholder="blur"
                        blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQ0MiIgaGVpZ2h0PSIxMTg5IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNjY2MiIC8+PC9zdmc+" priority
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <Image
                        className={styles.slide}
                        src="/remove/slide.webp"
                        alt="logo"
                        width={1920}
                        height={910}
                        placeholder="blur"
                        blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQ0MiIgaGVpZ2h0PSIxMTg5IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNjY2MiIC8+PC9zdmc+" priority
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <Image
                        className={styles.slide}
                        src="/remove/slide.webp"
                        alt="logo"
                        width={1920}
                        height={910}
                        placeholder="blur"
                        blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQ0MiIgaGVpZ2h0PSIxMTg5IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNjY2MiIC8+PC9zdmc+" priority
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <Image
                        className={styles.slide}
                        src="/remove/slide.webp"
                        alt="logo"
                        width={1920}
                        height={910}
                        placeholder="blur"
                        blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQ0MiIgaGVpZ2h0PSIxMTg5IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNjY2MiIC8+PC9zdmc+" priority
                    />
                </SwiperSlide>
            </Swiper>

            <div className={styles.pagination_wrapper}>
                <div className={`custom-pagination ${styles.custom_pagination}`} />
            </div>

        </section>
    );
}

export default MainSlider;