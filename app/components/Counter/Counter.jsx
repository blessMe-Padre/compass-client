"use client"
import { useState } from "react"
import styles from './style.module.scss';

const Counter = () => {
    const [count, setCount] = useState(0);

    return (
        <div className={styles.button_wrapper}>
            <button
                onClick={() => setCount(count - 1)}
                className={styles.button}
                disabled={count === 0}
            >
                &ndash;
            </button>
            <span className={styles.span}>{count}</span>
            <button
                onClick={() => setCount(count + 1)}
                className={styles.button}
            >+</button>
        </div>
    )
}

export default Counter