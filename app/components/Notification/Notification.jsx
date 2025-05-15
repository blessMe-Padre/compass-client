'use client'
import { useState, useEffect } from 'react';
import styles from './style.module.scss';
import { motion } from 'framer-motion';
import useCartStore from '@/app/store/cartStore';

export default function Notification({ text }) {
    const { cartItems, lastAction } = useCartStore();
    const [message, setMessage] = useState('');
    const [active, setActive] = useState(false);

    useEffect(() => {
        if (!lastAction) return;

        if (cartItems.length === 0 && lastAction === 'clear') {
            setMessage('Корзина очищена');
            setActive(true);
        }
        else if (lastAction === 'add') {
            setMessage(`Товар добавлен в корзину!`);
            setActive(true);
        }
        else if (lastAction === 'addMany') {
            setMessage(`Товары добавлены в корзину!`);
            setActive(true);
        }
        else if (lastAction === 'remove') {
            setMessage(`Товар удален!`);
            setActive(true);
        }
        else if (lastAction === 'addWish') {
            setMessage(`Товар добавлен в Избранное!`);
            setActive(true);
        }
        else if (lastAction === 'removeWish') {
            setMessage(`Товар удален из Избранного!`);
            setActive(true);
        }
        else if (lastAction === 'clearWish') {
            setMessage(`Избранное очищено!`);
            setActive(true);
        }

        

        const timer = setTimeout(() => {
            setActive(false);
            useCartStore.getState().clearLastAction();
        }, 2000);

        return () => clearTimeout(timer);

    }, [lastAction])

    return (
        <motion.div
            className={`${styles.modalNotificationWrapper} ${active ? styles.active : ''}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{
                opacity: active ? 1 : 0,
                x: active ? 0 : 1000
            }}
            transition={{ duration: 0.3 }}
        >
            <div className={styles.modalContent}>
                {message}
                <motion.div
                    className={styles.progressBar}
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 3 }}
                />
            </div>
        </motion.div>
    );
}