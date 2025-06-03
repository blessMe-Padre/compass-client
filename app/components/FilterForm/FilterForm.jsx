'use client';

import { useEffect, useState } from 'react';
import styles from './style.module.scss';
import useCategorySlug from '@/app/store/categorySlug';
import useFilterStore from '@/app/store/filterStore';
import { Range } from "react-range";

export default function FilterForm({ data, handleChange, statusForm }) {
    const [values, setValues] = useState([0, 10]);
    const [bounds, setBounds] = useState([0, 10]);

    console.log('values', values);


    const { filters, setFilters } = useFilterStore();
    const [selectedFilters, setSelectedFilters] = useState({});

    // перерисовка range слайдера при получении данных 
    useEffect(() => {
        const arrPrice = data.map(el => parseInt(el?.price, 10)).filter(n => !isNaN(n));

        if (arrPrice.length === 0) {
            setBounds([0, 0]);
            setValues([0, 0]);
            return;
        }

        const maxPrice = Math.max(...arrPrice);
        const minPrice = Math.min(...arrPrice);

        setBounds([minPrice, maxPrice]);
        setValues([minPrice, maxPrice]);
    }, [data])

    const attributes = data !== undefined && data
        .flatMap(el => el?.attributes || []) // "Расплющиваем" массивы, изначально map возвращает [[]] - что неудобно (flatMap убирает пустые массивы)
        .reduce((acc, attr) => {
            // Группируем атрибуты по имени
            if (!acc[attr.name]) {
                acc[attr.name] = new Set();
            }

            acc[attr.name].add(attr.value);
            return acc;
        }, {}) // Вернется объект с именем атрибутов (1 раз) и n число значений

    const attrFilters = Object.entries(attributes).map(([name, values]) => ({
        name,
        values: Array.from(values)
    }));

    /** TODO: 
     * 
     * Тут для начала нужно получить соответсвующие атрибуты для фильтрации
     * 
     * ориентироваться на dns
     * можно выбрать много пунктов, пункты будут приходить
     * из атрибутов, при нажатии на Применить будеsт 1 запрос
     * N
     * тут можно формировать filters_options и конкатенацией вставлять в запрос собирая все данные
     * http://90.156.134.142:1337/api/products?filters[categories][slug][$eq]=letniy_i_zimniy_assortiment&filters[statusProduct][$eq]=stock&filters[size][$eq]=56-58&populate=*
     * https://http://90.156.134.142/api/products/filters/?q=5070 rtx&category=17a89aab16404e77&order=new&stock=now-today-tomorrow-later-out_of_stock&f[4rw]=1cst&f[9z]=2n4
     * https://www.dns-shop.ru/catalog/search/filters/?q=5070 rtx&category=17a89aab16404e77&order=new&stock=now-today-tomorrow-later-out_of_stock&f[4rw]=1cst&f[9z]=2n4
    */

    const [localAttrs, setLocalAttrs] = useState(
        attrFilters.reduce((acc, el) => {
            acc[el.name] = '';
            return acc;
        }, {})
    );
    console.log(localAttrs);

    const handleFilterChange = (filterName, value) => {
        setLocalAttrs(prev => ({
            ...prev,
            [filterName]: value,
        }));

        // setFilters(({
        //     ...filters,
        //     [filterName]: value
        // }))
    }

    const handlePriceChange = (type, value) => {
        setFilters({
            ...filters,
            price: {
                ...filters.price,
                [type]: Number(value) || 0
            }
        });
    };

    const handleFilterSubmit = (e) => {
        e.preventDefault();

        setFilters({
            ...filters,
            price: {
                'from': values[0],
                'to': values[1],
            },
            ...localAttrs,
        });
    };

    return (
        <form className={styles.form}>
            <div className={styles.form_filter_wrapper_price}>
                <label>Цена</label>
            </div>

            <Range
                label="Выберите диапазон цен"
                step={100}
                min={bounds[0]}
                max={bounds[1]}
                values={values}
                onChange={(values) => setValues(values)}
                renderTrack={({ props, children }) => (
                    <div
                        {...props}
                        style={{
                            ...props.style,
                            height: "6px",
                            width: "100%",
                            backgroundColor: "#ccc",
                        }}
                    >
                        {children}
                    </div>
                )}
                renderThumb={({ props }) => (
                    <div
                        {...props}
                        key={props.key}
                        style={{
                            ...props.style,
                            height: "15px",
                            width: "15px",
                            backgroundColor: "#007cc2",
                            borderRadius: "100%",
                        }}
                    />
                )}
            />

            <div className={styles.form_filter_wrapper_select}>
                <div className='flex'>
                    <label>От</label>
                    <input
                        type="number"
                        name="priceFrom"
                        value={values[0]}
                        onChange={(e) => handlePriceChange('from', e.target.value)}
                        min={0}
                        step={100}
                    />
                </div>
                <div className='flex'>
                    <label>До</label>
                    <input
                        type="number"
                        name="priceTo"
                        value={values[1]}
                        onChange={(e) => handlePriceChange('to', e.target.value)}
                        step={100}
                    />
                </div>
            </div>

            {attrFilters.map((el) => (
                <div
                    key={el.name}
                    className={styles.form_filter_wrapper_select}
                >
                    <label htmlFor={el.name}>{el.name}</label>
                    <select
                        name={el.name}
                        id={el.name}
                        onChange={(e) => handleFilterChange(el.name, e.target.value)}
                    >
                        <option value="">Все</option>
                        {
                            el?.values.map((value) => (
                                <option key={value} value={value}>{value}</option>
                            ))
                        }
                    </select>
                </div>
            ))}

            <div className={styles.wrapper_btns}>
                <button
                    className={styles.form_btn_submit}
                    onClick={handleFilterSubmit}
                >
                    Применить
                </button>

                <button className={styles.form_reset}>
                    Сбросить фильтр
                </button>
            </div>
        </form>
    )
}