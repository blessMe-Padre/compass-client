'use client'

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import getUserById from '@/app/utils/getUserById';
import { LinkButton, OrdersList, Preloader, ProductsList, UserForm } from '@/app/components';
import { motion } from "framer-motion";

import styles from './style.module.scss';
import { Discounts, RelativeProducts } from '@/app/section';
import useWishlistStore from '@/app/store/wishlistStore';

const documentId = 'f9bh8d19a9ij1gg5zegvposx';
// const documentId = 'bxgol3fvr7ei2e5522yrqpp6';

/**
 * Здесь получаем юзера по его documentId => getUserById(documentId)
 * Устанавливаем объект юзера в state => user
 * Прокидываем юзера дальше вниз по табам 
 */

const Dashboard = () => {
    const router = useRouter();
    const [user, setUser] = useState({});
    const { wishlist } = useWishlistStore();

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

    const handleLogout = () => {
        document.cookie = 'jwt=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT;'
        router.push('/');
        window.location.href = '/';
    }

    return (
        <>
            <section>
                <div className="container">
                    <div className={styles.header}>
                        <h1>Здравствуйте, {user?.username}</h1>
                        <button
                            className={styles.button}
                            onClick={handleLogout}
                        >
                            <span>Выйти</span>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M18 14L19.2929 12.7071C19.6834 12.3166 19.6834 11.6834 19.2929 11.2929L18 10" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M19 12L13 12M4 17.2663V7.26633M16 17.2663C16 18.3709 15.1046 19.2663 14 19.2663H10M16 7.26633C16 6.16176 15.1046 5.26633 14 5.26633H10M4.8906 19.8601L6.8906 21.1934C8.21971 22.0795 10 21.1267 10 19.5293V5.00336C10 3.40597 8.21971 2.45319 6.8906 3.33926L4.8906 4.6726C4.3342 5.04353 4 5.66799 4 6.3367V18.196C4 18.8647 4.3342 19.4891 4.8906 19.8601Z" strokeWidth="1.5" strokeLinecap="round" />
                            </svg>
                        </button>
                    </div>

                    <div className={styles.tab_buttons_header}>
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
                        {user?.orders !== null ?
                            <OrdersList orders={user?.orders} />
                            :
                            <div className='mb-30'>
                                <p className={styles.bold}>Здесь еще ничего нет.</p>
                                <p className='mb-20'>
                                    Выберите товары в каталоге
                                </p>
                                <LinkButton
                                    href="/catalog"
                                    text="Перейти в каталог"
                                />
                            </div>
                        }

                    </motion.div>
                    <motion.div
                        layout
                        variants={variants}
                        initial={"hidden"}
                        animate={active === 2 ? "visible" : "hidden"}
                    >
                        <ProductsList count={4} products={wishlist} />
                    </motion.div>
                    <motion.div
                        layout
                        variants={variants}
                        initial={"hidden"}
                        animate={active === 3 ? "visible" : "hidden"}
                    >
                        <Discounts />
                    </motion.div>
                </div>
            </section>

            <RelativeProducts />
        </>
    )
}

export default Dashboard