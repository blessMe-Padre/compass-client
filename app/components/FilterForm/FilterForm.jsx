'use client';

import { useEffect, useState, useRef } from 'react';
import styles from './style.module.scss';
import useCategorySlug from '@/app/store/categorySlug';
import useFilterStore from '@/app/store/filterStore';
import { Range } from "react-range";

export default function FilterForm({ data, handleChange, statusForm, filteredCount }) {
    const [values, setValues] = useState([0, 10]);
    const [bounds, setBounds] = useState([0, 10]);
    const { filters, setFilters } = useFilterStore();
    const [selectedFilters, setSelectedFilters] = useState({});
    const selectRefs = useRef([]);

    // перерисовка range слайдера при получении данных
    useEffect(() => {
        const arrPrice = data.map(el => {
            const price = el?.priceSales ? parseInt(el.priceSales, 10) : parseInt(el?.price, 10);
            return isNaN(price) ? null : price;
        }).filter(n => n !== null);

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
    // console.log(localAttrs);

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
        const numValue = Number(value) || 0;
        const clampedValue = Math.max(bounds[0], Math.min(bounds[1], numValue));

        const newValues = type === 'from'
            ? [clampedValue, values[1]]
            : [values[0], clampedValue];

        setValues(newValues);
    };

    const handleFilterSubmit = (e) => {
        e.preventDefault();

        // Формируем фильтры для API
        const apiFilters = {
            ...localAttrs
        };

        // Добавляем фильтр по цене только если значения отличаются от границ
        if (values[0] !== bounds[0] || values[1] !== bounds[1]) {
            apiFilters.priceSales = {
                from: values[0],
                to: values[1]
            };
            // Добавляем fallback на обычную цену
            apiFilters.price = {
                from: values[0],
                to: values[1]
            };
        }

        // Удаляем пустые фильтры
        Object.keys(apiFilters).forEach(key => {
            if (apiFilters[key] === '' || apiFilters[key] === undefined) {
                delete apiFilters[key];
            }
        });

        setFilters(apiFilters);

        // Вызываем обработчик изменения, если он передан
        if (handleChange) {
            handleChange(apiFilters);
        }
    };

    const handleFilterReset = (e) => {
        e.preventDefault();

        // Сброс цен к начальным значениям
        setValues([bounds[0], bounds[1]]);

        // Сброс локальных атрибутов
        const resetAttrs = attrFilters.reduce((acc, el) => {
            acc[el.name] = '';
            return acc;
        }, {});
        setLocalAttrs(resetAttrs);

        // Очистка фильтров в хранилище
        setFilters({});

        // Сброс выбранных option
        selectRefs.current.forEach(select => {
            if (select) select.value = '';
        });

        // Обновление данных (если handleChange передан)
        if (handleChange) {
            handleChange();
        }
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

            {attrFilters.map((el, index) => (
                <div
                    key={el.name}
                    className={styles.form_filter_wrapper_select}
                >
                    <label htmlFor={el.name}>{el.name}</label>
                    <select
                        ref={el => selectRefs.current[index] = el}
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

                <button
                    className={styles.form_reset}
                    onClick={handleFilterReset}
                >
                    Сбросить фильтр
                </button>
            </div>

            {filteredCount !== undefined && filteredCount !== null && (
                <div className={styles.filtered_count_wrapper}>
                    Найдено товаров: {filteredCount}
                </div>
            )}
        </form>
    )
}
