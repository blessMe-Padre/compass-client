'use client';
import { useState, useEffect } from 'react';
import styles from './style.module.scss';
import { motion, AnimatePresence } from 'framer-motion';
import { FormsCheckout, CartInfo, LinkButton } from '@/app/components';

import useUserStore from '@/app/store/userStore';
import getUserById from '@/app/utils/getUserById';

import { useRef } from 'react';
import useCartStore from '@/app/store/cartStore';


export default function ContentPage() {
    const [user, setUser] = useState({});
    const documentId = useUserStore.getState().userData?.documentId ?? '';

    const [activeTab, setActiveTab] = useState('physical');
    const [isSubmitSuccessful, setIsSubmitSuccessful] = useState(false);
    const [isSubmit, setIsSubmit] = useState(false);

    const [orderWasCreate, setOrderWasCreate] = useState(false);
    const [paymentMessage, setPaymentMessage] = useState(false);
    const [lastOrder, setLastOrder] = useState();
    const { cartItems } = useCartStore();
    const formRef = useRef();

    const tabVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.3, ease: "easeOut" }
        },
        exit: {
            opacity: 0,
            y: -10,
            transition: { duration: 0.2, ease: "easeIn" }
        }
    };

    if (typeof window !== 'undefined') {
        useEffect(() => {
            const flag = localStorage.getItem('orderPlaced');
            setOrderWasCreate(flag === 'true');
        }, []);
    }

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

    useEffect(() => {
        const orders = user?.orders ?? [];
        const lastOrder = orders.length > 0
            ? orders.reduce((max, o) =>
                Number(o.id) > Number(max.id) ? o : max
                , orders[0])
            : null;

        setLastOrder(lastOrder);
    }, [isSubmitSuccessful, user?.orders]);

    return (
        <section>
            <div className='container'>
                <h2 className='page_title'>{isSubmitSuccessful ? <span>Спасибо!</span> : <span>Оформление </span>}</h2>

                <div className={styles.wrapper}>

                    {paymentMessage && <p>Ожидайте, перенаправления на страницу оплату</p>}

                    {orderWasCreate && !paymentMessage &&
                        < div >
                            <p style={{ marginBottom: '20px' }}>Ваш "{lastOrder?.orderNumber}" <span style={{ fontWeight: 700 }}> </span> оформлен, ожидайте смс о готовности</p>
                            <p style={{ marginBottom: '20px' }}><span style={{ fontWeight: 700 }}> </span>Посмотреть статус заказа вы можете в личном кабинете</p>
                            <LinkButton href='/dashboard' text={'Перейти в личный кабинет'} />
                        </div>
                    }


                    {
                        !isSubmitSuccessful && !paymentMessage && !orderWasCreate &&
                        <>
                            {
                                cartItems.length > 0 && (
                                    <>
                                        <div className={styles.checkout_wrapper}>
                                            <div className={styles.tabs_btn_wrapper}>
                                                <label
                                                    htmlFor='physical'
                                                    className={`${styles.tab_btn} ${activeTab === 'physical' ? styles.active : ''}`}
                                                >
                                                    <input
                                                        id='physical'
                                                        name='clientType'
                                                        type='radio'
                                                        checked={activeTab === 'physical'}
                                                        onChange={() => setActiveTab('physical')}
                                                        className={styles.radio_input}
                                                    />
                                                    Физ.лицо
                                                </label>

                                                <label
                                                    htmlFor='legal'
                                                    className={`${styles.tab_btn} ${activeTab === 'legal' ? styles.active : ''}`}
                                                >
                                                    <input
                                                        id='legal'
                                                        name='clientType'
                                                        type='radio'
                                                        checked={activeTab === 'legal'}
                                                        onChange={() => setActiveTab('legal')}
                                                        className={styles.radio_input}
                                                    />
                                                    Юр.лицо
                                                </label>
                                            </div>

                                            <div className={styles.tab_content}>
                                                <AnimatePresence mode='wait'>
                                                    {activeTab === 'physical' && (
                                                        <motion.div
                                                            key="physical"
                                                            variants={tabVariants}
                                                            initial="hidden"
                                                            animate="visible"
                                                            exit="exit"
                                                            className={styles.physical_tab}
                                                        >
                                                            <FormsCheckout
                                                                ref={formRef}
                                                                type={'physical'}
                                                                setSubmitted={setIsSubmitSuccessful}
                                                                setIsSubmit={setIsSubmit}
                                                                setPaymentMessage={setPaymentMessage}
                                                                setOrderWasCreate={setOrderWasCreate}
                                                            />
                                                        </motion.div>
                                                    )}

                                                    {activeTab === 'legal' && (
                                                        <motion.div
                                                            key="legal"
                                                            variants={tabVariants}
                                                            initial="hidden"
                                                            animate="visible"
                                                            exit="exit"
                                                            className={styles.legal_tab}
                                                        >
                                                            <FormsCheckout
                                                                ref={formRef}
                                                                type={'legal'}
                                                                setSubmitted={setIsSubmitSuccessful}
                                                            />
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </div>
                                        </div>

                                        <CartInfo
                                            isSubmit={isSubmit}
                                            setIsSubmit={setIsSubmit}
                                            forSubmit={true}
                                            onSubmit={() => formRef.current?.submit()} />
                                    </>
                                )
                            }

                            {cartItems.length == 0 && !orderWasCreate && (
                                <div>
                                    <div style={{ marginBottom: '10px' }}>Ваша корзина пуста</div>
                                    <LinkButton href='/catalog' text={'Перейти в каталог'} />
                                </div>
                            )}
                        </>
                    }
                </div>
            </div>
        </section >
    );
}