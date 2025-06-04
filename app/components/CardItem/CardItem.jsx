'use client';
import styles from './style.module.scss';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { AddToCartButton } from '../index';

import Link from 'next/link';

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const apiUrl = `${process.env.NEXT_PUBLIC_DOMAIN}`

import useWishlistStore from '@/app/store/wishlistStore';

function CardItem({ element }) {
    const {
        title,
        price,
        priceSales,
        promoName,
        modern,
        imgs,
        id
    } = element;

    const { wishlist, toggleWishlist } = useWishlistStore();
    const isInWishlist = wishlist.some(item => item.id === element.id);
    const handleClick = (product) => toggleWishlist(product)

    return (
        <div className={styles.card}>
            <div className={styles.img_wrapper}>
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
                                    </SwiperSlide>
                                )
                            })}
                            <div className={`custom-pagination2 ${styles.custom_pagination}`} />
                        </Swiper>
                        :
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
            </div>

            <div>
                <Link href={`products/${id}`} className={styles.name}>
                    {title}
                </Link>
                <div className={styles.badges_container}>
                    {modern === true && (
                        <div className={styles.hit_badge}>
                            <span>Новинка</span>
                        </div>
                    )}

                    {promoName && (
                        <div className={styles.promo_badge}>
                            {promoName}
                        </div>
                    )}
                </div>

                <div onClick={() => handleClick(element)} className={`${styles.favorite} ${isInWishlist ? styles.active : ''}`} >
                    <svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20.3949 2.19052C19.3098 0.959297 17.8044 0.28125 16.1562 0.28125C13.8382 0.28125 12.3706 1.6657 11.5476 2.82715C11.3341 3.12853 11.1525 3.43073 11 3.7151C10.8475 3.43073 10.6659 3.12853 10.4524 2.82715C9.62943 1.6657 8.16183 0.28125 5.84375 0.28125C4.19555 0.28125 2.69023 0.95934 1.6051 2.19057C0.570066 3.36507 0 4.93807 0 6.61979C0 8.45038 0.714699 10.153 2.2492 11.978C3.62063 13.6091 5.59363 15.2904 7.87832 17.2372C8.72966 17.9627 9.61005 18.713 10.5473 19.533L10.5755 19.5577C10.697 19.6641 10.8485 19.7172 11 19.7172C11.1515 19.7172 11.303 19.664 11.4245 19.5577L11.4527 19.533C12.39 18.713 13.2703 17.9628 14.1218 17.2371C16.4064 15.2904 18.3794 13.6091 19.7508 11.978C21.2853 10.153 22 8.45038 22 6.61979C22 4.93807 21.4299 3.36507 20.3949 2.19052Z" fill="#C1C1C1" />
                    </svg>
                </div>

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

                <div className={styles.btn_wrapper}>
                    {!priceSales && !price
                        ? (

                            <p className={`${styles.item_outstore}`}>Нет в наличии</p>

                        )
                        : (
                            <AddToCartButton item={element} text={'В корзину'} />
                        )
                    }

                </div>
            </div>
        </div>
    );
}

export default CardItem;
