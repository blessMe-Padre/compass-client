'use client'
import Link from 'next/link';

import { useEffect } from 'react';

import { PageMenu } from './../index';
import styles from './style.module.scss';
import Image from "next/image";

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
    }, []);

    return (
        <header className={styles.header}>
            <div className="container">
                <PageMenu />

                <div className={styles.header_wrapper}>
                    <Image
                        className={styles.logo}
                        src="/logo.svg"
                        alt="logo"
                        width={192}
                        height={74}
                        priority
                    />
                    <ul className={`${styles.catalog_list} relative`}>
                        {
                            catalogLinks.map((item, index) => {
                                return (
                                    <li key={index}>
                                        <Link
                                            href={item.link}
                                            onClick={menuClick}
                                        >
                                            {item.title}
                                        </Link>
                                        <ul className={styles.submenu}>
                                            {item.subMenuLvl1.map((item, index) => {
                                                return (
                                                    <li key={index}>
                                                        <Link href={item.link}>{item.title}</Link>
                                                        <ul className={styles.submenu_2}>
                                                            {item.subMenuLvl2.map((item, index) => {
                                                                return (
                                                                    <li key={index}>
                                                                        <Link href={item.link}>{item.title}</Link>
                                                                    </li>
                                                                )
                                                            })}
                                                        </ul>
                                                    </li>
                                                )
                                            })}
                                        </ul>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>

            </div>

        </header>
    )
}

export default Header