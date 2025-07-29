'use client'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

import Image from "next/image";
import placeholder from '../../../public/remove/category-slide.jpg';
import { useState, useEffect } from "react";

import arrow from '../../../public/icons/arrow-white.svg';

import styles from './style.module.scss';
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// const url = `${process.env.NEXT_PUBLIC_DOMAIN}/api/categories?filters[isMainParent][$eq]=true&sort[0]=name:asc&populate=*`
const url = `${process.env.NEXT_PUBLIC_DOMAIN}/api/categories?filters[isMainParent][$eq]=true&sort[0]=name:asc&populate=image`
const domain = `${process.env.NEXT_PUBLIC_DOMAIN}`;

import fetchData from '@/app/utils/fetchData';
import Link from 'next/link';

const CategoryList = () => {
    const [isMobile, setIsMobile] = useState(false);
    const [slides, setSlides] = useState([]);
    const [isHover, setIsHover] = useState(false);

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
                                                        src={`${domain}${slide?.image?.url}`}
                                                        alt="logo"
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
                                                    alt="logo"
                                                    height={223}
                                                    placeholder="blur"
                                                    blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQ0MiIgaGVpZ2h0PSIxMTg5IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNjY2MiIC8+PC9zdmc+" priority
                                                />
                                            }
                                        </div>
                                        <h3 className={styles.text}>{slide?.name}</h3>
                                    </div>
                                </SwiperSlide>

                            )
                        })}
                    </Swiper>
                ) : (
                    <ul className={styles.list}>
                        {slides.map((slide, index) => {
                            if(index < 20) {
                                return (
                                    <Link
                                        href={`/catalog?slug=${slide?.slug}`}
                                        className={styles.item}
                                        key={index}
                                        onMouseEnter={() => setIsHover(index)}
                                        onMouseLeave={() => setIsHover(null)}
                                    >
                                        <div className={styles.image_wrapper}>
                                            {slide?.image?.url
                                                ? (
                                                    
                                                    <Image
                                                        className={styles.slide}
                                                        src={`${domain}${slide?.image?.url}`}
                                                        alt="logo"
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
                                                    alt='logo'
                                                    placeholder="blur"
                                                    blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQ0MiIgaGVpZ2h0PSIxMTg5IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNjY2MiIC8+PC9zdmc+" priority
                                                />
                                            }

                                            <div className={`${styles.image_wrapper_hover} ${isHover === index ? styles.active : ''}`}>
                                                <h3>{slide?.name}</h3>
                                                <Image className={styles.arrow} src={arrow} alt='arrow' width={24} height={24} />
                                            </div>
                                        </div>
    
                                        <h3 className={styles.text}>{slide?.name}</h3>
                                    </Link>
                                )
                            }
                        })}
                    </ul>
                )}
            </div>
        </section>
    );
}

export default CategoryList;