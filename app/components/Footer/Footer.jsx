import styles from './style.module.scss';
import Image from 'next/image';

const Footer = () => {
    const menu_categories = [
        {
            'link': '/',
            'title': 'Спецодежда'
        },
        {
            'link': '/',
            'title': 'Обувь'
        },
        {
            'link': '/',
            'title': 'Одежда'
        },
        {
            'link': '/',
            'title': 'Туризм и активный отдых'
        },
        {
            'link': '/',
            'title': 'Средства индивидуальной защиты'
        },
        {
            'link': '/',
            'title': 'Чулочно-носочные изделия'
        },
        {
            'link': '/',
            'title': 'Маскировка'
        },
        {
            'link': '/',
            'title': 'Детский камуфляж'
        },
        {
            'link': '/',
            'title': 'Очки с эффектом поляризации'
        },
        {
            'link': '/',
            'title': 'Репелленты'
        },
        {
            'link': '/',
            'title': 'Товары для рыбалки'
        },
        {
            'link': '/',
            'title': 'Фонари'
        },
        {
            'link': '/',
            'title': 'Флаги'
        },
        {
            'link': '/',
            'title': 'Сувениры'
        },
        {
            'link': '/',
            'title': 'Подарочные сертификаты'
        },
        {
            'link': '/',
            'title': 'Пневматика, средства по уходу за оружием'
        },
        
    ]

    const menu_clients = [
        {
            'link': '/',
            'title': 'О компании'
        },
        {
            'link': '/',
            'title': 'Условия доставки'
        },
        {
            'link': '/',
            'title': 'Способы оплаты'
        },
        {
            'link': '/',
            'title': 'Гарантия на товар'
        },
        {
            'link': '/',
            'title': 'Контакты'
        },
        {
            'link': '/',
            'title': 'Публичная оферта'
        },
        {
            'link': '/',
            'title': 'Политика конфиденциальности'
        },
        {
            'link': '/',
            'title': 'Пользовательское соглашение'
        }
        
    ]


    return (
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
                                <li className={styles.contacts_item}><a href='tel:+74232446090'>8 (423) 244-6090</a></li>
                                <li className={styles.contacts_item}><a href='tel:+74232302238'>8 (423) 230-2238</a></li>
                                <li className={styles.contacts_item}><a href='tel:+74232302239'>8 (423) 230-2239</a></li>
                            </ul>

                            <p className={`${styles.socials_links_email} flex gap-10`}>
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M13.2575 10.1025L20 14.365V5.66L13.2575 10.1025ZM0 5.66V14.365L6.7425 10.1025L0 5.66ZM18.75 3.125H1.25C0.62625 3.125 0.13125 3.59 0.0375 4.18875L10 10.7525L19.9625 4.18875C19.8687 3.59 19.3738 3.125 18.75 3.125ZM12.1125 10.8575L10.3438 12.0225C10.2417 12.0896 10.1221 12.1252 10 12.125C9.88 12.125 9.76125 12.0913 9.65625 12.0225L7.8875 10.8563L0.04 15.82C0.13625 16.4137 0.62875 16.875 1.25 16.875H18.75C19.3713 16.875 19.8638 16.4137 19.96 15.82L12.1125 10.8575Z" fill="white"/>
                                </svg>

                                <a href='kompas-vl@mail.ru'>kompas-vl@mail.ru</a>
                            </p>

                            <div className={`${styles.social_adress} flex align-center gap-10`}>
                                <svg width="14" height="20" viewBox="0 0 14 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6.99989 0.833984C3.26099 0.833984 0.21582 3.87915 0.21582 7.61805C0.21582 13.2413 6.24602 18.5176 6.51002 18.7438L6.99989 19.1659L7.48975 18.7438C7.75339 18.5176 13.784 13.2413 13.784 7.61805C13.784 3.87915 10.7388 0.833984 6.99989 0.833984ZM6.99989 11.387C4.91942 11.387 3.23092 9.69852 3.23092 7.61805C3.23092 5.53758 4.91942 3.84908 6.99989 3.84908C9.08035 3.84908 10.7689 5.53758 10.7689 7.61805C10.7689 9.69852 9.08035 11.387 6.99989 11.387Z" fill="white"/>
                                </svg>

                                <a href='https://2gis.ru/vladivostok/geo/3519072864044086'>г. Владивосток, пр-кт <br /> Красного Знамени, д.91</a>
                            </div>

                            <div className={styles.socials_links}>
                                <p>
                                    Мы в социальных сетях:
                                </p>

                                <div className='flex gap-10'>
                                    <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect width="25" height="25" rx="12.5" fill="white"/>
                                        <g clipPath="url(#clip0_356_742)">
                                        <path d="M12.5013 6.49219H12.4983C9.18583 6.49219 6.49219 9.18658 6.49219 12.4998C6.49219 13.8139 6.91572 15.0319 7.63588 16.0209L6.88719 18.2528L9.19634 17.5146C10.1463 18.1439 11.2795 18.5073 12.5013 18.5073C15.8137 18.5073 18.5073 15.8122 18.5073 12.4998C18.5073 9.18733 15.8137 6.49219 12.5013 6.49219ZM15.9969 14.9756C15.852 15.3849 15.2768 15.7243 14.8179 15.8234C14.504 15.8903 14.094 15.9436 12.7138 15.3714C10.9483 14.64 9.81137 12.8459 9.72276 12.7295C9.6379 12.6131 9.00936 11.7796 9.00936 10.9175C9.00936 10.0554 9.44716 9.63565 9.62363 9.45542C9.76857 9.30748 10.0081 9.2399 10.2379 9.2399C10.3122 9.2399 10.3791 9.24365 10.4392 9.24666C10.6156 9.25417 10.7042 9.26468 10.8206 9.54328C10.9656 9.89247 11.3185 10.7546 11.3606 10.8432C11.4034 10.9318 11.4462 11.0519 11.3861 11.1683C11.3298 11.2885 11.2802 11.3418 11.1916 11.4439C11.103 11.5461 11.0189 11.6242 10.9303 11.7338C10.8492 11.8292 10.7576 11.9313 10.8597 12.1078C10.9618 12.2805 11.3148 12.8565 11.8344 13.319C12.505 13.916 13.0487 14.1068 13.2432 14.1879C13.3881 14.248 13.5608 14.2337 13.6667 14.121C13.8011 13.9761 13.9671 13.7358 14.1361 13.4993C14.2562 13.3296 14.4079 13.3085 14.5671 13.3686C14.7293 13.4249 15.5876 13.8492 15.7641 13.9371C15.9406 14.0257 16.057 14.0677 16.0998 14.1421C16.1418 14.2164 16.1418 14.5656 15.9969 14.9756Z" fill="#1E1E1E"/>
                                        </g>
                                        <defs>
                                        <clipPath id="clip0_356_742">
                                        <rect width="12.0151" height="12.0151" fill="white" transform="translate(6.49219 6.49219)"/>
                                        </clipPath>
                                        </defs>
                                    </svg>

                                <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect width="25" height="25" rx="12.5" fill="white"/>
                                    <path d="M11.1935 14.2378L10.9926 17.2891C11.28 17.2891 11.4045 17.1557 11.5537 16.9956L12.9011 15.605L15.693 17.8131C16.205 18.1213 16.5658 17.959 16.7039 17.3044L18.5365 8.03042L18.537 8.02987C18.6995 7.21242 18.2633 6.89276 17.7644 7.0933L6.99245 11.5472C6.25728 11.8554 6.26841 12.298 6.86747 12.4985L9.62144 13.4236L16.0183 9.10087C16.3194 8.88558 16.5931 9.0047 16.368 9.21999L11.1935 14.2378Z" fill="#1E1E1E"/>
                                </svg>

                                </div>
                            </div>
                        </div>

                        <div className={styles.wrapper_catalog_menu}>
                            <p className={styles.title_info}>
                                КАТАЛОГ
                            </p>


                            <ul className={styles.menu_categories}>
                              {
                                menu_categories.map((el, idx) => 
                                    <li key={idx} className={styles.menu_item}>
                                        <a href={el.link}>{el.title}</a>
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
                            <p>Разработки сайта <a href='https://inside360.ru'>INSIDE360</a></p>
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
    )
}

export default Footer