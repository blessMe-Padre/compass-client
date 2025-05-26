'use client';

import { useState, useEffect } from "react"

function Timer({ isRunning = true, onResend }) {
    const [secondsLeft, setSecondsLeft] = useState(300);
    const [isExpired, setIsExpired] = useState(false);

    useEffect(() => {
        let intervalId;
        
        if (isRunning && secondsLeft > 0) {
            intervalId = setInterval(() => {
                setSecondsLeft(prev => {
                    if(prev <= 1) {
                        clearInterval(intervalId);
                        setIsExpired(true);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }

        return () => clearInterval(intervalId);
    }, [isRunning, secondsLeft]);

    const formatTime = (secs) => {
        const minutes = Math.floor(secs / 60);
        const remainingSeconds = secs % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    }

    const handleResendClick = () => {
        if(isExpired) {
            setSecondsLeft(300);
            setIsExpired(false);
            onResend();
        }
    };

    return (
        <>
            {!isExpired ? (
             <p>Запросить новый код через {formatTime(secondsLeft)} </p>
            ) : (
                <button 
                    type="button" 
                    onClick={handleResendClick}
                    style={{ 
                        background: 'none',
                        border: 'none',
                        color: 'inherit',
                        textDecoration: 'underline',
                        cursor: 'pointer',
                        padding: 0
                    }}
                >
                    Отправить повторно
                </button>
            )}        </>
    )
}


export default Timer;