'use client';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

import fetchData from '@/app/utils/fetchData';
import { CardItem } from '@/app/components';

import styles from './style.module.scss';

const domain = 'http://90.156.134.142:1337';

export default function SearchResultsPage() {
    const [dataList, setData] = useState([]);
    const searchParams = useSearchParams();
    const query = searchParams.get('query');


    useEffect(() => {
        const fetchSearchResults = async () => {
            try {
                if (!query) return;

                const url = `${domain}/api/products?filters[title][$containsi]=${encodeURIComponent(query)}&populate=*`;
                const result = await fetchData(url);
                setData(result?.data);
            } catch (error) {
                console.error('Ошибка загрузки объектов:', error);
            }
        };

        fetchSearchResults();
    }, [query]);

    return (
        <section>
            <div className="container">
                <h1>Результаты поиска для: {query}</h1>
                <ul className={styles.list}>
                    {dataList.map((item, index) => (
                        <li key={index}>
                            <CardItem element={item} />
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
