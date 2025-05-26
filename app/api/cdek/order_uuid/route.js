import { NextResponse } from 'next/server'

export async function POST(request) {
    const { token } = await request.json()

    // f0dfd0e7-d0fd-4fac-b1a1-4c55cc55b1c4

    const res = await fetch('https://api.cdek.ru/v2/orders/f0dfd0e7-d0fd-4fac-b1a1-4c55cc55b1c4', {
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
