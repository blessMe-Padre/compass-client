'use client';

import { useState } from 'react';
import styles from './style.module.scss';
import useCategorySlug from '@/app/store/categorySlug';
import useFilterStore from '@/app/store/filterStore';

export default function FilterForm({ data, handleChange, statusForm}) {    
    const { filters, setFilters } = useFilterStore();
    const [selectedFilters, setSelectedFilters] = useState({});

    const arrPrice = data.map(el => parseInt(el?.price) || [])

    const maxPrice = parseInt(Math.max.apply(null, arrPrice));
    const minPrice = parseInt(Math.min.apply(null, arrPrice));


    const attributes = data
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

    // console.log(selectedFilters)
    console.log(filters)

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

    const handleFilterChange = (filterName, value) => {
        setFilters(({
            ...filters,
            [filterName]: value
        }))
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
    
    return (
        <form className={styles.form}>
            {/* <div className={styles.form_filter_wrapper_price}>
                <label>Цена</label>
                <input type='range'></input>
            </div> */}

            <div className={styles.form_filter_wrapper_select}>
                <div>
                    <label>От</label>
                    <input 
                        type="number" 
                        name="priceFrom"
                        value={filters.price?.from || ''}
                        onChange={(e) => handlePriceChange('from', e.target.value)}
                        // placeholder={minPrice !== NaN ? minPrice : 0 }
                        min={0}
                    />
                </div>
                <div>
                    <label>До</label>
                    <input 
                        type="number" 
                        name="priceTo"
                        value={filters.price?.to || ''}
                        onChange={(e) => handlePriceChange('to', e.target.value)}
                        // placeholder={maxPrice !== NaN ? maxPrice : 0 }
                        max={0}
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
                <button className={styles.form_btn_submit}>
                    Применить
                </button>

                <button className={styles.form_reset}>
                    Сбросить фильтр
                </button>
            </div>
        </form>
    )
}