'use client'
import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import Image from "next/image";
import { motion } from "framer-motion";
import styles from './style.module.scss';

import { MenuButton, PageMenu, Search } from './../index';

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

    // состояния меню каталога
    const [activeSubmenuLvl1, setActiveSubmenuLvl1] = useState(null);
    const [hoveredSubmenuItem, setHoveredSubmenuItem] = useState(null);

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

    return (
        <header className={`${styles.header} header`}>

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
                <PageMenu opened={opened} setOpened={setOpened} />
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
                                            <Link href={item.link} onClick={menuClick}>
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
                            className={styles.button}
                            onClick={() => setSearchOpened(!searchOpened)}
                        >
                            <Image
                                src="/icons/search-icon.svg"
                                alt="Поиск"
                                width={25}
                                height={25}
                            />
                        </button>
                        <button className={styles.button}>
                            <Image
                                src="/icons/heart-icon.svg"
                                alt="Избранное"
                                width={25}
                                height={25}
                            />
                        </button>
                        <button className={styles.button}>
                            <Image
                                src="/icons/cart-icon.svg"
                                alt="Корзина"
                                width={25}
                                height={25}
                            />
                        </button>
                        <button className={styles.button}>
                            <Image
                                src="/icons/user-icon.svg"
                                alt="Пользователь"
                                width={25}
                                height={25}
                            />
                        </button>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header