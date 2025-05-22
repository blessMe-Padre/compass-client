'use client';

import { useState, useEffect } from "react"

function Timer({ isRunning }) {
    const [secondsLeft, setSecondsLeft] = useState(300);

    useEffect(() => {
        let intervalid;
        
        if (isRunning && secondsLeft > 0) {
            intervalid = setInterval(() => {
                setSecondsLeft(secondsLeft - 1);
            }, 1000)    
        }

        return () => clearInterval(intervalid);
    }, [isRunning, secondsLeft])

    const formatTime = (secs) => {
        const minutes = Math.floor(secs / 60);
        const remainingSeconds = secs % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    }

    return (
        <>
            {isRunning === true && formatTime(secondsLeft) }
        </>
    )
}


export default Timer;