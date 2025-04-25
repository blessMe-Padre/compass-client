'use client'
import Image from "next/image";
import { useState, useEffect, useRef } from 'react'
import fetchData from '../../utils/fetchData';
import styles from "./style.module.scss";
import Link from "next/link";


const domain = 'http://90.156.134.142:1337';

export default function Search() {
    const [inputValue, setInputValue] = useState('');
    const [loading, setLoading] = useState(false);
    const [dataList, setData] = useState([]);
    const [isFocused, setIsFocused] = useState(false);

    const debounceTimeout = useRef(null)

    const handleDelete = (e) => {
        e.preventDefault();
        setInputValue('');
    }

    const handleChange = (e) => {
        setInputValue(e.target.value)
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
            return
        }

        setLoading(true)
        debounceTimeout.current = setTimeout(async () => {
            try {
                const url = `${domain}/api/products?filters[title][$containsi]=${encodeURIComponent(inputValue)}&populate=*`;
                const result = await fetchData(url);
                setData(result?.data);
                setLoading(false);
            } catch (error) {
                console.error('Ошибка загрузки Объектов:', error)
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
                            onBlur={() => setTimeout(() => setIsFocused(false), 1000)} // задержка, чтобы кликнуть по элементу
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

                        <button className={styles.submit} type="submit">
                            Найти
                        </button>
                    </div>

                    {
                        // isFocused && (
                        <ul className={styles.list}>
                            {/* {inputValue.trim() === '' && <li>Начните печатать</li>} */}
                            {/* {loading && <img src='/download.png' className={styles.image} />} */}
                            {/* {!loading && dataList.length === 0 && inputValue.trim() !== '' && ( */}
                            {/* <li>Ничего не найдено</li> */}
                            {/* )} */}

                            {
                                !loading &&
                                dataList.map((product, index) => {
                                    console.log(product); // лог внутри map
                                    return (
                                        <li key={product.id || index} className={styles.item}>
                                            <Link href={`/catalog/category/12/products/${product.id}`}
                                                className={styles.list_item}
                                            >
                                                <Image
                                                    src={`${domain}${product?.imgs[0]?.url}`}
                                                    alt="logo"
                                                    width={40}
                                                    height={50}
                                                    placeholder="blur"
                                                    blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQ0MiIgaGVpZ2h0PSIxMTg5IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNjY2MiIC8+PC9zdmc+" priority
                                                />
                                                <div>
                                                    <div>
                                                        <span className={styles.item_title}>{highlightText(product.title, inputValue)}</span>
                                                        <span className={styles.item_atr}>({product.size})</span>
                                                    </div>
                                                    <div>{product.price}</div>
                                                </div>

                                            </Link>
                                        </li>
                                    );
                                })
                            }
                        </ul>
                        // )
                    }
                </div>
            </div>
        </div>
    )
}