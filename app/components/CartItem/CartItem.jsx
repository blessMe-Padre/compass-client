import styles from './style.module.scss';
import Image from 'next/image';
import useCartStore from '@/app/store/cartStore';

const domain = 'http://90.156.134.142:1337';

export default function CartItem({ idx, el}) {

    const { removeFromCart } = useCartStore();

    {console.log('fsdfasf!',el)}

    const price = el?.priceSales !== null || el?.priceSales !== 0 ? el?.priceSales : el?.price;
    const quantity = el?.quantity !== null ? el?.quantity : 1;
    const totalSumItem = price * quantity;

    return (
        <div key={idx} className={styles.cart_item}>
            <div className={styles.img_wrapper}>

                {console.log(el)}
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
                <p className={styles.item_title}>{el.title}</p>
                <p className={styles.item_size}>Размер: {el.size}</p>
                <p className={styles.item_height}>Рост: {el.height}</p>
            </div>

            <div className={styles.item_btns}>
                <div className={styles.btns_amount}>
                    <button className={styles.btn_minus} onClick={(e) => el?.quantity - 1}>-</button>
                    <p>{el?.quantity}</p>
                    <button className={styles.btn_plus} onClick={(e) => el?.quantity + 1}>+</button>
                </div>

                <div className={styles.wrapper_price}>
                    <p className={styles.item_price}>{el.price}</p>
                    <p className={styles.item_price_sale}>{el.priceSales}</p>
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