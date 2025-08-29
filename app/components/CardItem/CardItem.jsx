'use client';
import styles from './style.module.scss';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { AddToCartButton, FavoriteBtn } from '../index';

import Link from 'next/link';

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const apiUrl = `${process.env.NEXT_PUBLIC_DOMAIN}`


function CardItem({ element }) {
    const {
        title,
        price,
        priceSales,
        amount,
        promoName,
        modern,
        imgs,
        id,
        hit
    } = element;

    return (
        <div className={styles.card}>
            <div className={styles.swiper_image_wrapper}>
                {imgs !== null ?
                    <Swiper
                        spaceBetween={20}
                        loop={true}
                        modules={[Navigation, Pagination]}
                        pagination={{
                            clickable: true,
                            el: '.custom-pagination2',
                            type: 'bullets',
                            dynamicBullets: true,
                            dynamicMainBullets: 4
                        }}

                    >
                        {imgs?.map((img, idx) => {
                            return (
                                <SwiperSlide key={idx}>
                                    <Link href={`products/${id}`}>
                                        <div className={styles.img_wrapper}>
                                            <Image
                                                src={`${apiUrl}${img?.url}`}
                                                alt={title}
                                                width={305}
                                                objectFit='contain'
                                                height={360}
                                                className={styles.card_image}
                                                placeholder="blur"
                                                blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQ0MiIgaGVpZ2h0PSIxMTg5IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNjY2MiIC8+PC9zdmc+" priority
                                                />
                                        </div>
                                    </Link>
                                </SwiperSlide>
                            )
                        })}
                        <div className={`custom-pagination2 ${styles.custom_pagination}`} />
                    </Swiper>
                    :
                    <div className={styles.img_wrapper}>
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
                    </div>
                }

                <Link href={`products/${id}`} className={styles.name}>
                    {title}
                </Link>
                <div className={styles.badges_container}>
                    {modern === true && (
                        <div className={styles.hit_badge}>
                            <span>Новинка</span>
                        </div>
                    )}
                    {/* {hit === true && (
                        <div className={styles.hit_badge}>
                            <span>Хит</span>
                        </div>
                    )} */}

                    {promoName && (
                        <div className={styles.promo_badge}>
                            {promoName}
                        </div>
                    )}
                </div>

               <FavoriteBtn element={element} />

                <div className={styles.price_container}>
                    {priceSales && price ? (
                        <>
                            <p className={styles.item_sale_price}>{priceSales?.toLocaleString('ru-Ru')} Р / шт.</p>
                            <p className={`${styles.item_sale_price} ${styles.price_underline}`}>{price.toLocaleString('ru-Ru')} Р / шт.</p>
                        </>
                    )
                        :
                        <>
                            {price ? (
                                <p className={`${styles.item_sale_price}`}>{price.toLocaleString('ru-Ru')} Р / шт.</p>
                            ) : (
                                <p className={styles.item_sale_price}>уточнить цену</p>
                            )}
                        </>
                    }
                </div>

            </div>
            <div className={styles.btn_wrapper}>
                {!price || amount === 0
                    ? (
                        <p className={`${styles.item_outstore}`}>Нет в наличии</p>
                    )
                    : (
                        <AddToCartButton item={element} text={'В корзину'} />
                    )
                }

            </div>
        </div>
    );
}

export default CardItem;
