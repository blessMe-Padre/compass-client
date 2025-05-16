"use client"
import { useState, useCallback } from "react";
import styles from './style.module.scss';

const Counter = ({ onChange, documentId, disabled }) => {

    /**
     * documentId - это в каждый счетчик прокидывается documentId для добавления в корзину
     */

    const [count, setCount] = useState(0);
    // Обновляем count и вызываем onChange
    const increment = useCallback(() => {
        const newCount = count + 1;
        setCount(newCount);
        onChange?.(newCount);
    }, [count, onChange]);

    const decrement = useCallback(() => {
        const newCount = Math.max(0, count - 1);
        setCount(newCount);
        onChange?.(newCount);
    }, [count, onChange]);

    return (
        <div className={styles.button_wrapper}>
            <button

                onClick={decrement}
                className={styles.button}
                disabled={count === 0 && disabled}
            >
                &ndash;
            </button>
            <span className={styles.span}>{count}</span>
            <button
                onClick={increment}
                className={styles.button}
                disabled={count === 0 && disabled}
            >
                +
            </button>
        </div>
    );
};

export default Counter;