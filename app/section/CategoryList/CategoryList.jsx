'use client'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

import Image from "next/image";
import placeholder from '../../../public/remove/category-slide.jpg';
import { useState, useEffect } from "react";

import styles from './style.module.scss';
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const url = 'http://90.156.134.142:1337/api/categories?populate=*'
const domain = 'http://90.156.134.142:1337';

import fetchData from '@/app/utils/fetchData';
import Link from 'next/link';

const CategoryList = () => {
    const [isMobile, setIsMobile] = useState(false);
    const [slides, setSlides] = useState([]);

    useEffect(() => {
        try {
            const getCategories = async () => {
            const response = await fetchData(url);
            const data = response.data;
            setSlides(data);
        }
            getCategories();
        }
        catch (error) {
            console.error(error)
        }
    }, [])

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
                                            {slide?.image?.url
                                                ? (
                                                    <Image
                                                        className={styles.slide}
                                                        src={`${domain}${slide?.image?.url}`}                                                alt="logo"
                                                        width={345}
                                                        height={223}
                                                        placeholder="blur"
                                                        blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQ0MiIgaGVpZ2h0PSIxMTg5IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNjY2MiIC8+PC9zdmc+" priority
                                                    />
                                                )
                                                : <Image
                                                        src={placeholder}
                                                        className={styles.slide}
                                                        width={345}
                                                        height={223}
                                                        placeholder="blur"
                                                        blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQ0MiIgaGVpZ2h0PSIxMTg5IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNjY2MiIC8+PC9zdmc+" priority
                                                    />
                                                }
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
           
                                console.log(slide?.image?.formats?.thumbnail?.url)
                                return (
                                    <Link href={'/catalog'} className={styles.item} key={index}>
                                        <div className={styles.image_wrapper}>
                                            {slide?.image?.url
                                                ? (
                                                    <Image
                                                        className={styles.slide}
                                                        src={`${domain}${slide?.image?.url}`}                                                alt="logo"
                                                        width={345}
                                                        height={223}
                                                        placeholder="blur"
                                                        blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQ0MiIgaGVpZ2h0PSIxMTg5IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNjY2MiIC8+PC9zdmc+" priority
                                                    />
                                                )
                                                : <Image
                                                        src={placeholder}
                                                        className={styles.slide}
                                                        width={345}
                                                        height={223}
                                                        placeholder="blur"
                                                        blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQ0MiIgaGVpZ2h0PSIxMTg5IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNjY2MiIC8+PC9zdmc+" priority
                                                    />
                                                }
                                        </div>

                                        <h3 className={styles.text}>{slide?.name}</h3>
                                    </Link>
                                )
                        })}
                    </ul>
                )}
            </div>
        </section>
    );
}

export default CategoryList;