'use client';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

import fetchData from '@/app/utils/fetchData';
import { CardItem } from '@/app/components';

import styles from './style.module.scss';

const domain = `${process.env.NEXT_PUBLIC_DOMAIN}`;

export default function SearchResultsPage() {
    return (
        <Suspense>
            <SearchResultsContent />
        </Suspense>
    )
}


function SearchResultsContent() {
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