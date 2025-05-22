'use client'

import React, { useState } from 'react';
import useCdekTokenStore from '@/app/store/cdekStore';

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

    const [cities, setCities] = useState(null);
    const [pvz, setPvz] = useState(null);
    const [query, setQuery] = useState('');
    const [filteredCities, setFilteredCities] = useState([]);

    const handleAuth = async () => {
        const res = await fetch(localApiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({
                client_id: 'wqGwiQx0gg8mLtiEKsUinjVSICCjtTEP',
                client_secret: 'RmAmgvSgSl1yirlz9QupbzOJVqhCxcP5',
                grant_type: 'client_credentials'
            })
        })
        if (!res.ok) throw new Error(await res.text())
        const data = await res.json()
        console.log('CDEK token:', data)
        setToken(data);
    }

    const handleGetCities = async () => {
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
        handleGetPvz(city.code)
    }

    return (
        <>
            <div>
                <button onClick={handleAuth}>Авторизоваться в CDEK</button>
            </div>

            <div>
                <button onClick={handleGetCities}>Выбрать город</button>
                <input
                    type="text"
                    placeholder="Введите название города"
                    value={query}
                    onChange={handleSearch}
                />
                <ul>
                    {filteredCities.slice(0, 10).map((city, i) => (
                        <li
                            onClick={() => handleSetCity(city)}
                            key={i}>
                            {city.city}, {city.region} код {city.code}
                        </li>
                    ))}
                </ul>

                <ul>
                    {pvz && pvz.map((item, i) => (
                        <li
                            key={i}
                        >
                            <p>{item?.name}</p>
                            <p>{item?.address_comment}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )

}

