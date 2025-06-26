"use client"
import { useState, useCallback } from "react";
import styles from './style.module.scss';

const Counter = ({ onChange, documentId, disabled, maxAmount }) => {
    const [count, setCount] = useState(0);

    const increment = useCallback(() => {
        const newCount = Math.min(count + 1, maxAmount ?? Infinity);
        setCount(newCount);
        onChange?.(newCount, documentId);
    }, [count, onChange, documentId, maxAmount]);

    const decrement = useCallback(() => {
        const newCount = Math.max(0, count - 1);
        setCount(newCount);
        onChange?.(newCount, documentId);
    }, [count, onChange, documentId]);

    return (
        <div className={styles.button_wrapper}>
            <button
                onClick={decrement}
                className={styles.button}
                disabled={disabled || count === 0}
            >
                &ndash;
            </button>
            <span className={styles.span}>{count}</span>
            <button
                onClick={increment}
                className={styles.button}
                disabled={disabled || (maxAmount !== undefined && count >= maxAmount)}
            >
                +
            </button>
        </div>
    );
};

export default Counter;