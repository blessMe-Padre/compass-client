/**
 * TODO: Исключить дубли orders
 */
'use client'
import { useEffect, useState } from 'react';
import getProductByDocumentId from '@/app/utils/getProductByDocumentId';
import getProductWordForm from '@/app/utils/getProductWordForm';

import { CartItem, Preloader } from '@/app/components';
import Image from 'next/image';

import { AddToCartButton } from "@/app/components";

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
            const price = item?.priceSales ?? item?.price ?? 0;

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

    function reverseDate(str) {
        // проверяем строго формат четыре цифры-два-два через дефисы
        const regex = /^(\d{4})-(\d{2})-(\d{2})$/;
        const match = str.match(regex);
        if (match) {
            const [, year, month, day] = match;
            return `${day}.${month}.${year}`;
        }
        return str;
    }

    return (
        <ul className={styles.list}>
            {orders.map(order => (
                <li key={order.id} className={styles.item}>
                    <div>
                        <h3 className={styles.item_title}>{order.orderNumber}</h3>
                        <p className={styles.item_text}>Статус оплаты:
                            <span
                                className={order?.paymentstatus === 'оплачен' ? styles.green : styles.red}>
                                &nbsp;{order?.paymentstatus}
                            </span>
                        </p>

                        <p className={styles.item_text}>{order.deliveryMethod}</p>
                        {order?.deliveryMethod !== 'Самовывоз' && (
                            <>
                                {order?.deliveryDateMax &&
                                    <p className={styles.item_text}>
                                        Ожидаемая дата доставки: {reverseDate(order?.deliveryDateMax)}
                                    </p>
                                }

                                {order?.delivery_status &&
                                    <p className={styles.item_text}>
                                        статус доставки :
                                        <span
                                            className={`${order?.delivery_status === 'Доставлен' ? styles.green : styles.orange}`}
                                        >
                                            &nbsp;{order?.delivery_status}
                                        </span>
                                    </p>
                                }
                            </>
                        )}


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
                    </div>

                    <div>
                        <AddToCartButton
                            items={productsByOrderId[order.id]}
                            many
                            text={'Повторить заказ'}
                        />
                    </div>
                </li>
            ))}


        </ul>
    )
}

export default OrdersList