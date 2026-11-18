'use client'
import Image from "next/image";
import { useState, useEffect, useRef } from 'react';
import fetchData from '../../utils/fetchData';
import getProductWordForm from '../../utils/getProductWordForm';
import styles from "./style.module.scss";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { Preloader } from '@/app/components';

const domain = `${process.env.NEXT_PUBLIC_DOMAIN}`;

export default function Search() {
    const [inputValue, setInputValue] = useState('');
    const [loading, setLoading] = useState(false);
    const [dataList, setData] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [isFocused, setIsFocused] = useState(false);

    const router = useRouter();
    const debounceTimeout = useRef(null);

    const handleDelete = (e) => {
        e.preventDefault();
        setInputValue('');
    }

    const handleChange = (e) => {
        setInputValue(e.target.value);
    }

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (inputValue.trim() === '') return;
        // Редирект
        router.push(`/search?query=${encodeURIComponent(inputValue.trim())}`);
    };

    const handleKeyUp = (e) => {
        if (e.which === 13) {
            // Редирект
            router.push(`/search?query=${encodeURIComponent(inputValue.trim())}`);
        }
    }

    const highlightText = (text, highlight) => {
        if (!highlight) return text;

        const regex = new RegExp(`(${highlight})`, 'i');
        const match = text.match(regex);

        if (!match) return text;

        const parts = text.split(regex);
        return (
            <>
                {parts[0]}
                <mark>{parts[1]}</mark>
                {parts[2]}
            </>
        );
    };

    useEffect(() => {
        if (debounceTimeout.current) {
            clearTimeout(debounceTimeout.current)
        }

        if (inputValue.trim() === '') {
            setData([])
            setTotalCount(0)
            return
        }

        setLoading(true)
        debounceTimeout.current = setTimeout(async () => {
            try {
                const url = `${domain}/api/products?filters[title][$containsi]=${encodeURIComponent(inputValue)}&populate=*`;
                const result = await fetchData(url);

                // Тут фильтруем товары у которых нет категорий. categories = 0;
                const filteredData = result?.data?.filter(item => item.categories.length > 0);

                setData(filteredData);
                setTotalCount(result?.meta?.pagination?.total || 0);
                setLoading(false);
            } catch (error) {
                console.error('Ошибка загрузки Объектов:', error)
                setTotalCount(0);
                setLoading(false);
            }
        }, 1000)

        return () => clearTimeout(debounceTimeout.current)
    }, [inputValue])

    return (
        <div className={styles.search_wrapper}>
            <div className="container">
                <div className={styles.wrapper}>
                    <div className={styles.input_area}>
                        <input
                            type='text'
                            value={inputValue}
                            onChange={handleChange}
                            onFocus={() => setIsFocused(true)}
                            onKeyUp={handleKeyUp}
                            onBlur={(e) => {
                                const next = e.relatedTarget;
                                const input = e.currentTarget;
                                setTimeout(() => {
                                    if (document.activeElement === input) return;
                                    if (next && input.parentElement?.parentElement?.contains(next)) return;
                                    setIsFocused(false);
                                }, 1000); // задержка, чтобы кликнуть по элементу
                            }}
                            className={styles.input}
                            placeholder='Поиск'
                        />

                        <button
                            className={styles.delete}
                            onClick={handleDelete}
                        >
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1.81282 0.0450334L15.955 14.1872L14.1872 15.9549L0.0450488 1.8128L1.81282 0.0450334Z" fill="#6B6B6B" />
                                <path d="M15.955 1.8128L1.81282 15.9549L0.0450482 14.1872L14.1872 0.0450334L15.955 1.8128Z" fill="#6B6B6B" />
                            </svg>
                        </button>

                        <button className={styles.submit} type="submit" onClick={handleSearchSubmit}>
                            Найти
                        </button>
                    </div>

                    {
                        isFocused && (
                            <div className={styles.dropdown}>
                            <ul className={styles.list}>
                                {inputValue.trim() === '' && <li>Начните печатать</li>}
                                {loading && <Preloader width={20} height={20} />}
                                {!loading && dataList.length === 0 && inputValue.trim() !== '' && totalCount <= 24 && (
                                    <li>Ничего не найдено</li>
                                )}

                                {
                                    !loading &&
                                    dataList.map((product, index) => {
                                        return (
                                            <li key={product.id || index} className={styles.item}>
                                                <Link href={`/products/${product.id}`}
                                                    className={styles.list_item}
                                                >
                                                    {product?.imgs !== null ? (
                                                        <Image
                                                            src={`${domain}${product?.imgs?.[0]?.url}`}
                                                            alt="logo"
                                                            width={40}
                                                            height={50}
                                                            placeholder="blur"
                                                            blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQ0MiIgaGVpZ2h0PSIxMTg5IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNjY2MiIC8+PC9zdmc+" priority
                                                        />
                                                    ) : (
                                                        <Image
                                                            src={`/placeholder-image.jpg`}
                                                            alt="logo"
                                                            width={40}
                                                            height={50}
                                                            placeholder="blur"
                                                            blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQ0MiIgaGVpZ2h0PSIxMTg5IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNjY2MiIC8+PC9zdmc+" priority
                                                        />
                                                    )
                                                    }
                                                    <div>
                                                        <div>
                                                            <span className={styles.item_title}>{highlightText(product.title, inputValue)}</span>
                                                            <span className={styles.item_atr}>{product.size}</span>
                                                        </div>
                                                        <div>{product.price.toLocaleString('ru-Ru')} Р</div>
                                                    </div>

                                                </Link>
                                            </li>
                                        );
                                    })
                                }
                            </ul>
                            {!loading && totalCount > 24 && inputValue.trim() !== '' && (
                                <Link
                                    href={`/search?query=${encodeURIComponent(inputValue.trim())}`}
                                    className={styles.more_link}
                                >
                                    Смотреть все результаты ({totalCount} {getProductWordForm(totalCount)})
                                </Link>
                            )}
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}