'use client';
import Image from "next/image";

import { useRef, useState, useEffect } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Thumbs } from 'swiper/modules';

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import styles from './style.module.scss';
import { AddToCartButton, Counter, TableSize } from "@/app/components";

const tabButtons = [{ title: 'Характеристики' }, { title: 'Отзывы' }, { title: 'Таблица размеров' }]

const ClientProductComponent = ({ data, variantList }) => {

    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [mainSwiper, setMainSwiper] = useState(null);
    const [active, setActive] = useState(0);
    const openTab = e => setActive(+e.target.dataset.index);

    const [direction, setDirection] = useState('vertical');

    const imageList = data?.imgs;
    const domain = 'http://90.156.134.142:1337';

    // console.log(imageList);

    useEffect(() => {
        const handleResize = () => {
            setDirection(window.innerWidth < 780 ? 'horizontal' : 'vertical');
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <section className={styles.section}>
            <div className="container">
                <h1 className={styles.title}>{data?.title}</h1>
                <div className={styles.section_wrapper}>
                    <div className={styles.slider}>
                        <div className={`${styles.thumbnail_list} thumbnail_list`}>
                            <Swiper
                                direction={direction}
                                modules={[Thumbs]}
                                watchSlidesProgress
                                onSwiper={setThumbsSwiper}
                                spaceBetween={10}
                                className={styles.thumbnail_list}
                                breakpoints={{
                                    320: { slidesPerView: 3 },
                                    450: { slidesPerView: 3.5 },
                                    500: { slidesPerView: 4 },
                                    650: { slidesPerView: 5 },
                                }}
                            >
                                {imageList.map((slide, index) => {
                                    return (

                                        <SwiperSlide key={`thumb-${index}`}>
                                            <div className={styles.thumbnail_wrapper}>
                                                <Image
                                                    className={styles.image}
                                                    src={`${domain}${slide?.url}`}
                                                    alt={`thumb-${index}`}
                                                    width={100}
                                                    height={100}
                                                    placeholder="blur"
                                                    blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQ0MiIgaGVpZ2h0PSIxMTg5IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNjY2MiIC8+PC9zdmc+" priority
                                                />
                                            </div>
                                        </SwiperSlide>

                                    )
                                }
                                )
                                }

                            </Swiper>
                        </div>

                        <div>
                            <Swiper
                                onSwiper={setMainSwiper}
                                spaceBetween={20}
                                loop={true}
                                className={styles.main_slider}
                                breakpoints={{ 320: { slidesPerView: 1 } }}
                                modules={[Thumbs]}
                                thumbs={{ swiper: thumbsSwiper }}
                            >
                                {imageList.map((slide, index) => (
                                    <SwiperSlide key={`main-${index}`}>
                                        <div className={styles.slide}>
                                            <div className={styles.image_wrapper}>
                                                <Image
                                                    className={styles.image}
                                                    src={`${domain}${slide?.url}`}
                                                    alt={`main-${index}`}
                                                    width={582}
                                                    height={730}
                                                    placeholder="blur"
                                                    blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQ0MiIgaGVpZ2h0PSIxMTg5IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNjY2MiIC8+PC9zdmc+" priority
                                                />
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    </div>
                    <div className={styles.description}>
                        <p className={styles.article}>Артикул: Z00014</p>
                        <ul className={styles.list}>
                            <li className={styles.list_header}>
                                <div className={styles.list_header_text}>Размер:</div>
                                <div className={styles.list_header_text}>Рост:</div>
                                <div className={styles.list_header_text}>Кол-во:</div>
                            </li>
                            {
                                variantList.map((item, index) => {
                                    return (
                                        <li className={styles.list_item} key={index}>
                                            <div className={styles.size}>{item.size}</div>
                                            <div className={styles.height}>{item.height}</div>
                                            <div className={styles.qty}>
                                                <Counter />
                                            </div>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                        <div className={styles.total}>Итого: 18 193 ₽/шт <span>  25 990 ₽</span></div>
                        <AddToCartButton text={'В корзину'} />
                    </div>
                </div>

                <div className={styles.tab_buttons_wrapper}>
                    {
                        tabButtons.map((button, index) => (
                            <button
                                className={`${styles.tabs_btn} ${index === active ? `${styles.btn_active}` : ''}`}
                                onClick={openTab}
                                data-index={index}
                                key={index}
                            >{button.title}</button>
                        ))
                    }
                </div>
                <div
                    className={`${active === 0 ? `${styles.block}` : `${styles.none}`}`}
                >Характеристики</div>
                <div
                    className={`${active === 1 ? `${styles.block}` : `${styles.none}`}`}
                >Отзывы</div>
                <div
                    className={`${active === 2 ? `${styles.block}` : `${styles.none}`}`}
                >
                    <TableSize />
                </div>
            </div>

        </section>
    )
}

export default ClientProductComponent

