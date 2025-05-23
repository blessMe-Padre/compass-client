import { NextResponse } from 'next/server'

export async function POST(request) {
    const { token } = await request.json();
    const body = {
        type: 2,
        from_location: {
            "code": 288,
        },
        to_location: {
            "code": 955,
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
    };


    const res = await fetch('https://api.cdek.ru/v2/calculator/tarifflist', {
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
