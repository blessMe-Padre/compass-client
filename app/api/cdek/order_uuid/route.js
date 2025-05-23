import { NextResponse } from 'next/server'

export async function POST(request) {
    const { token } = await request.json()

    // 10120003926 - 9a497fa4-14f3-45be-8d39-6f1c3e70abd8

    // 23c1c87b-09a0-434b-ae18-8813ce4e24f9

    const res = await fetch('https://api.cdek.ru/v2/orders/23c1c87b-09a0-434b-ae18-8813ce4e24f9', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })

    const data = await res.json()

    if (!res.ok) {
        return NextResponse.json(
            { error: `CDEK order fetch failed: ${res.status}`, detail: data },
            { status: res.status }
        )
    }

    return NextResponse.json(data)
}
