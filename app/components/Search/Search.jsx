'use client'
import { useState } from 'react';
import Image from "next/image";
import styles from "./style.module.scss";

export default function Search() {
    const [value, setValue] = useState('');

    const handleChange = (e) => {
        setValue(e.target.value);
    }

    const handleDelete = (e) => {
        e.preventDefault();
        setValue('');
    }

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <div className={styles.search_wrapper}>
            <div className="container">
                <form className={styles.wrapper} onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Поиск по сайту"
                        className={styles.input}
                        value={value}
                        onChange={handleChange}
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
                </form>
            </div>
        </div>
    )
}