import { NextResponse } from 'next/server';

export async function POST(request) {
    const res = await request.json()
    const status = res.object.status;
    const orderId = res.object.metadata.orderId;

    console.log(status);
    console.log(orderId);

    const statusMap = {
        succeeded: 'оплачен',
        canceled: 'отменен',
        processing: 'в обработке',
        failed: 'ошибка',
        pending: 'ожидается'
    };

    const paymentStatus = statusMap[status] ?? 'не оплачен';



    try {
        const listRes = await fetch(
            `${process.env.NEXT_PUBLIC_DOMAIN}/api/zakazies?filters[orderPaymentId][$eq]=${orderId}`
        );

        const listJson = await listRes.json();
        const items = listJson.data;

        // 2) Берём ID первой записи
        const entryId = items[0].documentId;

        // 3) Шлём PUT-запрос на обновление поля paymentstatus
        const updateRes = await fetch(
            `${process.env.NEXT_PUBLIC_DOMAIN}/api/zakazies/${entryId}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ "data": { "paymentstatus": paymentStatus } })
            }
        );
        if (!updateRes.ok) {
            throw new Error(`Ошибка обновления статуса: ${updateRes.status}`);
        }
        const updatedEntry = await updateRes.json();

    } catch (error) {
        console.error('Ошибка в buttonClick:', error);
    }

    return NextResponse.json(res)
}
