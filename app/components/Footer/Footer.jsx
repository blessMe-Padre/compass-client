'use client'
import useContactStore from '@/app/store/contactStore';
import styles from './style.module.scss';
import Image from 'next/image';
import Link from 'next/link';

import fetchData from '@/app/utils/fetchData';
import { useEffect, useState } from 'react';
import { Cookies } from '@/app/components';

const Footer = () => {

    const menu_clients = [
        {
            'link': '/about',
            'title': 'О компании'
        },
        {
            'link': '/delivery',
            'title': 'Условия доставки'
        },
        {
            'link': '/payment',
            'title': 'Способы оплаты'
        },
        {
            'link': '/guarantee',
            'title': 'Гарантия на товар'
        },
        {
            'link': '/contacts',
            'title': 'Контакты'
        },
        {
            'link': '/offer',
            'title': 'Публичная оферта'
        },
        {
            'link': '/policy',
            'title': 'Политика конфиденциальности'
        },
        {
            'link': '/agrement',
            'title': 'Пользовательское соглашение'
        }

    ]

    const [linksCatalog, setLinksCatalog] = useState();
    const { contacts } = useContactStore();


    useEffect(() => {
        const fetchLinks = async () => {
            try {
                const response = await fetchData(
                    `${process.env.NEXT_PUBLIC_DOMAIN}/api/menyu-v-futere-dlya-kategorij?populate=*`
                );

                if (!response?.data?.kategoriis) {
                    throw new Error('Invalid response structure');
                }

                const data = response.data.kategoriis;

                setLinksCatalog(data);

            } catch (error) {
                console.error('Error fetching links:', error);
                setLinksCatalog([]);
            }
        }

        fetchLinks();
    }, []);

    return (
        <>
            <section className={styles.footer}>
                <div className='container flex-column'>
                    <div>
                        <div className={styles.footer_logo}>
                            <Image
                                src='../icons/logo__footer.svg'
                                className={styles.logo__footer}
                                width={200}
                                height={100}
                                alt='logo_footer'
                            />
                        </div>

                        <div className={styles.footer_info}>
                            <div>
                                <p className={styles.title_info}>
                                    КОНТАКТЫ
                                </p>

                                <ul className={styles.list_contacts}>
                                    {contacts[0]?.phones?.map((contact, index) => (
                                        <li className={styles.contacts_item} key={index}>
                                            <Link key={`${contact.id}-${index}`}
                                                href={`tel:+${contact.tel_for_robot}`}>
                                                {contact.tel}
                                            </Link>
                                        </li>
                                    )
                                    )}</ul>

                                <p className={`${styles.socials_links_email} flex gap-10`}>
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M13.2575 10.1025L20 14.365V5.66L13.2575 10.1025ZM0 5.66V14.365L6.7425 10.1025L0 5.66ZM18.75 3.125H1.25C0.62625 3.125 0.13125 3.59 0.0375 4.18875L10 10.7525L19.9625 4.18875C19.8687 3.59 19.3738 3.125 18.75 3.125ZM12.1125 10.8575L10.3438 12.0225C10.2417 12.0896 10.1221 12.1252 10 12.125C9.88 12.125 9.76125 12.0913 9.65625 12.0225L7.8875 10.8563L0.04 15.82C0.13625 16.4137 0.62875 16.875 1.25 16.875H18.75C19.3713 16.875 19.8638 16.4137 19.96 15.82L12.1125 10.8575Z" fill="white" />
                                    </svg>

                                    {contacts.map((item, idx) =>
                                        <Link className={styles.email} key={idx} href={`mailto:+${item.email}`}>
                                            {item.email}
                                        </Link>)}
                                </p>

                                <div className={`${styles.social_adress} flex align-center gap-10`}>
                                    <svg width="14" height="20" viewBox="0 0 14 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M6.99989 0.833984C3.26099 0.833984 0.21582 3.87915 0.21582 7.61805C0.21582 13.2413 6.24602 18.5176 6.51002 18.7438L6.99989 19.1659L7.48975 18.7438C7.75339 18.5176 13.784 13.2413 13.784 7.61805C13.784 3.87915 10.7388 0.833984 6.99989 0.833984ZM6.99989 11.387C4.91942 11.387 3.23092 9.69852 3.23092 7.61805C3.23092 5.53758 4.91942 3.84908 6.99989 3.84908C9.08035 3.84908 10.7689 5.53758 10.7689 7.61805C10.7689 9.69852 9.08035 11.387 6.99989 11.387Z" fill="white" />
                                    </svg>

                                    {contacts.map((item, idx) => <Link key={idx} href={`https://2gis.ru/vladivostok/geo/3519072864044086'`}>{item.address}</Link>)}
                                </div>

                                <div className={styles.socials_links}>
                                    <p>
                                        Мы в социальных сетях:
                                    </p>

                                    <div className='flex gap-10'>
                                        {contacts[0]?.social_links.map((item, idx) => (
                                            <Link key={idx} href={`${item.link}`}>
                                                {item.icon && <Image src={`${process.env.NEXT_PUBLIC_DOMAIN}${item.icon[0].url}`} width={40} height={40} alt={item.link} />}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>



                            <div className={styles.wrapper_catalog_menu}>
                                <p className={styles.title_info}>
                                    КАТАЛОГ
                                </p>


                                <ul className={styles.menu_categories}>
                                    {
                                        linksCatalog?.map((el, idx) =>
                                            <li key={idx} className={styles.menu_item}>
                                                <Link href={`/catalog?slug=${el?.slug}`}>
                                                    {el.name}
                                                </Link>
                                            </li>
                                        )
                                    }
                                </ul>

                            </div>

                            <div>
                                <p className={styles.title_info}>
                                    КЛИЕНТАМ
                                </p>


                                <ul className={styles.menu_clients}>
                                    {
                                        menu_clients.map((el, idx) =>
                                            <li key={idx} className={styles.menu_item}>
                                                <a href={el.link}>{el.title}</a>
                                            </li>
                                        )
                                    }
                                </ul>

                            </div>



                        </div>

                        <div className={styles.footer_info_other}>
                            <div>
                                <p>Разработки сайта <a className={styles.inside_link} href='https://inside360.ru' target='_blank'>INSIDE360</a></p>
                            </div>

                            <div>
                                <p>{new Date().getFullYear()} © КОМПАС-СП | Официальный интернет-магазин</p>
                            </div>

                            <div className='flex gap-10'>
                                <div>
                                    <Image
                                        src='../icons/mastercard.svg'
                                        width={60}
                                        height={40}
                                        alt='logo_bank'
                                    />
                                </div>

                                <div>
                                    <Image
                                        src='../icons/visa.svg'
                                        width={60}
                                        height={40}
                                        alt='logo_bank'
                                    />
                                </div>

                                <div>
                                    <Image
                                        src='../icons/mir.svg'
                                        width={60}
                                        height={40}
                                        alt='logo_bank'
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Cookies />
        </>
    )
}

export default Footer