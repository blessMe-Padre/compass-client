import { NextResponse } from 'next/server';
import { YooCheckout } from '@a2seven/yoo-checkout';

export async function POST(request) {
    const { metadata, sum } = await request.json()

    const checkout = new YooCheckout(
        {
            shopId: process.env.NEXT_PUBLIC_SHOP_ID,
            secretKey: process.env.NEXT_PUBLIC_SECRET_KEY
        }
    );

    const idempotenceKey = `02347fc4-a1f0-49db-807e-f0d67c2ed5a5-${Date.now().toString()}`;

    const createPayload = {
        amount: {
            value: `${sum}.00`,
            currency: 'RUB'
        },
        payment_method_data: {
            type: 'bank_card'
        },
        capture: true,
        confirmation: {
            type: 'redirect',
            return_url: 'http://localhost:3000/checkout'
        },
        metadata: {
            orderId: metadata,
        },
    };

    try {
        const payment = await checkout.createPayment(createPayload, idempotenceKey);
        // console.log(payment);
        return NextResponse.json(
            {
                success: true,
                data: payment
            },
            { status: 201 }
        )

    } catch (error) {
        console.error(error);
    }

    if (!res.ok) {
        return NextResponse.json(
            { error: `Произошла ошибка во время оплаты: ${res.status}`, detail: data },
            { status: res.status }
        )
    }

    return NextResponse.json(data)
}
