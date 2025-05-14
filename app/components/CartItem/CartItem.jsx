import styles from './style.module.scss';
import Image from 'next/image';
import useCartStore from '@/app/store/cartStore';
import Link from 'next/link';

const domain = 'http://90.156.134.142:1337';

export default function CartItem({ idx, el, location}) {
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
    

    const price = el?.priceSales !== null || el?.priceSales !== 0 ? el?.priceSales : el?.price;
    const quantity = el?.quantity !== null ? el?.quantity : 1;

    return (
        <div key={idx} className={`${styles.cart_item} ${location === 'cartPage' ? `${styles.cartPage}` : ''}`}>
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
            

         
            <div className={styles.item_info}>
                <p className={styles.item_sku}>{el.sku}</p>
                <Link className={styles.item_title} href={`/products/${el?.id}`}>{el.title}</Link>
                <p className={styles.item_size}>Размер: {el.size}</p>
                <p className={styles.item_height}>Рост: {el.height}</p>
            </div>

            <div className={`${styles.item_btns} ${location === 'cartPage' ? `${styles.cartPage}` : ''} `}>
                <div className={styles.btns_amount}>
                    <button className={styles.btn_minus} onClick={handleDecrease}>-</button>
                    <p className={styles.quantity}>{el?.quantity}</p>
                    <button className={styles.btn_plus} onClick={handleIncrease}>+</button>
                </div>

                <div className={styles.wrapper_price}>
                    <p className={styles.item_price_sale}>{el.priceSales.toLocaleString('ru-Ru')} ₽ / шт.</p>
                    <p className={`${styles.item_price} ${el.priceSales !== null ? `${styles.hasSales}` : ''}`}>{el.price.toLocaleString('ru-Ru')}₽</p>
                </div>
            </div>

            
            <div className={styles.btns_delete}>
                <button 
                    onClick={() => removeFromCart(el.id)} 
                    className={styles.btn_delete}
                >×</button>
            </div>
        </div>
    )
}