import styles from './style.module.scss';
import Image from 'next/image';
import useCartStore from '@/app/store/cartStore';
import Link from 'next/link';

const domain = `${process.env.NEXT_PUBLIC_DOMAIN}`;

export default function CartItem({ idx, el, location }) {
    const { removeFromCart, increaseQuantity, decreaseQuantity } = useCartStore();

    const handleIncrease = () => {
        increaseQuantity(el.id)
    }

    const handleDecrease = () => {
        if (el.quantity <= 1) {
            removeFromCart(el.id);
        } else {
            decreaseQuantity(el.id);
        }
    }

    return (
        <div key={idx} className={`
            ${styles.cart_item}
            ${location === 'cartPage' ? `${styles.cartPage}` : ''}
            ${location === 'orderPage' ? `${styles.orderPage}` : ''}
        `}>
            <div className={styles.img_wrapper}>
                {el.mainImg ? (
                    <Image
                        src={`${domain}${el.mainImg}`}
                        alt={`${el?.title}`}
                        width={100}
                        height={100}
                        className={styles.item_img}
                    />
                )
                    : (
                        <Image
                            src={`${domain}${el?.imgs[0]?.url}`}
                            alt={`${el?.title}`}
                            width={100}
                            height={100}
                            className={styles.item_img}
                            placeholder="blur"
                            blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQ0MiIgaGVpZ2h0PSIxMTg5IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNjY2MiIC8+PC9zdmc+" priority
                        />
                    )
                }
            </div>

            <div className={`
                ${styles.item_info}
                ${location === 'orderPage' ? `${styles.orderPage_info}` : ''}
                `}>
                <p className={styles.item_sku}>{el.sku}</p>
                <Link className={styles.item_title} href={`/products/${el?.id}`}>{el.title}</Link>
                <p className={styles.item_size}>Размер: {el.size}</p>
                <p className={styles.item_height}>Рост: {el.height}</p>
            </div>
            <div className={`${styles.item_btns} ${location === 'cartPage' ? `${styles.cartPage}` : ''} `}>
                {location != 'orderPage' &&
                    <div className={styles.btns_amount}>
                        <button className={styles.btn_minus} onClick={handleDecrease}>-</button>
                        <p className={styles.quantity}>{el?.quantity}</p>
                        <button className={styles.btn_plus} onClick={handleIncrease}>+</button>
                    </div>
                }

                <div className={styles.wrapper_price}>
                    {/* {priceSales && price ? (
                    <>
                        <p className={styles.item_sale_price}>{priceSales?.toLocaleString('ru-Ru')} Р / шт.</p>
                        <p className={`${styles.item_sale_price} ${styles.price_underline}`}>{price.toLocaleString('ru-Ru')} Р / шт.</p>
                    </>
                )
                    :
                    <>
                    </>
                }

                {!priceSales && price && (
                    <>
                        <p className={`${styles.item_sale_price}`}>{price.toLocaleString('ru-Ru')} Р / шт.</p>
                    </>
                )} */}

                    {el.priceSales && el.price ? (
                        <>
                            <p className={styles.item_price_sale}>{el.priceSales.toLocaleString('ru-Ru')} ₽ / шт.</p>
                            <p className={`${styles.item_price} ${el.priceSales !== null ? `${styles.hasSales}` : ''}`}>{el.price.toLocaleString('ru-Ru')}₽</p>
                        </>
                    )
                        :
                        <>
                        </>
                    }

                    {!el.priceSales && el.price && (
                        <>
                            <p className={styles.item_price_sale}>{el.price.toLocaleString('ru-Ru')} ₽ / шт.</p>
                        </>
                    )}

                </div>
            </div>

            {location != 'orderPage' &&

                <button className={styles.btns_delete} onClick={() => removeFromCart(el.id)}>
                    <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 1L1.00036 9.99964" stroke="#1B1B1B" strokeLinecap="round" />
                        <path d="M1 1L9.99964 9.99964" stroke="#1B1B1B" strokeLinecap="round" />
                    </svg>
                </button>

            }

        </div>
    )
}