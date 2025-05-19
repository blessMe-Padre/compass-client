/**
 * Получить промокод из стора юзера 
 */

'use client'
import React, { useRef, useState } from 'react';
import styles from './style.module.scss';

const Clipboard = () => {
    const [copySuccess, setCopySuccess] = useState('');
    const inputRef = useRef(null);
    const promoCode = 'КОМПАС25';

    const handleClick = async (e) => {
        e.preventDefault();
        if (!inputRef.current) return;

        try {
            await navigator.clipboard.writeText(promoCode);
        } catch {
            document.execCommand('copy');
        }

        setCopySuccess(`Промокод ${promoCode} скопирован`);
        inputRef.current.blur();
    };


    return (
        <div className={styles.clipboard}>
            <p className={styles.text}>Ваш промокод на скидку 3%:</p>
            <div className={styles.row}>
                <input
                    ref={inputRef}
                    className={styles.promo}
                    readOnly
                    value={promoCode}
                    aria-label="Промокод"
                />
                <button
                    onClick={handleClick}
                    className={styles.button}
                    aria-label="Скопировать промокод"
                >
                    <svg width="18" height="17" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.16602 14.4377H12.916C12.6695 15.0228 12.2439 15.5242 11.6942 15.877C11.1446 16.2299 10.4961 16.4179 9.83266 16.4168H3.99934C3.56156 16.4169 3.12806 16.3351 2.72358 16.176C2.31911 16.0169 1.9516 15.7836 1.64205 15.4896C1.3325 15.1955 1.08697 14.8464 0.919499 14.4621C0.752027 14.0779 0.665893 13.666 0.666016 13.2502V6.9168C0.667002 6.14567 0.963633 5.40127 1.50044 4.82283C2.03724 4.24439 2.77746 3.87152 3.58266 3.77394V10.0835C3.58266 12.4822 5.64098 14.4377 8.16602 14.4377ZM15.2493 3.94805H17.016C16.9648 3.87671 16.9061 3.81041 16.841 3.75015L13.9993 1.05044C13.938 0.98881 13.8678 0.935603 13.791 0.892358V2.56265C13.7929 2.92954 13.9471 3.28091 14.2202 3.54035C14.4933 3.79979 14.8631 3.94631 15.2493 3.94805ZM15.2493 5.13555C14.5315 5.13424 13.8434 4.86275 13.3358 4.38052C12.8282 3.89829 12.5424 3.24462 12.541 2.56265V0.583496H8.16602C7.72824 0.583379 7.29473 0.665207 6.89026 0.824304C6.48578 0.983402 6.11827 1.21665 5.80871 1.51072C5.49916 1.8048 5.25363 2.15393 5.08615 2.53818C4.91868 2.92243 4.83254 3.33426 4.83266 3.75015V10.0835C4.83254 10.4994 4.91869 10.9112 5.08616 11.2955C5.25364 11.6797 5.49917 12.0288 5.80873 12.3229C6.11828 12.617 6.48579 12.8502 6.89026 13.0093C7.29474 13.1684 7.72824 13.2503 8.16602 13.2502H13.9993C14.4371 13.2503 14.8706 13.1684 15.2751 13.0093C15.6796 12.8502 16.0471 12.617 16.3566 12.3229C16.6662 12.0288 16.9117 11.6797 17.0792 11.2955C17.2466 10.9112 17.3328 10.4994 17.3327 10.0835V5.13555H15.2493Z" fill="#C4C4C4" />
                    </svg>
                </button>
            </div>
            {copySuccess && <span className={styles.success}>{copySuccess}</span>}
        </div >
    )
}

export default Clipboard