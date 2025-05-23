import { NextResponse } from 'next/server'

export async function POST(request) {
    const body = await request.json()

    const formBody = new URLSearchParams()
    formBody.append('client_id', body.client_id)
    formBody.append('client_secret', body.client_secret)
    formBody.append('grant_type', body.grant_type)

    const res = await fetch('https://api.cdek.ru/v2/oauth/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formBody.toString(),
    })

    const data = await res.json()

    if (!res.ok) {
        return NextResponse.json(
            { error: `CDEK auth failed: ${res.status}`, detail: data },
            { status: res.status === 401 ? 502 : res.status }
        )
    }

    return NextResponse.json(data)
}
