'use client'
import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import Image from "next/image";
import { motion } from "framer-motion";
import { usePathname } from 'next/navigation';
import styles from './style.module.scss'; 

import useCartStore from '@/app/store/cartStore';

const domain = 'http://90.156.134.142:1337'

import { MenuButton, PageMenu, Search, MiniCart } from './../index';

const catalogLinks = [
    {
        title: 'КАТАЛОГ',
        link: '#',
        subMenuLvl1: [
            {
                title: 'Новинки', link: '#', subMenuLvl2: [
                    { title: 'меню2', link: '#' },
                    { title: 'меню2', link: '#' },
                    { title: 'меню2', link: '#' },
                    { title: 'меню2', link: '#' },
                ]
            },
            {
                title: 'Спецодежда', link: '#', subMenuLvl2: [
                    { title: 'меню3', link: '#' },
                    { title: 'меню3', link: '#' },
                    { title: 'меню3', link: '#' },
                    { title: 'меню3', link: '#' },
                ]
            },
            {
                title: 'Обувь', link: '#', subMenuLvl2: [
                    { title: 'меню3', link: '#' },
                    { title: 'меню3', link: '#' },
                    { title: 'меню3', link: '#' },
                    { title: 'меню3', link: '#' },
                ]
            },
            {
                title: 'Одежда', link: '/catalog/category/11', subMenuLvl2: [
                    { title: 'меню3', link: '#' },
                    { title: 'меню3', link: '#' },
                    { title: 'меню3', link: '#' },
                    { title: 'меню3', link: '#' },
                ]
            },
            {
                title: 'Туризм и активный отдых', link: '#', subMenuLvl2: [
                    { title: 'меню3', link: '#' },
                    { title: 'меню3', link: '#' },
                    { title: 'меню3', link: '#' },
                    { title: 'меню3', link: '#' },
                ]
            },
        ]
    },
    {
        title: 'СПЕЦОДЕЖДА',
        link: '#',
        subMenuLvl1: [
            {
                title: 'Новинки2', link: '#', subMenuLvl2: [
                    { title: 'меню222', link: '#' },
                    { title: 'меню2222', link: '#' },
                    { title: 'меню2222', link: '#' },
                    { title: 'меню22222', link: '#' },
                ]
            },
            {
                title: 'Спецодежда2', link: '#', subMenuLvl2: [
                    { title: 'меню3', link: '#' },
                    { title: 'меню3', link: '#' },
                    { title: 'меню3', link: '#' },
                    { title: 'меню3', link: '#' },
                ]
            },
            {
                title: 'Обувь2', link: '#', subMenuLvl2: [
                    { title: 'меню3', link: '#' },
                    { title: 'меню3', link: '#' },
                    { title: 'меню3', link: '#' },
                    { title: 'меню3', link: '#' },
                ]
            },
            {
                title: 'Одежда2', link: '#', subMenuLvl2: [
                    { title: 'меню3', link: '#' },
                    { title: 'меню3', link: '#' },
                    { title: 'меню3', link: '#' },
                    { title: 'меню3', link: '#' },
                ]
            },
            {
                title: 'Туризм и активный отдых2', link: '#', subMenuLvl2: [
                    { title: 'меню3', link: '#' },
                    { title: 'меню3', link: '#' },
                    { title: 'меню3', link: '#' },
                    { title: 'меню3', link: '#' },
                ]
            },
        ]
    },
    {
        title: 'ОБУВЬ',
        link: '#',
        subMenuLvl1: [
            {
                title: 'Новинки', link: '#', subMenuLvl2: [
                    { title: 'меню3', link: '#' },
                    { title: 'меню3', link: '#' },
                    { title: 'меню3', link: '#' },
                    { title: 'меню3', link: '#' },
                ]
            },
            {
                title: 'Спецодежда', link: '#', subMenuLvl2: [
                    { title: 'меню3', link: '#' },
                    { title: 'меню3', link: '#' },
                    { title: 'меню3', link: '#' },
                    { title: 'меню3', link: '#' },
                ]
            },
            {
                title: 'Обувь', link: '#', subMenuLvl2: [
                    { title: 'меню3', link: '#' },
                    { title: 'меню3', link: '#' },
                    { title: 'меню3', link: '#' },
                    { title: 'меню3', link: '#' },
                ]
            },
            {
                title: 'Одежда', link: '#', subMenuLvl2: [
                    { title: 'меню3', link: '#' },
                    { title: 'меню3', link: '#' },
                    { title: 'меню3', link: '#' },
                    { title: 'меню3', link: '#' },
                ]
            },
            {
                title: 'Туризм и активный отдых', link: '#', subMenuLvl2: [
                    { title: 'меню3', link: '#' },
                    { title: 'меню3', link: '#' },
                    { title: 'меню3', link: '#' },
                    { title: 'меню3', link: '#' },
                ]
            },
        ]
    },
    {
        title: 'МАСКИРОВКА',
        link: '#',
        subMenuLvl1: [
            {
                title: 'Новинки', link: '#', subMenuLvl2: [
                    { title: 'меню3', link: '#' },
                    { title: 'меню3', link: '#' },
                    { title: 'меню3', link: '#' },
                    { title: 'меню3', link: '#' },
                ]
            },
            {
                title: 'Спецодежда', link: '#', subMenuLvl2: [
                    { title: 'меню3', link: '#' },
                    { title: 'меню3', link: '#' },
                    { title: 'меню3', link: '#' },
                    { title: 'меню3', link: '#' },
                ]
            },
            {
                title: 'Обувь', link: '#', subMenuLvl2: [
                    { title: 'меню3', link: '#' },
                    { title: 'меню3', link: '#' },
                    { title: 'меню3', link: '#' },
                    { title: 'меню3', link: '#' },
                ]
            },
            {
                title: 'Одежда', link: '#', subMenuLvl2: [
                    { title: 'меню3', link: '#' },
                    { title: 'меню3', link: '#' },
                    { title: 'меню3', link: '#' },
                    { title: 'меню3', link: '#' },
                ]
            },
            {
                title: 'Туризм и активный отдых', link: '#', subMenuLvl2: [
                    { title: 'меню3', link: '#' },
                    { title: 'меню3', link: '#' },
                    { title: 'меню3', link: '#' },
                    { title: 'меню3', link: '#' },
                ]
            },
        ]
    },
    {
        title: 'ОЧКИ',
        link: '#',
        subMenuLvl1: [
            {
                title: 'Новинки', link: '#', subMenuLvl2: [
                    { title: 'меню3', link: '#' },
                    { title: 'меню3', link: '#' },
                    { title: 'меню3', link: '#' },
                    { title: 'меню3', link: '#' },
                ]
            },
            {
                title: 'Спецодежда', link: '#', subMenuLvl2: [
                    { title: 'меню3', link: '#' },
                    { title: 'меню3', link: '#' },
                    { title: 'меню3', link: '#' },
                    { title: 'меню3', link: '#' },
                ]
            },
            {
                title: 'Обувь', link: '#', subMenuLvl2: [
                    { title: 'меню3', link: '#' },
                    { title: 'меню3', link: '#' },
                    { title: 'меню3', link: '#' },
                    { title: 'меню3', link: '#' },
                ]
            },
            {
                title: 'Одежда', link: '#', subMenuLvl2: [
                    { title: 'меню3', link: '#' },
                    { title: 'меню3', link: '#' },
                    { title: 'меню3', link: '#' },
                    { title: 'меню3', link: '#' },
                ]
            },
            {
                title: 'Туризм и активный отдых', link: '#', subMenuLvl2: [
                    { title: 'меню3', link: '#' },
                    { title: 'меню3', link: '#' },
                    { title: 'меню3', link: '#' },
                    { title: 'меню3', link: '#' },
                ]
            },
        ]
    },
    {
        title: 'СУВЕНИРЫ',
        link: '#',
        subMenuLvl1: [
            {
                title: 'Новинки', link: '#', subMenuLvl2: [
                    { title: 'меню3', link: '#' },
                    { title: 'меню3', link: '#' },
                    { title: 'меню3', link: '#' },
                    { title: 'меню3', link: '#' },
                ]
            },
            {
                title: 'Спецодежда', link: '#', subMenuLvl2: [
                    { title: 'меню3', link: '#' },
                    { title: 'меню3', link: '#' },
                    { title: 'меню3', link: '#' },
                    { title: 'меню3', link: '#' },
                ]
            },
            {
                title: 'Обувь', link: '#', subMenuLvl2: [
                    { title: 'меню3', link: '#' },
                    { title: 'меню3', link: '#' },
                    { title: 'меню3', link: '#' },
                    { title: 'меню3', link: '#' },
                ]
            },
            {
                title: 'Одежда', link: '#', subMenuLvl2: [
                    { title: 'меню3', link: '#' },
                    { title: 'меню3', link: '#' },
                    { title: 'меню3', link: '#' },
                    { title: 'меню3', link: '#' },
                ]
            },
            {
                title: 'Туризм и активный отдых', link: '#', subMenuLvl2: [
                    { title: 'меню3', link: '#' },
                    { title: 'меню3', link: '#' },
                    { title: 'меню3', link: '#' },
                    { title: 'меню3', link: '#' },
                ]
            },
        ]
    },
]

const Header = () => {
    const [isMobile, setIsMobile] = useState(false);
    const [opened, setOpened] = useState(false);
    const [searchOpened, setSearchOpened] = useState(false);
    const [modalMiniCartOpened, setModalMiniCartOpened] = useState(false)

    // разные цвета header для страниц
    const pathname = usePathname();
    const isHome = pathname === '/';

    // состояния меню каталога
    const [activeSubmenuLvl1, setActiveSubmenuLvl1] = useState(null);
    const [hoveredSubmenuItem, setHoveredSubmenuItem] = useState(null);

    const { cartItems, removeFromCart  } = useCartStore();

    const menuClick = (e) => {
        document.querySelectorAll(`.${styles.catalog_list} li a`).forEach(link => {
            link.classList.remove(`${styles.catalog_item_active}`);
        });

        document.querySelectorAll(`.${styles.submenu}`).forEach(ul => {
            ul.classList.remove(styles.submenu_active);
        });

        const targetLink = e.target;
        targetLink.classList.add(`${styles.catalog_item_active}`);

        const nextUl = targetLink.parentElement.querySelector('ul');
        if (nextUl) {
            nextUl.classList.add(styles.submenu_active);
        }
    }

    const returnToPrev = () => {
        setHoveredSubmenuItem(null);
    };

    const closeMobileCatalogMenu = () => {
        setHoveredSubmenuItem(null);
        setActiveSubmenuLvl1(null);
        document.querySelectorAll(`.${styles.submenu}`).forEach(ul => {
            ul.classList.remove(styles.submenu_active);
        });
    };

    const handleClickMiniCart = () => {
        modalMiniCartOpened === true ? setModalMiniCartOpened(false) : setModalMiniCartOpened(true)
    }

    // Работа с поиском
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

    const menuRef = useRef(null);
    const buttonRef = useRef(null);
    const submenuRef = useRef(null);
    const modalMiniCartRef = useRef(null);


    useEffect(() => {
        if (isMobile) return;

        const handleClickOutside = (e) => {
            const menu = document.querySelector(`.${styles.catalog_list}`);
            if (menu && !menu.contains(e.target)) {
                document.querySelectorAll(`.${styles.catalog_list} li a`).forEach(link => {
                    link.classList.remove(styles.catalog_item_active);
                });
                document.querySelectorAll(`.${styles.submenu}`).forEach(ul => {
                    ul.classList.remove(styles.submenu_active);
                });
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [isMobile]);

    useEffect(() => {
        const checkIsMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        checkIsMobile(); // запустить после монтирования
        window.addEventListener('resize', checkIsMobile);

        return () => {
            window.removeEventListener('resize', checkIsMobile);
        };
    }, []);


    // закрываем поиск при клике вне попапа
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!searchOpened) return;

            const isClickOutsideMenu = !menuRef.current || !menuRef.current.contains(event.target);
            const isClickOutsideButton = !buttonRef.current || !buttonRef.current.contains(event.target);

            if (isClickOutsideMenu && isClickOutsideButton) {
                setSearchOpened(false);
            }
        };

        const handleSliderClick = () => {
            setSearchOpened(false);
        };

        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("sliderClick", handleSliderClick);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("sliderClick", handleSliderClick);
        };
    }, [searchOpened]);

    const handleClickOutside = (e) => {
        if (
        modalMiniCartRef.current && 
        !modalMiniCartRef.current.contains(e.target) &&
        // Дополнительная проверка, если есть кнопка открытия
        !e.target.closest('.cart-btn') 
        ) {
        setModalMiniCartOpened(false);
        }
    };

    useEffect(() => {
        if (modalMiniCartOpened) {
        document.addEventListener('mousedown', handleClickOutside);
        } else {
        document.removeEventListener('mousedown', handleClickOutside);
        }
        
        return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [modalMiniCartOpened]);

    return (
        <header className={`
            ${styles.header} header`}>

            <div ref={menuRef}>
                <motion.div
                    layout
                    variants={variants}
                    initial={"hidden"}
                    animate={searchOpened ? "visible" : "hidden"}
                    className="overflow-hidden"
                >
                    <Search />
                </motion.div>
            </div>

            <div className="container">
                <PageMenu opened={opened} setOpened={setOpened} isHome={isHome} />
                <div className={styles.header_wrapper}>
                    <div className={styles.header_inner}>
                        <Link href="/">
                            <Image
                                className={styles.logo}
                                src="/logo.svg"
                                alt="logo"
                                width={192}
                                height={74}
                                priority
                            />
                        </Link>

                        <div className={styles.header_block}>
                            <MenuButton
                                onClick={() => {
                                    setOpened(!opened);
                                }}
                                opened={opened}
                            />
                            <div className='relative'>
                                <ul className={`${styles.catalog_list}`}>
                                    {catalogLinks.map((item, index) => (
                                        <li key={index} className={styles.catalog_list_item}>
                                            <Link
                                                href={item.link}
                                                onClick={menuClick}
                                                className={`${isHome ? styles.link_homeColor : styles.link_otherColor}`}
                                            >
                                                {item.title}
                                            </Link>
                                            {/* subMenuLvl1 */}
                                            <ul className={styles.submenu}>
                                                {isMobile &&
                                                    <div className={styles.menu_wrapper}>
                                                        <p onClick={returnToPrev} className={styles.text}>Каталог</p>
                                                        <div onClick={closeMobileCatalogMenu}>
                                                            <Image
                                                                src="/сlose.svg"
                                                                alt="сlose"
                                                                width={20}
                                                                height={20}
                                                                priority
                                                            />
                                                        </div>
                                                    </div>
                                                }
                                                {item.subMenuLvl1.map((subItem, subIndex) => (
                                                    <li
                                                        key={subIndex}
                                                        onMouseEnter={() => {
                                                            setHoveredSubmenuItem(subItem);
                                                            setActiveSubmenuLvl1(subItem);
                                                        }}
                                                        onMouseLeave={() => setHoveredSubmenuItem(null)}
                                                    >
                                                        <Link href={subItem.link}>{subItem.title}</Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        </li>
                                    ))}
                                </ul>

                                {hoveredSubmenuItem?.subMenuLvl2?.length > 0 && (
                                    <div
                                        ref={submenuRef}
                                        className={`${styles.submenu_2} ${styles.active}`}
                                        onMouseEnter={() => setHoveredSubmenuItem(hoveredSubmenuItem)}
                                        onMouseLeave={() => setHoveredSubmenuItem(null)}
                                    >
                                        {isMobile &&
                                            <div className={styles.menu_wrapper}>
                                                <p onClick={returnToPrev} className={styles.text}>
                                                    ← {hoveredSubmenuItem.title}
                                                </p>
                                                <div onClick={closeMobileCatalogMenu}>
                                                    <Image
                                                        src="/сlose.svg"
                                                        alt="сlose"
                                                        width={20}
                                                        height={20}
                                                        priority
                                                    />
                                                </div>
                                            </div>
                                        }

                                        {hoveredSubmenuItem.subMenuLvl2.map((subItem, index) => (
                                            <Link key={index} href={subItem.link}>
                                                {subItem.title}
                                            </Link>
                                        ))}
                                    </div>
                                )}

                            </div>
                        </div>
                    </div>


                    {/* Кнопки пользователя */}
                    <div className={styles.user_nav}>
                        <button
                            ref={buttonRef}
                            className={`${styles.button} ${isHome ? styles.button_homeColor_1 : styles.button_otherColor_1}`}
                            onClick={() => setSearchOpened(!searchOpened)}
                            title='Поиск'
                        >
                            <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8.57129 0.799805C12.9077 0.799805 16.3926 4.22886 16.3926 8.42188C16.3926 12.6149 12.9077 16.0439 8.57129 16.0439C4.23496 16.0439 0.75 12.6149 0.75 8.42188C0.750013 4.2289 4.23497 0.799878 8.57129 0.799805Z" strokeWidth="1.5" />
                                <path d="M14.1426 14.2822L17.9997 18.0497" strokeWidth="1.5" strokeLinecap="round" />
                            </svg>
                        </button>

                        <Link
                            href={'/wishlist'}
                            className={`${styles.button} ${isHome ? styles.button_homeColor : styles.button_otherColor}`}
                            title='Избранное'
                        >
                            <svg width="22" height="24" viewBox="0 0 22 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7.16466 4.66051C8.34239 4.68581 9.48957 5.24701 10.3119 6.73664C10.6174 7.28915 11.3801 7.28915 11.6869 6.73664C12.5094 5.24727 13.6566 4.68607 14.8341 4.66051C16.0118 4.63368 17.2174 5.2143 17.961 6.14861C19.3959 7.9536 19.5793 11.1079 17.4785 13.3177L10.9993 19.1541L4.51904 13.3177C2.4195 11.1082 2.60162 7.9536 4.03773 6.14861C4.78133 5.2143 5.98693 4.63368 7.16466 4.66051ZM7.19888 2.99838C5.51588 2.96081 3.8825 3.74639 2.8155 5.08652C0.842104 7.56771 0.723549 11.6937 3.39728 14.4981C3.41146 14.5132 3.42662 14.5275 3.44202 14.5421L10.4813 20.8801C10.6255 21.0096 10.8093 21.0808 10.9994 21.0808C11.1895 21.0808 11.3733 21.0096 11.5175 20.8801L18.558 14.5421C18.5734 14.5275 18.5873 14.5132 18.6015 14.4981C21.2752 11.6934 21.1552 7.56771 19.182 5.08652C18.1165 3.74613 16.4817 2.96055 14.7996 2.99838C13.4044 3.02853 12.0587 3.83915 10.9993 5.16625C9.94008 3.83915 8.59442 3.02853 7.19888 2.99838Z" />
                            </svg>
                        </Link>

                        <div className='relative'>
                            {
                                isMobile === false && (
                                    <>
                                        <button
                                            className={`${styles.button} ${isHome ? styles.button_homeColor : styles.button_otherColor} cart-btn relative`}
                                            title='Корзина'
                                            onClick={handleClickMiniCart}
                                        >
                                            <svg width="25" height="26" viewBox="0 0 25 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M7.5623 7.58089H6.17845C5.71744 7.58091 5.27356 7.75559 4.93619 8.06977C4.59882 8.38395 4.39302 8.81428 4.36022 9.27412L3.46751 21.7741C3.4497 22.0238 3.4835 22.2745 3.56681 22.5105C3.65012 22.7465 3.78114 22.9629 3.95172 23.1461C4.1223 23.3293 4.32878 23.4754 4.55829 23.5753C4.7878 23.6752 5.03543 23.7267 5.28574 23.7267H19.7149C19.9652 23.7266 20.2127 23.6749 20.4422 23.575C20.6716 23.475 20.878 23.3289 21.0486 23.1458C21.2191 22.9626 21.3501 22.7463 21.4335 22.5103C21.5169 22.2744 21.5508 22.0238 21.5331 21.7741L20.6404 9.27412C20.6076 8.81428 20.4018 8.38395 20.0645 8.06977C19.7271 7.75559 19.2832 7.58091 18.8222 7.58089H17.4482V7.32048C17.4482 6.00821 16.9269 4.74968 15.999 3.82177C15.0711 2.89386 13.8126 2.37256 12.5003 2.37256C9.86751 2.37256 7.43418 4.46943 7.55241 7.32048L7.5623 7.58089ZM17.4482 9.14339V13.0496C17.4482 13.2568 17.3659 13.4556 17.2194 13.6021C17.0729 13.7486 16.8742 13.8309 16.667 13.8309C16.4598 13.8309 16.2611 13.7486 16.1146 13.6021C15.9681 13.4556 15.8857 13.2568 15.8857 13.0496V9.14339H9.11491V13.0496C9.11491 13.2568 9.0326 13.4556 8.88608 13.6021C8.73957 13.7486 8.54086 13.8309 8.33366 13.8309C8.12646 13.8309 7.92774 13.7486 7.78123 13.6021C7.63472 13.4556 7.55241 13.2568 7.55241 13.0496C7.55241 13.0496 7.62011 11.2241 7.59772 9.14339H6.17845C6.11269 9.14348 6.0494 9.16845 6.00129 9.21328C5.95318 9.2581 5.92381 9.31947 5.91907 9.38506L5.02584 21.8851C5.02327 21.9208 5.02808 21.9566 5.03997 21.9904C5.05187 22.0241 5.07059 22.0551 5.09498 22.0813C5.11937 22.1075 5.14889 22.1283 5.18172 22.1426C5.21454 22.1569 5.24995 22.1642 5.28574 22.1642H19.7149C19.7507 22.1641 19.786 22.1566 19.8187 22.1423C19.8515 22.128 19.881 22.1071 19.9053 22.0809C19.9297 22.0548 19.9484 22.0239 19.9604 21.9902C19.9723 21.9565 19.9772 21.9207 19.9748 21.8851L19.0816 9.38506C19.0768 9.31947 19.0475 9.2581 18.9994 9.21328C18.9512 9.16845 18.888 9.14348 18.8222 9.14339H17.4482ZM15.8857 7.58089V7.32048C15.8857 6.42261 15.5291 5.56151 14.8942 4.92662C14.2593 4.29174 13.3982 3.93506 12.5003 3.93506C11.6025 3.93506 10.7414 4.29174 10.1065 4.92662C9.47158 5.56151 9.11491 6.42261 9.11491 7.32048V7.58089H15.8857Z" />
                                            </svg>

                                            {cartItems.length > 0 && (
                                                <div className={styles.cartAmount}>
                                                    {cartItems.length}
                                                </div>
                                            )}
                                        </button>

                            
                                        {modalMiniCartOpened && (
                                            <motion.div
                                                ref={modalMiniCartRef}
                                                variants={variants}
                                                className={styles.mini_cart}>
                                                {cartItems.length > 0
                                                    ? (
                                                    <MiniCart cartItems={cartItems} />
                                                    )
                                                    : 'В вашей корзине пусто'
                                                }
                                            </motion.div>
                                        )}
                                    
                                    </>
                                )   
                            }    
                            
                            {
                                isMobile === true && (
                                    <>
                                    
                                        <Link
                                            href={'/cart'}
                                            className={`${styles.button} ${isHome ? styles.button_homeColor : styles.button_otherColor} cart-btn relative`}
                                            title='Корзина'  
                                        >

                                            <svg width="25" height="26" viewBox="0 0 25 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M7.5623 7.58089H6.17845C5.71744 7.58091 5.27356 7.75559 4.93619 8.06977C4.59882 8.38395 4.39302 8.81428 4.36022 9.27412L3.46751 21.7741C3.4497 22.0238 3.4835 22.2745 3.56681 22.5105C3.65012 22.7465 3.78114 22.9629 3.95172 23.1461C4.1223 23.3293 4.32878 23.4754 4.55829 23.5753C4.7878 23.6752 5.03543 23.7267 5.28574 23.7267H19.7149C19.9652 23.7266 20.2127 23.6749 20.4422 23.575C20.6716 23.475 20.878 23.3289 21.0486 23.1458C21.2191 22.9626 21.3501 22.7463 21.4335 22.5103C21.5169 22.2744 21.5508 22.0238 21.5331 21.7741L20.6404 9.27412C20.6076 8.81428 20.4018 8.38395 20.0645 8.06977C19.7271 7.75559 19.2832 7.58091 18.8222 7.58089H17.4482V7.32048C17.4482 6.00821 16.9269 4.74968 15.999 3.82177C15.0711 2.89386 13.8126 2.37256 12.5003 2.37256C9.86751 2.37256 7.43418 4.46943 7.55241 7.32048L7.5623 7.58089ZM17.4482 9.14339V13.0496C17.4482 13.2568 17.3659 13.4556 17.2194 13.6021C17.0729 13.7486 16.8742 13.8309 16.667 13.8309C16.4598 13.8309 16.2611 13.7486 16.1146 13.6021C15.9681 13.4556 15.8857 13.2568 15.8857 13.0496V9.14339H9.11491V13.0496C9.11491 13.2568 9.0326 13.4556 8.88608 13.6021C8.73957 13.7486 8.54086 13.8309 8.33366 13.8309C8.12646 13.8309 7.92774 13.7486 7.78123 13.6021C7.63472 13.4556 7.55241 13.2568 7.55241 13.0496C7.55241 13.0496 7.62011 11.2241 7.59772 9.14339H6.17845C6.11269 9.14348 6.0494 9.16845 6.00129 9.21328C5.95318 9.2581 5.92381 9.31947 5.91907 9.38506L5.02584 21.8851C5.02327 21.9208 5.02808 21.9566 5.03997 21.9904C5.05187 22.0241 5.07059 22.0551 5.09498 22.0813C5.11937 22.1075 5.14889 22.1283 5.18172 22.1426C5.21454 22.1569 5.24995 22.1642 5.28574 22.1642H19.7149C19.7507 22.1641 19.786 22.1566 19.8187 22.1423C19.8515 22.128 19.881 22.1071 19.9053 22.0809C19.9297 22.0548 19.9484 22.0239 19.9604 21.9902C19.9723 21.9565 19.9772 21.9207 19.9748 21.8851L19.0816 9.38506C19.0768 9.31947 19.0475 9.2581 18.9994 9.21328C18.9512 9.16845 18.888 9.14348 18.8222 9.14339H17.4482ZM15.8857 7.58089V7.32048C15.8857 6.42261 15.5291 5.56151 14.8942 4.92662C14.2593 4.29174 13.3982 3.93506 12.5003 3.93506C11.6025 3.93506 10.7414 4.29174 10.1065 4.92662C9.47158 5.56151 9.11491 6.42261 9.11491 7.32048V7.58089H15.8857Z" />
                                            </svg>

                                        </Link>
                                    
                                        {cartItems.length > 0 && (
                                            <div className={styles.cartAmount}>
                                                {cartItems.length}
                                            </div>
                                        )}
                                    </>
                                )
                            }
                            
                        </div>


                        

                        <Link
                            title='Личный кабинет'
                            href={'/dashboard'}
                            className={`${styles.button} ${isHome ? styles.button_homeColor : styles.button_otherColor}`}>
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M9 0.0913086C6.355 0.0913086 4.20833 2.23798 4.20833 4.88298C4.20833 7.52798 6.355 9.67464 9 9.67464C11.645 9.67464 13.7917 7.52798 13.7917 4.88298C13.7917 2.23798 11.645 0.0913086 9 0.0913086ZM9 1.34131C10.955 1.34131 12.5417 2.92798 12.5417 4.88298C12.5417 6.83798 10.955 8.42464 9 8.42464C7.045 8.42464 5.45833 6.83798 5.45833 4.88298C5.45833 2.92798 7.045 1.34131 9 1.34131ZM17.125 15.7163C17.125 14.2245 16.5324 12.7937 15.4775 11.7388C14.4226 10.6839 12.9918 10.0913 11.5 10.0913H6.5C5.00816 10.0913 3.57742 10.6839 2.52252 11.7388C1.46763 12.7937 0.875 14.2245 0.875 15.7163C0.875 16.3238 1.11667 16.9071 1.54583 17.3371C1.97602 17.7665 2.55889 18.0077 3.16667 18.008H14.8333C15.4408 18.008 16.0242 17.7663 16.4542 17.3371C16.8835 16.907 17.1247 16.3241 17.125 15.7163ZM15.875 15.7163C15.8746 15.9924 15.7647 16.2571 15.5694 16.4524C15.3742 16.6476 15.1095 16.7575 14.8333 16.758H3.16667C2.89053 16.7575 2.62584 16.6476 2.43058 16.4524C2.23533 16.2571 2.12544 15.9924 2.125 15.7163C2.12467 15.1417 2.23761 14.5726 2.45736 14.0417C2.67711 13.5107 2.99935 13.0283 3.40567 12.622C3.812 12.2157 4.29442 11.8934 4.82537 11.6737C5.35632 11.4539 5.92537 11.341 6.5 11.3413H11.5C12.0746 11.341 12.6437 11.4539 13.1746 11.6737C13.7056 11.8934 14.188 12.2157 14.5943 12.622C15.0006 13.0283 15.3229 13.5107 15.5426 14.0417C15.7624 14.5726 15.8753 15.1417 15.875 15.7163Z" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header