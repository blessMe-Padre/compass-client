'use client'
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Payment() {
    const [paymentData, setPaymentData] = useState(null);

    console.log('paymentData', paymentData);

    const router = useRouter();

    useEffect(() => {
        if (paymentData) {
            router.push(paymentData.confirmation.confirmation_url);
        }
    }, [paymentData, router]);

    const handlePayment = async () => {
        try {
            const payload = {
                amountValue: '2.00',
                currency: 'RUB',
                returnUrl: window.location.href
            };

            const response = await fetch('/api/payment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            const result = await response.json();

            if (!response.ok || !result.success) {
                throw new Error(result.error || 'Ошибка при создании платежа');
            }

            setPaymentData(result.data);
        } catch (err) {
            console.log(err);

        } finally {

        }
    };

    return (
        <div className="flex flex-col items-center space-y-4">
            <button
                onClick={handlePayment}
            >
                Отправить платеж
            </button>


            {paymentData && (
                <div className="p-4 bg-green-100 rounded">
                    <p>Платёж создан успешно!</p>
                    <p> ID: {paymentData.id}</p>
                    <p>Статус: {paymentData.status}</p>
                    <a href={paymentData?.confirmation?.confirmation_url} target='_blank'>Ссылка на оплату </a>
                </div>
            )}
        </div>
    );
}
