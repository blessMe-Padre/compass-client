'use client'
import { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import useCdekTokenStore from '@/app/store/cdekStore';
import useDeliveryStore from '@/app/store/deliveryStore';

import styles from './style.module.scss';

// получаем токен авторизации
const localApiUrl = '/api/cdek/token';
const cdekApiUrl = 'https://api.cdek.ru/v2/oauth/token';

// получаем список городов
const localApiCitiesUrl = '/api/cdek/cities';
const cdekApiCitiesUrl = '';

// получаем список городов
const localApiPvzUrl = '/api/cdek/pvz';


export default function Sdek() {
    const { token, setToken } = useCdekTokenStore();

    const data = useDeliveryStore((state) => state);
    const { storeData, setDeliveryData } = useDeliveryStore();
    console.log('store data', storeData);

    const [connectError, setConnectError] = useState(false);

    // работа с городами
    const [cities, setCities] = useState(null);
    const [currentCity, setCurrentCity] = useState(null);
    const [isSearch, setIsSearch] = useState(false);

    // работа с ПВЗ
    const [pvz, setPvz] = useState(null);
    const [currentPvz, setCurrentPvz] = useState(null);
    const [isPvzList, setIsPvzList] = useState(false);

    // работа с тарифами
    const [tariff, setTariff] = useState(null);
    const [query, setQuery] = useState('');
    const [filteredCities, setFilteredCities] = useState([]);


    const handleAuth = async () => {
        const res = await fetch(localApiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({
                client_id: process.env.NEXT_PUBLIC_CDEK_USER,
                client_secret: process.env.NEXT_PUBLIC_CDEK_PASSWORD,
                grant_type: 'client_credentials'
            })
        })
        if (!res.ok) {
            setConnectError(true);
            throw new Error(await res.text());
        }
        const data = await res.json()
        console.log('CDEK token:', data)
        setToken(data);
    }

    const handleGetCities = async () => {
        setIsSearch(true);

        const res = await fetch(localApiCitiesUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token })
        })

        if (!res.ok) throw new Error(await res.text())

        const cities = await res.json();
        console.log('CDEK города:', cities)
        setCities(cities);
    }

    const handleGetPvz = async (cityCode) => {
        const res = await fetch(localApiPvzUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token, cityCode })
        })

        if (!res.ok) throw new Error(await res.text())

        const pvz = await res.json();
        console.log('пункты выдачи:', pvz)
        setPvz(pvz);
    }

    const handleSearch = (e) => {
        const value = e.target.value
        setQuery(value)

        const results = cities.filter(c =>
            c.city?.toLowerCase().includes(value.toLowerCase())
        )

        setFilteredCities(results)
    }

    const handleSetCity = (city) => {
        handleGetPvz(city.code);
        setDeliveryData({ city: city.city, cityCode: city.code });

        setCurrentCity(city.city);
        setIsSearch(false);
        setIsPvzList(true);
    }

    const handleSetPvz = (pvz) => {
        setCurrentPvz(pvz.name);
        setIsPvzList(false);
        setDeliveryData({ pvzName: pvz.name, pvzCode: pvz.code });
    }

    const handleChangePvz = () => {
        setIsPvzList(true);
    }

    useEffect(() => {
        if (token && token.access_token) return;
        handleAuth();
    }, []);

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

    // перенести в utils 

    const handleGetOrders = async () => {
        const res = await fetch('/api/cdek/orders', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token })
        })

        if (!res.ok) throw new Error(await res.text())

        const order = await res.json();
        console.log('CDEK заказы:', order)
    }

    const handleGetOrdersByUuid = async () => {
        const res = await fetch('/api/cdek/order_uuid', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token })
        })

        if (!res.ok) throw new Error(await res.text())

        const order = await res.json();
        console.log('CDEK заказ по UUID: ', order)
    }

    const handleCreateOrder = async () => {
        const res = await fetch('/api/cdek/create_order', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token })
        })

        if (!res.ok) throw new Error(await res.text())

        const order = await res.json();
        console.log('создан CDEK заказ:', order)
    }

    const handleGetTariff = async () => {
        const res = await fetch('/api/cdek/tariff', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token })
        });

        if (!res.ok) throw new Error(await res.text());
        const data = await res.json();

        ///фильтруем массив подходящих тарифов по имени */
        const filteredTariffs = data.tariff_codes?.filter(tariff => tariff.tariff_name === "Экспресс склад-склад");

        setTariff(filteredTariffs[0]);
    }

    return (
        <div>
            {connectError ? (<p>Ошибка получения данных от СДЭК</p>)
                :
                (
                    <>
                        <div className={styles.city_wrapper}>
                            <p>{currentCity}</p>
                            <button
                                className={styles.button}
                                onClick={handleGetCities}
                            >
                                {currentCity ? 'Изменить город' : 'Выбрать город'}
                            </button>
                        </div>
                        <motion.div
                            layout
                            variants={variants}
                            initial={"hidden"}
                            animate={isSearch ? "visible" : "hidden"}
                            className="overflow-hidden"
                        >

                            <input
                                className={styles.search_input}
                                type="text"
                                placeholder="Введите название города"
                                value={query}
                                onChange={handleSearch}
                            />
                        </motion.div>

                        <div className='relative'>
                            {isSearch &&
                                <ul className={styles.list}>
                                    {filteredCities.slice(0, 10).map((city, i) => (
                                        <li
                                            onClick={() => handleSetCity(city)}
                                            key={i}
                                            className={styles.item}
                                        >
                                            {city.city}, {city.region}
                                        </li>
                                    ))}
                                </ul>
                            }

                        </div>

                        <div className='relative'>
                            {currentPvz && <p>пункт выдачи: {currentPvz}</p>}
                            {currentPvz &&
                                <button
                                    className={styles.button}
                                    onClick={handleChangePvz}
                                >
                                    изменить пункт выдачи
                                </button>
                            }
                            {isPvzList &&
                                <ul className={styles.list}>
                                    {pvz && pvz.map((item, i) => (
                                        <li
                                            key={i}
                                            className={styles.item}
                                            onClick={() => handleSetPvz(item)}
                                        >
                                            <p>{item?.name}</p>
                                            <p>{item?.address_comment}</p>
                                        </li>
                                    ))}
                                </ul>
                            }

                        </div>

                        <p style={{ marginBottom: "10px" }}><button onClick={handleGetOrders}>получить все заказы</button></p>
                        <p style={{ marginBottom: "10px" }}><button onClick={handleCreateOrder}>создать заказ</button></p>
                        <p style={{ marginBottom: "10px" }}><button onClick={handleGetOrdersByUuid}>получить заказ по uuid</button></p>
                        <p style={{ marginBottom: "10px" }}><button onClick={handleGetTariff}>получить стоимость и код тарифа</button></p>

                        {tariff && (
                            <>
                                <p>name: {tariff.tariff_name}</p>
                                <p>code: {tariff.tariff_code}</p>
                                <p>sum: {tariff.delivery_sum}</p>
                            </>
                        )}

                    </>
                )}
        </div>
    )

}

