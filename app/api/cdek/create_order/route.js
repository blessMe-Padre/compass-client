import { NextResponse } from 'next/server'

export async function POST(request) {
    const { token } = await request.json();

    const body = {
        type: 2,
        tariff_code: 800,
        shipment_point: "VLK37", // заменить на реальный код
        delivery_point: "USS18", // заменить на реальный код
        comment: "Заказ с сайта",
        recipient: {
            name: "Иван Иванов",
            email: "ivan@example.com",
            phones: [{ number: "+79991234567" }]
        },
        packages: [
            {
                number: "1",
                weight: 1000,
                length: 10,
                width: 10,
                height: 10,
                comment: "Упаковка с товаром",
            }
        ],
        sender: {
            company: "Кендзерский Юрий Александрович",
            name: "Кендзерский Юрий Александрович",
            phones: [
                { number: "+79991234567" }
            ]
        },
    };


    const res = await fetch('https://api.cdek.ru/v2/orders', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })

    const data = await res.json()

    if (!res.ok) {
        return NextResponse.json(
            { error: `CDEK orders fetch failed: ${res.status}`, detail: data },
            { status: res.status }
        )
    }

    return NextResponse.json(data)
}
