/**
 * TODO: Исключить дубли orders
 */
'use client'
import { useEffect, useState } from 'react';
import getProductByDocumentId from '@/app/utils/getProductByDocumentId';

import styles from './style.module.scss';

const OrdersList = ({ orders = [] }) => {
    const [products, setProducts] = useState([]);
    console.log('products', products);
    console.log('orders', orders);

    useEffect(() => {
        const loadData = async () => {
            try {
                const allProductIds = [];

                orders.forEach(order => {
                    order.orderData?.forEach(data => {
                        data.quantity?.forEach(item => {
                            if (item.id) {
                                allProductIds.push(item.id);
                            }
                        });
                    });
                });


                const loadedProducts = await Promise.all(
                    allProductIds.map(id => getProductByDocumentId(id))
                );
                setProducts(loadedProducts);

            } catch (error) {
                console.error('Произошла ошибка при загрузке товаров', error);
            }
        };

        loadData();
    }, [orders]);


    return (
        <ul className={styles.list}>
            {orders.map((el, idx) => (
                <li className={styles.item} key={idx}>
                    <h3>Заказ номер {el?.id}</h3>
                    <p>Ожидаемая дата доставки: 23 декабря</p>
                    <p>{el?.deliveryMethod}</p>

                    {/* <CartItem el={el} idx={idx} key={idx} location={'cartPage'} /> */}
                </li>
            ))}
        </ul>
    )
}

export default OrdersList