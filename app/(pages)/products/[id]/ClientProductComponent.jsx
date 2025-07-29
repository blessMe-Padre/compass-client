'use client';
import Image from "next/image";

import React, { useState, useEffect, useMemo } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Thumbs } from 'swiper/modules';

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import styles from './style.module.scss';
import { AddToCartButton, Counter, TableSize, FavoriteBtn } from "@/app/components";
import { ReviewsSection } from "@/app/section";


const tabButtons = [{ title: 'Характеристики' }, { title: 'Отзывы' }, { title: 'Таблица размеров' }]

const ProductVariantRow = React.memo(({ item, index, quantities, setQuantities, maxAmount, status }) => {

    const isDisabled = item.price === 0 || item.amount === 0 || item.amount === null || item.statusProduct === 'none';
    
    return (
        <li className={styles.list_item}>
            {/* {item?.title && (
                <div className={styles.title_small}>
                    {item.title || 'Уточнить'}
                </div>
            )} */}
            <div className={`${styles.size} ${isDisabled ? styles.disabled : ""}`}>
                {item.size ?? 'Уточнить'}
            </div>
            <div className={`${styles.height} ${isDisabled ? styles.disabled : ""}`}>
                {item.height ?? 'Уточнить'}
            </div>

            {/* <div className={styles.list_header_amount_sklad}>{item.amount === null ? 'Нет в наличии' : item.amount}</div> */}

            <div className={styles.qty}>
                <Counter
                    maxAmount={maxAmount}
                    disabled={item.price === 0 || item.amount === 0 || item.amount === null ? true : ''}
                        onChange={(newCount) => {
                            setQuantities(prev => ({
                                ...prev,
                                [index]: newCount
                            }))
                        }
                    }
                    value={quantities[index] || 0}
                    documentId={item.documentId}
                />
            </div>
            <div className={styles.price}>
                {item.amount !== 0 && item.price !== 0 ? (
                    <div> {item.price?.toLocaleString('ru-RU') ?? 0} ₽</div>
                ) : (
                    <div className='flex'>
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="14" height="14" rx="7" fill="#F79410" />
                            <path d="M7.38094 5.45031C7.38094 6.01031 7.36094 6.52031 7.32094 6.98031C7.28094 7.43365 7.23094 7.88698 7.17094 8.34031H6.59094C6.53094 7.88698 6.48094 7.43365 6.44094 6.98031C6.40094 6.52031 6.38094 6.01031 6.38094 5.45031V3.57031H7.38094V5.45031ZM7.55094 9.96031C7.55094 10.1403 7.49094 10.297 7.37094 10.4303C7.25094 10.5636 7.0876 10.6303 6.88094 10.6303C6.67427 10.6303 6.51094 10.5636 6.39094 10.4303C6.27094 10.297 6.21094 10.1403 6.21094 9.96031C6.21094 9.78031 6.27094 9.62365 6.39094 9.49031C6.51094 9.35698 6.67427 9.29031 6.88094 9.29031C7.0876 9.29031 7.25094 9.35698 7.37094 9.49031C7.49094 9.62365 7.55094 9.78031 7.55094 9.96031Z" fill="white" />
                        </svg>
                        Под заказ
                    </div>
                )}
            </div>
        </li>

    )
})


const ClientProductComponent = ({ data, sameProducts }) => {

    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [mainSwiper, setMainSwiper] = useState(null);
    const [active, setActive] = useState(0);
    const openTab = e => setActive(+e.target.dataset.index);
    const [quantities, setQuantities] = useState({})
    const [direction, setDirection] = useState('vertical');

    const imageList = data?.imgs;
    const domain = `${process.env.NEXT_PUBLIC_DOMAIN}`;

    const { total, totalSales } = useMemo(() => {
        let total = Number(0);
        let totalSales = Number(0);
        
        sameProducts.forEach((item, index) => {
            const priceSales = Number(item.priceSales) || Number(item.price);
            const price = Number(item.price);
            
            const quantity = quantities[index] || 0;
            total += quantity * price;
            totalSales += quantity * priceSales;
            
        });
        
        return { total, totalSales };
    }, [sameProducts, quantities]);
    

    const updatedItems = useMemo(() => sameProducts.map((item, idx) => ({
        ...item,
        amount: quantities[idx] || 0
    })), [sameProducts, quantities]);

   const statusProductRussian = useMemo(() => updatedItems?.map(item =>
        item.statusProduct == 'order' ? 'Под заказ' : 'В наличии'
   ), [updatedItems])
    
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
                                {imageList !== null && imageList?.map((slide, index) => {
                                    return (

                                        <SwiperSlide key={`thumb-${index}`}>
                                            <div className={styles.thumbnail_wrapper}>
                                                {slide.img !== null ? (
                                                    <Image
                                                        className={styles.image}
                                                        src={`${domain}${slide?.url}` ?? '/placeholder-image.jpg'}
                                                        alt={`thumb-${index}`}
                                                        width={100}
                                                        height={100}
                                                        placeholder="blur"
                                                        blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQ0MiIgaGVpZ2h0PSIxMTg5IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNjY2MiIC8+PC9zdmc+" priority
                                                    />
                                                    ) : 
                                                        <Image
                                                            src={`/placeholder-image.jpg`}
                                                            alt={title}
                                                            width={305}
                                                            objectFit='contain'
                                                            height={360}
                                                            className={styles.card_image}
                                                            placeholder="blur"
                                                            blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQ0MiIgaGVpZ2h0PSIxMTg5IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNjY2MiIC8+PC9zdmc+" priority
                                                        />
                                                    }
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
                                {imageList !== null && imageList?.map((slide, index) => (
                                    <SwiperSlide key={`main-${index}`}>
                                        <div className={styles.slide}>
                                            <div className={styles.image_wrapper}>
                                                <Image
                                                    className={styles.image}
                                                    src={`${domain}${slide?.url}` ?? '/placeholder-image.jpg'}
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

                                {!imageList && (
                                     <Image
                                        src={`/placeholder-image.jpg`}
                                        alt={'заглушка'}
                                        width={500}
                                        objectFit='contain'
                                        height={500}
                                        className={styles.image}
                                        placeholder="blur"
                                        blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQ0MiIgaGVpZ2h0PSIxMTg5IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNjY2MiIC8+PC9zdmc+" priority
                                    />
                                )}
                            </Swiper>
                        </div>

                        <FavoriteBtn element={data} />
                    </div>

                    <div className={styles.description}>
                        {data?.sku !== null && (
                            <p className={styles.article}>{data?.sku}</p>
                        )}
                        <ul className={styles.list}>
                            <li className={styles.list_header}>
                                {/* {data?.title && (
                                    <div className={styles.list_header_text}>Название:</div>
                                )} */}
                                {data?.size && ( 
                                    <div className={`${styles.list_header_text}`}>Размер:</div>
                                )}
                                
                                {/* {data?.height && ( */}
                                    <div className={styles.list_header_text}>Рост:</div>
                                {/* )} */}

                                
                                {/* <div className={styles.list_header_text}>Склад:</div> */}
                                

                                <div className={styles.list_header_text}>Кол-во:</div>
                                <div className={styles.list_header_text}>Цена:</div>
                            </li>
                            
                            {sameProducts.map((item, index) => (
                                <ProductVariantRow
                                    key={item.documentId || index}
                                    item={item}
                                    index={index}
                                    quantities={quantities[index] || 0}
                                    setQuantities={setQuantities}
                                    maxAmount={item?.amount}
                                    status={statusProductRussian[index]}
                                />
                            ))}
                        </ul>

                        <div className={styles.total}>
                            Итого: {totalSales.toLocaleString('ru-RU')} ₽ &nbsp;&nbsp;
                            <span>{total.toLocaleString('ru-RU')} ₽</span>
                        </div>
                        
                      
                        <AddToCartButton
                            many
                            items={updatedItems.filter(i => i.amount > 0)}
                            text={'Добавить в корзину'}
                            afterCounter
                        />

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
                >

                    {/* <div className={styles.wrapper_attr}>
                        {data.attributes.map((el, id) =>
                            <div key={id} className="flex gap-5">
                                <p>{el.name}</p>
                                <p>{el.value}</p>
                            </div>
                        )}
                    </div> */}

                    <div className={styles.descriptions_wrapper} dangerouslySetInnerHTML={{ __html: data?.description }}>

                    </div>
                </div>
                <div
                    className={`${active === 1 ? `${styles.block}` : `${styles.none}`}`}
                >
                    <ReviewsSection data={data} />
                </div>
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
