import { NextResponse } from 'next/server'

export async function POST(request) {
    const { token } = await request.json()

    const res = await fetch('https://api.cdek.ru/v2/orders?cdek_number=10120003926', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
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
