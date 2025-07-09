"use client"
import { useState, useCallback, useEffect } from "react";
import styles from './style.module.scss';

const Counter = ({ value = 0, onChange, documentId, disabled, maxAmount }) => {
    const [count, setCount] = useState(value);

    // Синхронизация с внешним value
    useEffect(() => {
        setCount(value);
    }, [value]);

    const increment = useCallback(() => {
        const upperLimit = typeof maxAmount === 'number' ? maxAmount : Infinity;
        const newCount = Math.min(count + 1, upperLimit);
        setCount(newCount);
        onChange?.(newCount, documentId);
    }, [count, onChange, documentId, maxAmount]);

    const decrement = useCallback(() => {
        const newCount = Math.max(0, count - 1);
        setCount(newCount);
        onChange?.(newCount, documentId);
    }, [count, onChange, documentId]);

    return (
        <div className={`${disabled === true ? styles.disabled : ''} ${styles.button_wrapper}`} title={`Количество на складе:  ${maxAmount}`}>
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
                disabled={disabled || (typeof maxAmount === 'number' && count >= maxAmount)}
            >
                +
            </button>
        </div>
    );
};

export default Counter;