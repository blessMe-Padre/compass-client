'use client'
import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import Image from "next/image";
import { motion } from "framer-motion";
import { usePathname } from 'next/navigation';
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

    // разные цвета header для страниц
    const pathname = usePathname();
    const isHome = pathname === '/';

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
                        <Link
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