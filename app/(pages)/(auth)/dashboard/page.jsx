'use client'
import { useEffect, useState } from 'react';
import getUserById from '@/app/utils/getUserById';
import { UserForm } from '@/app/components';
import { motion } from "framer-motion";

import styles from './style.module.scss';

// const documentId = 'f9bh8d19a9ij1gg5zegvposx';
const documentId = 'bxgol3fvr7ei2e5522yrqpp6';

/**
 * Здесь получаем юзера по его documentId => getUserById(documentId)
 * Устанавливаем объект юзера в state => user
 * Прокидываем юзера дальше вниз по табам 
 */

const Dashboard = () => {
    const [user, setUser] = useState({});

    const variants = {
        visible: {
            opacity: 1,
            height: "auto",
            visibility: 'visible',
            transition: {
                when: "beforeChildren",
                staggerChildren: 0.1,
            },
        },
        hidden: {
            opacity: 0,
            height: 0,
            visibility: 'hidden',
        },
    };

    useEffect(() => {
        const loadData = async () => {
            try {
                const response = await getUserById(documentId);
                setUser(response[0]);

            } catch (error) {
                console.error('Произошла ошибка', error);
            }
        };

        loadData();
    }, []);

    const tabButtons = [
        { title: 'Профиль' },
        { title: 'История заказов' },
        { title: 'Избранное' },
        { title: 'Скидки и бонусы' }
    ]
    const [active, setActive] = useState(0);
    const openTab = e => setActive(+e.target.dataset.index);

    return (
        <section>
            <div className="container">
                <h1>Здравствуйте, {user?.username}</h1>

                <div className={styles.tab_buttons_wrapper}>
                    {
                        tabButtons.map((button, index) => (
                            <button
                                className={`${styles.tabs_btn} ${index === active ? `${styles.btn_active}` : ''}`}
                                onClick={openTab}
                                data-index={index}
                                key={index}
                            >{button.title}</button>
                        ))
                    }
                </div>

                <motion.div
                    layout
                    variants={variants}
                    initial={"hidden"}
                    animate={active === 0 ? "visible" : "hidden"}
                >
                    <UserForm user={user} />
                </motion.div>
                <motion.div
                    layout
                    variants={variants}
                    initial={"hidden"}
                    animate={active === 1 ? "visible" : "hidden"}
                >
                    История заказов
                </motion.div>
                <motion.div
                    layout
                    variants={variants}
                    initial={"hidden"}
                    animate={active === 2 ? "visible" : "hidden"}
                >
                    Избранное
                </motion.div>
                <motion.div
                    layout
                    variants={variants}
                    initial={"hidden"}
                    animate={active === 3 ? "visible" : "hidden"}
                >
                    Скидки и бонусы
                </motion.div>
            </div>
        </section>
    )
}

export default Dashboard