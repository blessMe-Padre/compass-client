/**
 * TODO: Исключить дубли orders
 */
'use client'
import { useEffect, useState } from 'react';
import getProductByDocumentId from '@/app/utils/getProductByDocumentId';
import getProductWordForm from '@/app/utils/getProductWordForm';

import { CartItem, Preloader } from '@/app/components';
import Image from 'next/image';

import styles from './style.module.scss';

const OrdersList = ({ orders = [] }) => {
    const [productsByOrderId, setProductsByOrderId] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    function calculateTotalPrice(products) {
        if (!Array.isArray(products)) return 0;

        return products.reduce((sum, item) => {
            if (Array.isArray(item)) {
                return sum + calculateTotalPrice(item); // рекурсивно
            }
            const price = item.priceSales ?? 0;

            return sum + price;
        }, 0);
    }

    useEffect(() => {
        const loadData = async () => {
            try {
                const newProductsByOrder = {};

                for (const order of orders) {
                    const productIds = [];

                    order.orderData?.forEach(data => {
                        data.quantity?.forEach(item => {
                            productIds.push(item.id);
                        });
                    });

                    const loadedProducts = await Promise.all(
                        productIds.map(id => getProductByDocumentId(id))
                    );

                    newProductsByOrder[order.id] = loadedProducts;
                }

                setProductsByOrderId(newProductsByOrder);
                setIsLoading(false);

            } catch (error) {
                console.error('Произошла ошибка при загрузке товаров', error);
            }
        };

        if (orders.length > 0) {
            loadData();
        }
    }, [orders]);

    return (
        <ul className={styles.list}>
            {orders.map(order => (
                <li key={order.id} className={styles.item}>
                    <h3 className={styles.item_title}>Заказ номер {order.id}</h3>
                    <p className={styles.item_text}>Ожидаемая дата доставки: 23 декабря</p>
                    <p className={styles.item_text}>{order.deliveryMethod}</p>

                    <div className={styles.item_row}>
                        {productsByOrderId[order.id] && (
                            <p>
                                {productsByOrderId[order.id].length}{" "}
                                {getProductWordForm(productsByOrderId[order.id].length)}
                            </p>
                        )}

                        <p className={styles.item_text}>
                            {calculateTotalPrice(productsByOrderId[order.id]).toLocaleString('ru-Ru')} ₽
                        </p>
                    </div>
                    {isLoading && <Preloader width={40} height={40} />}
                    {(productsByOrderId[order.id] || []).map(product => (
                        <CartItem key={product.id} el={product} location="orderPage" />
                    ))}

                    <button className={styles.link}>
                        <Image
                            src='./icons/repeat.svg'
                            alt={`repeat`}
                            width={15}
                            height={15}
                            className={styles.item_img}
                        />
                        <span>повторить</span>
                    </button>
                </li>
            ))}


        </ul>
    )
}

export default OrdersList