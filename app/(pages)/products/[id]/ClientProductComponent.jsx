'use client';
import Image from "next/image";

import React, { useState, useEffect, useMemo } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Thumbs } from 'swiper/modules';

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import styles from './style.module.scss';
import { AddToCartButton, Counter, TableSize, FavoriteBtn, OrderModal } from "@/app/components";
import { ReviewsSection } from "@/app/section";


const tabButtons = [{ title: 'Характеристики' }, { title: 'Отзывы' }, { title: 'Таблица размеров' }]

// Категории, для которых не нужно отображать колонку "Рост"
const CATEGORIES_WITHOUT_HEIGHT = [
    '02-obuv-',
    '16-pnevmatika',
    '14-suveniry',
    '13-flagi',
    '09-ochki-s-effektom-polyarizacii',
    '10-repellenty'
];

const ProductVariantRow = React.memo(({ item, index, quantities, setQuantities, maxAmount, status, onOrderClick, productTitle, showSize, showHeight, colClass }) => {

    const isOutOfStock = item.amount === 0 || item.amount === null;
    const isDisabled = item.price === 0 || item.statusProduct === 'none';
    const stockAmount = item.amount ?? 0;
    
    return (
        <li className={`${styles.list_item} ${colClass || ''}`}>
            {showSize && (
                <div className={`${styles.size} ${isDisabled ? styles.disabled : ""}`}>
                    {item.size ?? 'Уточнить'}
                </div>
            )}
            {showHeight && (
                <div className={`${styles.height} ${isDisabled ? styles.disabled : ""}`}>
                    {item.height ?? 'Уточнить'}
                </div>
            )}

            <div className={styles.qty}>
                <div className={styles.counter_wrapper}>
                    <Counter
                        maxAmount={9999}
                        disabled={item.price === 0 ? true : false}
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
                    <span className={styles.stock_info}>
                        на складе: {stockAmount}
                    </span>
                </div>
            </div>
            <div className={styles.price}>
                {item.price !== 0 ? (
                    <div> {item.price?.toLocaleString('ru-RU') ?? 0} ₽</div>
                ) : null}
                {isOutOfStock && (
                    <button 
                        className={styles.order_btn}
                        onClick={() => onOrderClick({
                            title: productTitle || item.title,
                            size: item.size,
                            height: item.height,
                            quantity: quantities[index] || 0
                        })}
                    >
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="14" height="14" rx="7" fill="#F79410" />
                            <path d="M7.38094 5.45031C7.38094 6.01031 7.36094 6.52031 7.32094 6.98031C7.28094 7.43365 7.23094 7.88698 7.17094 8.34031H6.59094C6.53094 7.88698 6.48094 7.43365 6.44094 6.98031C6.40094 6.52031 6.38094 6.01031 6.38094 5.45031V3.57031H7.38094V5.45031ZM7.55094 9.96031C7.55094 10.1403 7.49094 10.297 7.37094 10.4303C7.25094 10.5636 7.0876 10.6303 6.88094 10.6303C6.67427 10.6303 6.51094 10.5636 6.39094 10.4303C6.27094 10.297 6.21094 10.1403 6.21094 9.96031C6.21094 9.78031 6.27094 9.62365 6.39094 9.49031C6.51094 9.35698 6.67427 9.29031 6.88094 9.29031C7.0876 9.29031 7.25094 9.35698 7.37094 9.49031C7.49094 9.62365 7.55094 9.78031 7.55094 9.96031Z" fill="white" />
                        </svg>
                        Под заказ
                    </button>
                )}
            </div>
        </li>

    )
})

// Компонент для строки с размером из razmer
const RazmerVariantRow = React.memo(({ size, sizeIndex, quantity, setQuantity, amount, price, documentId, onOrderClick, productTitle, colClass }) => {
    const isOutOfStock = !amount || amount === 0;
    const isDisabled = !price || price === 0;
    
    return (
        <li className={`${styles.list_item} ${colClass || ''}`}>
            <div className={`${styles.size} ${isDisabled ? styles.disabled : ""}`}>
                {size}
            </div>

            <div className={styles.qty}>
                <div className={styles.counter_wrapper}>
                    <Counter
                        maxAmount={9999}
                        disabled={isDisabled}
                        onChange={(newCount) => {
                            setQuantity(sizeIndex, newCount);
                        }}
                        value={quantity || 0}
                        documentId={documentId}
                    />
                    <span className={styles.stock_info}>
                        на складе: {amount || 0}
                    </span>
                </div>
            </div>
            <div className={styles.price}>
                {price > 0 ? (
                    <div> {price?.toLocaleString('ru-RU') ?? 0} ₽</div>
                ) : null}
                {isOutOfStock && (
                    <button 
                        className={styles.order_btn}
                        onClick={() => onOrderClick({
                            title: productTitle,
                            size: size,
                            quantity: quantity || 0
                        })}
                    >
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="14" height="14" rx="7" fill="#F79410" />
                            <path d="M7.38094 5.45031C7.38094 6.01031 7.36094 6.52031 7.32094 6.98031C7.28094 7.43365 7.23094 7.88698 7.17094 8.34031H6.59094C6.53094 7.88698 6.48094 7.43365 6.44094 6.98031C6.40094 6.52031 6.38094 6.01031 6.38094 5.45031V3.57031H7.38094V5.45031ZM7.55094 9.96031C7.55094 10.1403 7.49094 10.297 7.37094 10.4303C7.25094 10.5636 7.0876 10.6303 6.88094 10.6303C6.67427 10.6303 6.51094 10.5636 6.39094 10.4303C6.27094 10.297 6.21094 10.1403 6.21094 9.96031C6.21094 9.78031 6.27094 9.62365 6.39094 9.49031C6.51094 9.35698 6.67427 9.29031 6.88094 9.29031C7.0876 9.29031 7.25094 9.35698 7.37094 9.49031C7.49094 9.62365 7.55094 9.78031 7.55094 9.96031Z" fill="white" />
                        </svg>
                        Под заказ
                    </button>
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
    
    // Состояние модального окна для заказа
    const [orderModalOpen, setOrderModalOpen] = useState(false);
    const [orderProductData, setOrderProductData] = useState(null);
    
    const handleOrderClick = (productInfo) => {
        setOrderProductData(productInfo);
        setOrderModalOpen(true);
    };

    const imageList = data?.imgs;
    const domain = `${process.env.NEXT_PUBLIC_DOMAIN}`;
    
    // Получаем slug категории
    const categorySlug = data?.category?.slug || data?.categorySlug || '';
    
    // Проверяем, нужно ли скрывать колонку "Рост" для данной категории
    const isCategoryWithoutHeight = CATEGORIES_WITHOUT_HEIGHT.some(slug => categorySlug.includes(slug));
    
    // Проверяем наличие данных size и height в sameProducts
    const hasSizeData = useMemo(() => {
        return sameProducts?.some(item => item.size !== null && item.size !== undefined && item.size !== '');
    }, [sameProducts]);
    
    const hasHeightData = useMemo(() => {
        if (isCategoryWithoutHeight) return false;
        return sameProducts?.some(item => item.height !== null && item.height !== undefined && item.height !== '');
    }, [sameProducts, isCategoryWithoutHeight]);

    // Проверяем наличие массивов razmer, couts_razmer и price_razmer
    const hasRazmerData = data?.razmer && Array.isArray(data.razmer) && data.razmer.length > 0 &&
                          data?.couts_razmer && Array.isArray(data.couts_razmer) && data.couts_razmer.length > 0 &&
                          data?.price_razmer && Array.isArray(data.price_razmer) && data.price_razmer.length > 0;

    // Парсим JSON массивы если они строки
    const razmerArray = useMemo(() => {
        if (!data?.razmer) return null;
        try {
            return typeof data.razmer === 'string' ? JSON.parse(data.razmer) : data.razmer;
        } catch {
            return Array.isArray(data.razmer) ? data.razmer : null;
        }
    }, [data?.razmer]);

    const coutsRazmerArray = useMemo(() => {
        if (!data?.couts_razmer) return null;
        try {
            return typeof data.couts_razmer === 'string' ? JSON.parse(data.couts_razmer) : data.couts_razmer;
        } catch {
            return Array.isArray(data.couts_razmer) ? data.couts_razmer : null;
        }
    }, [data?.couts_razmer]);

    const priceRazmerArray = useMemo(() => {
        if (!data?.price_razmer) return null;
        try {
            return typeof data.price_razmer === 'string' ? JSON.parse(data.price_razmer) : data.price_razmer;
        } catch {
            return Array.isArray(data.price_razmer) ? data.price_razmer : null;
        }
    }, [data?.price_razmer]);

    const hasRazmerDataParsed = razmerArray && coutsRazmerArray && priceRazmerArray &&
                                 razmerArray.length === coutsRazmerArray.length &&
                                 razmerArray.length === priceRazmerArray.length;

    const { total, totalSales } = useMemo(() => {
        let total = Number(0);
        let totalSales = Number(0);
        
        if (hasRazmerDataParsed) {
            // Подсчет для размеров из razmer
            razmerArray.forEach((_, index) => {
                const price = Number(priceRazmerArray[index]) || 0;
                const quantity = quantities[index] || 0;
                total += quantity * price;
                totalSales += quantity * price; // Если нет priceSales, используем price
            });
        } else {
            // Подсчет для обычных товаров
            sameProducts.forEach((item, index) => {
                const priceSales = Number(item.priceSales) || Number(item.price);
                const price = Number(item.price);
                
                const quantity = quantities[index] || 0;
                total += quantity * price;
                totalSales += quantity * priceSales;
            });
        }
        
        return { total, totalSales };
    }, [hasRazmerDataParsed, razmerArray, coutsRazmerArray, priceRazmerArray, sameProducts, quantities]);
    

    const updatedItems = useMemo(() => {
        if (hasRazmerDataParsed) {
            // Формируем элементы для корзины из razmer данных
            return razmerArray.map((size, idx) => {
                // Парсим размер и рост из строки вида "р. 60/182-188"
                const sizeMatch = size.match(/[рp]\.\s*(\d+)(?:\/(\d+-\d+))?/i);
                const parsedSize = sizeMatch ? sizeMatch[1] : size;
                const parsedHeight = sizeMatch ? sizeMatch[2] : null;
                
                return {
                    size: parsedSize,
                    height: parsedHeight,
                    amount: quantities[idx] || 0,
                    price: Number(priceRazmerArray[idx]) || 0,
                    priceSales: Number(priceRazmerArray[idx]) || 0,
                    documentId: data.documentId || data.id,
                    title: `${data.title} ${size}`,
                    sku: data.sku,
                    statusProduct: (Number(coutsRazmerArray[idx]) || 0) > 0 ? 'stock' : 'order'
                };
            }).filter(item => item.amount > 0);
        } else {
            // Обычные товары
            return sameProducts.map((item, idx) => ({
                ...item,
                amount: quantities[idx] || 0
            })).filter(item => item.amount > 0);
        }
    }, [hasRazmerDataParsed, razmerArray, coutsRazmerArray, priceRazmerArray, sameProducts, quantities, data]);

   const statusProductRussian = useMemo(() => {
        if (hasRazmerDataParsed) {
            return razmerArray.map((_, idx) => {
                const amount = Number(coutsRazmerArray[idx]) || 0;
                return amount > 0 ? 'В наличии' : 'Под заказ';
            });
        } else {
            return updatedItems?.map(item =>
                item.statusProduct == 'order' ? 'Под заказ' : 'В наличии'
            );
        }
   }, [hasRazmerDataParsed, razmerArray, coutsRazmerArray, updatedItems])

    // Форматирование описания с переносом строки после точки
    const formattedDescription = useMemo(() => {
        if (!data?.description) return '';
        // Добавляем <br> после точки, за которой следует пробел и буква (не внутри HTML тегов)
        return data.description
            .replace(/\.(\s+)(?=[А-ЯA-Z])/g, '.<br>$1')
            .replace(/\.(\s+)(?=[а-яa-z])/g, '.<br>$1');
    }, [data?.description]);
    
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
                                                    height={600}
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
                        {(() => {
                            // Вычисляем количество колонок
                            const colCount = hasRazmerDataParsed 
                                ? 3 // Размер, Кол-во, Цена
                                : 2 + (hasSizeData ? 1 : 0) + (hasHeightData ? 1 : 0); // Кол-во, Цена + опционально Размер и Рост
                            const colClass = styles[`cols_${colCount}`] || '';
                            
                            return (
                                <ul className={styles.list}>
                                    <li className={`${styles.list_header} ${colClass}`}>
                                        {hasRazmerDataParsed ? (
                                            <>
                                                <div className={styles.list_header_text}>Размер:</div>
                                                <div className={styles.list_header_text}>Кол-во:</div>
                                                <div className={styles.list_header_text}>Цена:</div>
                                            </>
                                        ) : (
                                            <>
                                                {hasSizeData && (
                                                    <div className={styles.list_header_text}>Размер:</div>
                                                )}
                                                {hasHeightData && (
                                                    <div className={styles.list_header_text}>Рост:</div>
                                                )}
                                                <div className={styles.list_header_text}>Кол-во:</div>
                                                <div className={styles.list_header_text}>Цена:</div>
                                            </>
                                        )}
                                    </li>
                                    
                                    {hasRazmerDataParsed ? (
                                        // Отображаем размеры из razmer массивов
                                        razmerArray.map((size, index) => (
                                            <RazmerVariantRow
                                                key={`razmer-${index}`}
                                                size={size}
                                                sizeIndex={index}
                                                quantity={quantities[index] || 0}
                                                setQuantity={(idx, count) => {
                                                    setQuantities(prev => ({
                                                        ...prev,
                                                        [idx]: count
                                                    }))
                                                }}
                                                amount={Number(coutsRazmerArray[index]) || 0}
                                                price={Number(priceRazmerArray[index]) || 0}
                                                documentId={data.documentId || data.id}
                                                onOrderClick={handleOrderClick}
                                                productTitle={data?.title}
                                                colClass={colClass}
                                            />
                                        ))
                                    ) : (
                                        // Отображаем обычные товары
                                        sameProducts.map((item, index) => (
                                            <ProductVariantRow
                                                key={item.documentId || index}
                                                item={item}
                                                index={index}
                                                quantities={quantities[index] || 0}
                                                setQuantities={setQuantities}
                                                maxAmount={item?.amount}
                                                status={statusProductRussian[index]}
                                                onOrderClick={handleOrderClick}
                                                productTitle={data?.title}
                                                showSize={hasSizeData}
                                                showHeight={hasHeightData}
                                                colClass={colClass}
                                            />
                                        ))
                                    )}
                                </ul>
                            );
                        })()}

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

                    <div className={styles.descriptions_wrapper} dangerouslySetInnerHTML={{ __html: formattedDescription }}>

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

            <OrderModal 
                isOpen={orderModalOpen} 
                onClose={() => setOrderModalOpen(false)} 
                productData={orderProductData}
            />
        </section>
    )
}

export default ClientProductComponent
