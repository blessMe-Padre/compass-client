/**
 * TODO: Исключить дубли orders
 */
'use client'
import { useEffect, useState } from 'react';
import getProductByDocumentId from '@/app/utils/getProductByDocumentId';

import { CartItem } from '@/app/components';

import styles from './style.module.scss';

const OrdersList = ({ orders = [] }) => {
    const [productsByOrderId, setProductsByOrderId] = useState({});

    console.log(orders);

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

                setProductsByOrderId(newProductsByOrder); // только один вызов setState

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
                <li key={order.id}>
                    <h3>Заказ номер {order.id}</h3>
                    <p>Ожидаемая дата доставки: 23 декабря</p>
                    <p>{order.deliveryMethod}</p>

                    {(productsByOrderId[order.id] || []).map(product => (
                        <CartItem key={product.id} el={product} location="cartPage" />
                    ))}
                </li>
            ))}


        </ul>
    )
}

export default OrdersList