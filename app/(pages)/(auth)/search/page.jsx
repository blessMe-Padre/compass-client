'use client';
import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import fetchData from '@/app/utils/fetchData';
import getProductWordForm from '@/app/utils/getProductWordForm';
import { CardItem, Preloader } from '@/app/components';

import styles from './style.module.scss';

const domain = `${process.env.NEXT_PUBLIC_DOMAIN}`;
const PAGE_SIZE = 24;

function getPageItems(current, total) {
    if (total <= 7) {
        return Array.from({ length: total }, (_, index) => index + 1);
    }

    const pages = new Set([1, total]);
    for (let page = current - 1; page <= current + 1; page += 1) {
        if (page > 1 && page < total) pages.add(page);
    }

    const sorted = [...pages].sort((a, b) => a - b);
    const items = [];

    sorted.forEach((page, index) => {
        if (index > 0 && page - sorted[index - 1] > 1) {
            items.push(`gap-${sorted[index - 1]}`);
        }
        items.push(page);
    });

    return items;
}

export default function SearchResultsPage() {
    return (
        <Suspense>
            <SearchResultsContent />
        </Suspense>
    )
}

function SearchResultsContent() {
    const [dataList, setData] = useState([]);
    const [pageCount, setPageCount] = useState(1);
    const [total, setTotal] = useState(0);
    const searchParams = useSearchParams();
    const router = useRouter();
    const query = searchParams.get('query') || '';
    const pageParam = Number(searchParams.get('page'));
    const page = Number.isInteger(pageParam) && pageParam > 0 ? pageParam : 1;
    const [loading, setLoading] = useState(Boolean(query));

    useEffect(() => {
        if (!query) {
            setData([]);
            setPageCount(1);
            setTotal(0);
            setLoading(false);
            return;
        }

        let cancelled = false;

        const fetchSearchResults = async () => {
            setLoading(true);
            try {
                const url = `${domain}/api/products?filters[title][$containsi]=${encodeURIComponent(query)}&populate=*&pagination[page]=${page}&pagination[pageSize]=${PAGE_SIZE}`;
                const result = await fetchData(url);

                if (cancelled) return;

                setData(Array.isArray(result?.data) ? result.data : []);
                setPageCount(result?.meta?.pagination?.pageCount || 1);
                setTotal(result?.meta?.pagination?.total || 0);
            } catch (error) {
                if (!cancelled) {
                    console.error('Ошибка загрузки объектов:', error);
                    setData([]);
                    setPageCount(1);
                    setTotal(0);
                }
            } finally {
                if (!cancelled) setLoading(false);
            }
        };

        fetchSearchResults();

        return () => {
            cancelled = true;
        };
    }, [query, page]);

    const goToPage = (nextPage) => {
        if (nextPage < 1 || nextPage > pageCount || nextPage === page) return;

        const params = new URLSearchParams();
        params.set('query', query);
        if (nextPage > 1) params.set('page', String(nextPage));
        router.push(`/search?${params.toString()}`);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const pageItems = getPageItems(Math.min(page, pageCount), pageCount);

    return (
        <section>
            <div className="container">
                <h1 className={styles.title}>
                    {query ? `Результаты поиска для: ${query}` : 'Поиск'}
                </h1>

                {!query && <p className={styles.empty}>Введите запрос</p>}

                {query && !loading && (
                    <p className={styles.count}>
                        {total > 0
                            ? `Найдено ${total} ${getProductWordForm(total)}`
                            : 'Ничего не найдено'}
                    </p>
                )}

                {loading && (
                    <div className={styles.status}>
                        <Preloader width={48} height={48} />
                    </div>
                )}

                {!loading && dataList.length > 0 && (
                    <ul className={styles.list}>
                        {dataList.map((item) => (
                            <li key={item.id}>
                                <CardItem element={item} />
                            </li>
                        ))}
                    </ul>
                )}

                {!loading && pageCount > 1 && (
                    <nav className={styles.pagination} aria-label="Страницы результатов поиска">
                        <button
                            type="button"
                            className={styles.page_btn}
                            onClick={() => goToPage(page - 1)}
                            disabled={page <= 1}
                        >
                            Назад
                        </button>

                        {pageItems.map((item) => (
                            typeof item === 'number' ? (
                                <button
                                    key={item}
                                    type="button"
                                    className={`${styles.page_btn} ${item === page ? styles.page_btn_active : ''}`}
                                    onClick={() => goToPage(item)}
                                    aria-current={item === page ? 'page' : undefined}
                                >
                                    {item}
                                </button>
                            ) : (
                                <span key={item} className={styles.ellipsis}>…</span>
                            )
                        ))}

                        <button
                            type="button"
                            className={styles.page_btn}
                            onClick={() => goToPage(page + 1)}
                            disabled={page >= pageCount}
                        >
                            Дальше
                        </button>
                    </nav>
                )}
            </div>
        </section>
    );
}
