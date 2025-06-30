import { NextResponse } from 'next/server'

export async function POST(request) {
    const { token, orderData } = await request.json();
    // console.log(orderData);

    const body = {
        type: 2,
        tariff_code: orderData.tariffCode,
        shipment_point: "VLK37",
        delivery_point: orderData.delivery_point,
        comment: orderData.comment,
        recipient: {
            name: orderData.username,
            email: orderData.email,
            phones: [{ number: orderData.phone }]
        },
        packages: [
            {
                number: "1",
                weight: 1000,
                length: 40,
                width: 30,
                height: 20,
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
