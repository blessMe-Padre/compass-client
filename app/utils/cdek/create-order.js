import useCdekTokenStore from '@/app/store/cdekStore';

const handleCreateCdekOrder = async () => {
    const { token, setToken } = useCdekTokenStore();

    const res = await fetch('/api/cdek/create_order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token })
    })

    if (!res.ok) throw new Error(await res.text())

    const order = await res.json();
    console.log('создан CDEK заказ:', order)
}

export default handleCreateCdekOrder;